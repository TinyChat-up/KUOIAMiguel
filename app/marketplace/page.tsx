import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";

export default async function MarketplacePage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id,title,price,city")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Marketplace</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {products?.map((item) => (
          <Card key={item.id}>
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.city}</p>
            <p className="text-sm font-medium">{item.price}€</p>
          </Card>
        ))}
        {!products?.length && <p>No hay productos todavía.</p>}
      </div>
    </div>
  );
}
