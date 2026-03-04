import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";

export default async function SchoolsPage() {
  const supabase = createClient();
  const { data: schools } = await supabase.from("schools").select("id,name,city").order("name");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Coles</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {schools?.map((school) => (
          <Card key={school.id}>
            <h2 className="font-semibold">{school.name}</h2>
            <p className="text-sm text-gray-600">{school.city}</p>
          </Card>
        ))}
        {!schools?.length && <p>No hay colegios todavía.</p>}
      </div>
    </div>
  );
}
