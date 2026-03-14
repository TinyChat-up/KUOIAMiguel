import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: process.env.STRIPE_PRICE_ID_MONTHLY!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile?subscription=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile?subscription=cancel`,
    client_reference_id: user.id
  });

  return NextResponse.redirect(session.url!);
}
