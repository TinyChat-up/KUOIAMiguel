import { getSupabaseServerClient } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <p>Inicia sesión con magic link para acceder al perfil.</p>;

  const { data: profile } = await supabase.from("profiles").select("name, role, city").eq("id", user.id).single();
  const { data: products } = await supabase.from("products").select("id,title,status").eq("user_id", user.id);

  return (
    <div className="space-y-4 py-6">
      <h1 className="text-2xl font-bold">Mi perfil</h1>
      <Card>
        <p>{profile?.name}</p>
        <p className="text-sm">{profile?.role} · {profile?.city}</p>
      </Card>
      <Card>
        <h2 className="font-semibold">Mis anuncios</h2>
        <ul>{products?.map((p) => <li key={p.id}>{p.title} ({p.status})</li>)}</ul>
      </Card>
      <form action="/api/stripe/portal" method="post">
        <Button type="submit">Gestionar suscripción</Button>
      </form>
    </div>
  );
}
