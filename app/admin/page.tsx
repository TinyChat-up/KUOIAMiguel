import { getSupabaseServerClient } from "@/lib/supabase";
import { Card } from "@/components/ui/card";

export default async function AdminPage() {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <p>Acceso denegado.</p>;

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return <p>Solo admin.</p>;

  const { data: reports } = await supabase.from("reports").select("id,target_type,reason,status,created_at").order("created_at", { ascending: false });

  return (
    <div className="space-y-4 py-6">
      <h1 className="text-2xl font-bold">Panel admin</h1>
      {reports?.map((r) => (
        <Card key={r.id}>
          <p className="font-semibold">{r.target_type}</p>
          <p>{r.reason}</p>
          <p className="text-xs">{r.status}</p>
        </Card>
      ))}
    </div>
  );
}
