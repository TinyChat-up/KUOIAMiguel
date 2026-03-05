import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { RatingStars } from "@/components/RatingStars";
import { Service } from "@/lib/types";

export function ServiceCard({ service, rating }: { service: Service; rating: number }) {
  return (
    <Link href={`/services/${service.id}`}>
      <Card className="overflow-hidden p-0">
        <Image src={service.image} alt={service.name} width={600} height={360} className="h-44 w-full object-cover" />
        <div className="space-y-2 p-4">
          <h3 className="font-semibold">{service.name}</h3>
          <p className="line-clamp-2 text-sm text-foreground/70">{service.description}</p>
          <div className="flex items-center justify-between"><span className="text-sm">{service.category}</span><RatingStars value={rating} /></div>
        </div>
      </Card>
    </Link>
  );
}
