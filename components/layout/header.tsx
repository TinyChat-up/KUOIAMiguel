import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <div className="flex items-center gap-6 text-sm font-semibold">
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/services">Servicios</Link>
          <Link href="/schools">Coles</Link>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/marketplace/new">Publicar</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/profile">Acceder</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
