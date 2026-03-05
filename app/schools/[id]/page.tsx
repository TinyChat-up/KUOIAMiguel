import { notFound } from "next/navigation";
import { RatingStars } from "@/components/RatingStars";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAverageRating, getRelatedSchoolData } from "@/lib/mock-api";

export default function SchoolDetailPage({ params }: { params: { id: string } }) {
  const data = getRelatedSchoolData(params.id);
  if (!data.school) return notFound();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border bg-gradient-to-r from-emerald-100 to-white p-8">
        <div className="flex items-center gap-4"><span className="text-5xl">{data.school.logo}</span><div><h1 className="text-3xl font-bold">{data.school.name}</h1><p>{data.school.city}</p></div><Badge className="ml-auto bg-emerald-100 text-emerald-700">VERIFICADO</Badge></div>
      </section>
      <section className="space-y-3"><h2 className="text-xl font-semibold">1) Stand oficial</h2><div className="grid gap-3 md:grid-cols-2">{data.official.map((item) => <Card key={item.id}><p className="font-medium">{item.title}</p><p>{item.price}€</p></Card>)}</div></section>
      <section className="space-y-3"><h2 className="text-xl font-semibold">2) Segunda mano</h2><div className="grid gap-3 md:grid-cols-2">{data.secondHand.map((item) => <Card key={item.id}><p className="font-medium">{item.title}</p><p>{item.price}€</p></Card>)}</div></section>
      <section className="space-y-3"><h2 className="text-xl font-semibold">3) Servicios</h2><div className="grid gap-3 md:grid-cols-2">{data.linkedServices.map((item) => <Card key={item.id}><p className="font-medium">{item.name}</p><RatingStars value={getAverageRating(item.id)} /></Card>)}</div></section>
      <section className="space-y-3"><h2 className="text-xl font-semibold">4) Extraescolares/cursos</h2><div className="flex flex-wrap gap-2">{data.school.extracurriculars.map((item) => <Badge key={item}>{item}</Badge>)}</div></section>
      <section className="space-y-3"><h2 className="text-xl font-semibold">5) Valoraciones</h2><div className="grid gap-3">{data.schoolReviews.map((review) => <Card key={review.id}><p className="font-medium">{review.author}</p><RatingStars value={review.rating} /><p className="text-sm text-foreground/70">{review.comment}</p></Card>)}</div></section>
    </div>
  );
}
