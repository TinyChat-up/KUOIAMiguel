import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

async function handleSubscriptionEvent(subscription: Stripe.Subscription) {
  const customerId = String(subscription.customer);

  const { data: customerMap } = await supabaseAdmin
    .from("stripe_customers")
    .select("user_id")
    .eq("customer_id", customerId)
    .maybeSingle();

  if (!customerMap?.user_id) return;

  await supabaseAdmin.from("stripe_subscriptions").upsert({
    user_id: customerMap.user_id,
    subscription_id: subscription.id,
    status: subscription.status,
    price_id: subscription.items.data[0]?.price?.id ?? null,
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
  });
}

export async function POST(request: Request) {
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid webhook signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.client_reference_id && session.customer) {
      await supabaseAdmin.from("stripe_customers").upsert({
        user_id: session.client_reference_id,
        customer_id: String(session.customer)
      });
    }
  }

  if (
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    await handleSubscriptionEvent(event.data.object as Stripe.Subscription);
  }

  return NextResponse.json({ received: true });
}
