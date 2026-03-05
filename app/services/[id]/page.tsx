import Image from "next/image";
import { notFound } from "next/navigation";
import { RatingStars } from "@/components/RatingStars";
import { Badge } from "@/components/ui/badge";
import { getAverageRating, getServiceById, getSchools } from "@/lib/mock-api";

export default async function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = await getServiceById(params.id);
  if (!service) return notFound();
  const schools = await getSchools();
  const linked = schools.filter((school) => service.schoolIds.includes(school.id));
  return (
    <article className="space-y-6">
      <Image src={service.image} alt={service.name} width={1200} height={500} className="h-72 w-full rounded-3xl object-cover" />
      <Badge>{service.category}</Badge>
      <h1 className="text-4xl font-bold">{service.name}</h1>
      <RatingStars value={getAverageRating(service.id)} />
      <p className="max-w-3xl text-foreground/70">{service.description}</p>
      <section><h2 className="text-xl font-semibold">Trabaja con</h2><div className="mt-3 flex flex-wrap gap-2">{linked.map((school) => <Badge key={school.id}>{school.name}</Badge>)}</div></section>
    </article>
  );
}
