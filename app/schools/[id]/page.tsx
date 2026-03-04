import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function SchoolDetail({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServerClient();
  const { data: school } = await supabase.from("schools").select("*").eq("id", params.id).single();
  if (!school) notFound();

  const [{ data: official }, { data: secondHand }, { data: services }, { data: reviews }] = await Promise.all([
    supabase.from("products").select("id,title,price").eq("school_id", params.id).eq("condition", "nuevo").limit(4),
    supabase.from("products").select("id,title,price").eq("school_id", params.id).eq("condition", "segunda_mano").limit(4),
    supabase.from("service_schools").select("services(id,title)").eq("school_id", params.id).limit(4),
    supabase.from("reviews").select("rating,text").eq("target_type", "school").eq("target_id", params.id).limit(5)
  ]);

  return (
    <div className="space-y-6 py-6">
      <section className="rounded-2xl border bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{school.name}</h1>
            <p>{school.city}</p>
          </div>
          {school.verified && <Badge className="bg-emerald-100">VERIFICADO</Badge>}
        </div>
      </section>
      <Card><h2 className="font-semibold">Stand oficial</h2><ul>{official?.map((p) => <li key={p.id}>{p.title} · {p.price}€</li>)}</ul></Card>
      <Card><h2 className="font-semibold">Segunda mano</h2><ul>{secondHand?.map((p) => <li key={p.id}>{p.title} · {p.price}€</li>)}</ul></Card>
      <Card><h2 className="font-semibold">Servicios del cole</h2><ul>{services?.map((s: any, i) => <li key={i}>{s.services?.title}</li>)}</ul></Card>
      <Card><h2 className="font-semibold">Valoraciones</h2><ul>{reviews?.map((r) => <li key={r.text}>{r.rating}/5 · {r.text}</li>)}</ul></Card>
    </div>
  );
}
