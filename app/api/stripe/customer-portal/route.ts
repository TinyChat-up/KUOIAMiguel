import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: customer } = await supabase
    .from("stripe_customers")
    .select("customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!customer?.customer_id) {
    return NextResponse.redirect(new URL("/billing?portal=missing", request.url));
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customer.customer_id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/billing`
  });

  return NextResponse.redirect(portalSession.url);
}
