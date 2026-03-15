import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function BillingPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>Debes iniciar sesión para ver tu facturación.</p>;
  }

  const { data: subscription } = await supabase
    .from("stripe_subscriptions")
    .select("status,current_period_end")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Facturación</h1>
      <Card>
        <p className="text-sm">Estado: {subscription?.status ?? "sin suscripción"}</p>
        <p className="text-sm">Renovación: {subscription?.current_period_end ?? "-"}</p>
      </Card>
      <div className="flex gap-2">
        <form action="/api/stripe/create-checkout-session" method="post">
          <Button type="submit">Suscribirme</Button>
        </form>
        <form action="/api/stripe/customer-portal" method="post">
          <Button variant="outline" type="submit">
            Gestionar suscripción
          </Button>
        </form>
      </div>
    </div>
  );
}
