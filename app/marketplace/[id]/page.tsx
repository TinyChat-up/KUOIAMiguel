import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProductById, getSchoolById } from "@/lib/mock-api";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) return notFound();
  const school = await getSchoolById(product.schoolId);
  return (
    <article className="grid gap-8 md:grid-cols-2">
      <Image src={product.image} alt={product.title} width={900} height={600} className="h-full w-full rounded-2xl object-cover" />
      <div className="space-y-4">
        <Badge>{product.category}</Badge>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-foreground/70">{product.description}</p>
        <p className="text-2xl font-semibold">{product.price}€</p>
        <p className="text-sm">Ciudad: {product.city} · Colegio: {school?.name}</p>
        <Button>Contactar (demo)</Button>
      </div>
    </article>
  );
}
