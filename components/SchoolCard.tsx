import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { School } from "@/lib/types";

export function SchoolCard({ school }: { school: School }) {
  return (
    <Link href={`/schools/${school.id}`}>
      <Card className="space-y-2">
        <div className="flex items-center justify-between"><div className="text-2xl">{school.logo}</div>{school.verified ? <Badge className="bg-emerald-100 text-emerald-700">VERIFICADO</Badge> : null}</div>
        <h3 className="font-semibold">{school.name}</h3>
        <p className="text-sm text-foreground/70">{school.city}</p>
        <p className="line-clamp-2 text-sm text-foreground/70">{school.summary}</p>
      </Card>
    </Link>
  );
}
