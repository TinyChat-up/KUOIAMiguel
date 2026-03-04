import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function MarketplaceDetail({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServerClient();
  const { data: product } = await supabase.from("products").select("*, profiles(name)").eq("id", params.id).single();
  if (!product) notFound();

  return (
    <div className="space-y-4 py-6">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <Card>
        <p>{product.description}</p>
        <p className="mt-2 text-lg font-semibold">{product.price}€</p>
        <p className="text-sm">Vendedor: {product.profiles?.name ?? "Usuario"}</p>
      </Card>
      <div className="flex gap-2">
        <Button>Chat</Button>
        <Button variant="outline">Reportar</Button>
      </div>
    </div>
  );
}
