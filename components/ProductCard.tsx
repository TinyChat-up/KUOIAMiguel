import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/marketplace/${product.id}`}>
      <Card className="overflow-hidden p-0">
        <Image src={product.image} alt={product.title} width={600} height={360} className="h-44 w-full object-cover" />
        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between gap-2"><h3 className="font-semibold">{product.title}</h3><Badge>{product.condition}</Badge></div>
          <p className="line-clamp-2 text-sm text-foreground/70">{product.description}</p>
          <div className="flex items-center justify-between text-sm"><span>{product.city}</span><strong>{product.price}€</strong></div>
        </div>
      </Card>
    </Link>
  );
}
