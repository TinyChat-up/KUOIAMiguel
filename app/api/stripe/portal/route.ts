import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabase.from("stripe_customers").select("customer_id").eq("user_id", user.id).single();
  if (!data?.customer_id) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/profile?portal=missing`);

  const session = await stripe.billingPortal.sessions.create({
    customer: data.customer_id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile`
  });

  return NextResponse.redirect(session.url);
}
