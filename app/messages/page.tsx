import { getSupabaseServerClient } from "@/lib/supabase";
import { Card } from "@/components/ui/card";

export default async function MessagesPage() {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <p>Debes iniciar sesión para ver mensajes.</p>;

  const { data: conversations } = await supabase
    .from("conversations")
    .select("id, user_a, user_b, messages(body, created_at)")
    .or(`user_a.eq.${user.id},user_b.eq.${user.id}`)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-3 py-6">
      <h1 className="text-2xl font-bold">Mensajes</h1>
      {conversations?.map((c) => (
        <Card key={c.id}>
          <p className="text-sm">Conversación {c.id}</p>
          <p className="font-medium">{c.messages?.[0]?.body ?? "Sin mensajes"}</p>
        </Card>
      ))}
    </div>
  );
}
