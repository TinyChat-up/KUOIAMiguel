import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";

export default async function ProfilePage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>Debes iniciar sesión.</p>;
  }

  const { data: profile } = await supabase.from("profiles").select("full_name, role").eq("id", user.id).maybeSingle();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Mi perfil</h1>
      <Card>
        <p className="font-medium">{profile?.full_name ?? user.email}</p>
        <p className="text-sm text-gray-600">Rol: {profile?.role ?? "user"}</p>
      </Card>
      <Link href="/billing" className="text-sm underline">
        Ir a facturación
      </Link>
    </div>
  );
}
