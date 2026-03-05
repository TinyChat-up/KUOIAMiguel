import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl border bg-gradient-to-br from-emerald-100 to-white p-8 text-center shadow-sm md:p-14">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">KUOIA Playground</p>
        <h1 className="mt-3 text-4xl font-bold md:text-6xl">Diseña, prueba y vende la UX de KUOIA</h1>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/70">Interfaz completa sin backend para iterar flujos, pantallas y componentes en tiempo real.</p>
        <div className="mx-auto mt-6 max-w-xl"><Input placeholder="Busca productos, servicios o colegios" aria-label="Buscador principal" /></div>
        <div className="mt-6 flex flex-wrap justify-center gap-3"><Button asChild><Link href="/marketplace">Explorar marketplace</Link></Button><Button variant="outline" asChild><Link href="/ui">Ver Design System</Link></Button></div>
        <div className="mt-8 grid grid-cols-2 gap-2 text-sm text-foreground/60 md:grid-cols-4"><div>Trusted School</div><div>Kids Academy</div><div>Edu+ Partners</div><div>Campus Co.</div></div>
      </section>
    </div>
  );
}
