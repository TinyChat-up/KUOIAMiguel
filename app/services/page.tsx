import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";

export default async function ServicesPage() {
  const supabase = createClient();
  const { data: services } = await supabase
    .from("services")
    .select("id,title,category,city")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Servicios</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {services?.map((service) => (
          <Card key={service.id}>
            <h2 className="font-semibold">{service.title}</h2>
            <p className="text-sm text-gray-600">
              {service.category} · {service.city}
            </p>
          </Card>
        ))}
        {!services?.length && <p>No hay servicios publicados todavía.</p>}
      </div>
    </div>
  );
}
