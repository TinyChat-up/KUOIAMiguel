import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function MarketplacePage() {
  const supabase = getSupabaseServerClient();
  const { data: products } = await supabase.from("products").select("id,title,price,condition,city,created_at").eq("status", "active").order("created_at", { ascending: false }).limit(30);

  return (
    <div className="space-y-4 py-6">
      <h1 className="text-2xl font-bold">Marketplace</h1>
      <div className="grid gap-3">
        {products?.map((p) => (
          <Card key={p.id}>
            <Link href={`/marketplace/${p.id}`} className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">{p.title}</h2>
                <p className="text-sm text-gray-600">{p.city}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{p.price}€</p>
                <Badge>{p.condition}</Badge>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
