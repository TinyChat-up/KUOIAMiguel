import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature") || "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.client_reference_id && session.customer) {
      await supabaseAdmin.from("stripe_customers").upsert({ user_id: session.client_reference_id, customer_id: String(session.customer) });
    }
  }

  if (event.type.startsWith("customer.subscription.")) {
    const subscription = event.data.object as any;
    const customerId = String(subscription.customer);
    const { data: customer } = await supabaseAdmin.from("stripe_customers").select("user_id").eq("customer_id", customerId).single();

    if (customer?.user_id) {
      await supabaseAdmin.from("stripe_subscriptions").upsert({
        user_id: customer.user_id,
        subscription_id: subscription.id,
        status: subscription.status,
        price_id: subscription.items.data[0]?.price?.id,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
      });
      await supabaseAdmin.from("services").update({ subscription_status: subscription.status }).eq("owner_id", customer.user_id);
    }
  }

  return NextResponse.json({ received: true });
}
