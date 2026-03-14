import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  return (
    <div className="space-y-8 py-8">
      <section className="rounded-2xl border border-border bg-gradient-to-r from-emerald-50 to-white p-8">
        <h1 className="text-4xl font-bold">KUOIA</h1>
        <p className="mt-2 text-lg">Marketplace escolar para familias, coles y servicios.</p>
        <Input className="mt-4" placeholder="Busca productos, servicios o colegios" />
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <Card><Link href="/marketplace">Marketplace</Link></Card>
        <Card><Link href="/services">Servicios</Link></Card>
        <Card><Link href="/schools">Coles</Link></Card>
      </section>
    </div>
  );
}
