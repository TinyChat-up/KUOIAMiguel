import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function SchoolsPage() {
  const supabase = getSupabaseServerClient();
  const { data: schools } = await supabase.from("schools").select("id,name,city,verified").order("name");

  return (
    <div className="space-y-4 py-6">
      <h1 className="text-2xl font-bold">Colegios</h1>
      {schools?.map((school) => (
        <Card key={school.id}>
          <Link href={`/schools/${school.id}`} className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">{school.name}</h2>
              <p className="text-sm">{school.city}</p>
            </div>
            {school.verified && <Badge className="bg-emerald-100">VERIFICADO</Badge>}
          </Link>
        </Card>
      ))}
    </div>
  );
}
