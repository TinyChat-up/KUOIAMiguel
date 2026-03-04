import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export async function Header() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

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
            <Link href="/marketplace">Publicar</Link>
          </Button>
          {user ? (
            <form action="/logout" method="post">
              <Button variant="outline" type="submit">
                Salir
              </Button>
            </form>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/login">Acceder</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
