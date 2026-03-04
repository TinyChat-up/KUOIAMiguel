import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function ServiceDetail({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServerClient();
  const { data: service } = await supabase.from("services").select("*, service_schools(school_id, schools(name))").eq("id", params.id).single();
  if (!service) notFound();

  return (
    <div className="space-y-4 py-6">
      <h1 className="text-3xl font-bold">{service.title}</h1>
      <Card>
        <p>{service.description}</p>
        <p className="mt-2">Zona: {service.city}</p>
        <p className="mt-2 text-sm">Colegios asociados: {service.service_schools?.map((s: any) => s.schools?.name).join(", ") || "Ninguno"}</p>
      </Card>
      <div className="flex gap-2">
        <Button>Anunciarme / Gestionar suscripción</Button>
        <Button variant="outline">Contactar</Button>
      </div>
    </div>
  );
}
