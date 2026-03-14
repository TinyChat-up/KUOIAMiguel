import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const categories = ["Transporte", "Limpieza", "Extraescolares", "Comedor", "Clases particulares", "Orientación", "Logopedia", "Otros"];

export default async function ServicesPage() {
  const supabase = getSupabaseServerClient();
  const { data: services } = await supabase.from("services").select("id,title,category,city,subscription_status").order("created_at", { ascending: false });

  return (
    <div className="space-y-4 py-6">
      <h1 className="text-2xl font-bold">Servicios</h1>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((c) => <Badge key={c}>{c}</Badge>)}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {services?.map((service) => (
          <Card key={service.id}>
            <Link href={`/services/${service.id}`}>
              <h2 className="font-semibold">{service.title}</h2>
              <p className="text-sm">{service.category} · {service.city}</p>
              <p className="text-xs text-primary">{service.subscription_status === "active" ? "Anunciante activo" : "Sin suscripción"}</p>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
