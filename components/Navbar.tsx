"use client";

import Link from "next/link";
import { Menu, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useAppState } from "@/components/providers/AppStateProvider";
import { useToast } from "@/components/ui/toaster";

const links = [{ href: "/marketplace", label: "Marketplace" }, { href: "/services", label: "Servicios" }, { href: "/schools", label: "Coles" }];

export function Navbar() {
  const pathname = usePathname();
  const { user, login, logout, publishProduct } = useAppState();
  const { push } = useToast();
  const [openPublish, setOpenPublish] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-primary">KUOIA</Link>
        <div className="hidden items-center gap-6 md:flex">{links.map((link) => <Link key={link.href} href={link.href} className={pathname.startsWith(link.href) ? "text-primary" : "text-foreground/70"}>{link.label}</Link>)}</div>
        <div className="flex items-center gap-2">
          <PublishDialog open={openPublish} onOpenChange={setOpenPublish} onSubmit={(values) => { publishProduct(values); push("Producto publicado (demo)"); setOpenPublish(false); }} />
          {user ? (
            <Button variant="outline" onClick={logout}><UserCircle2 className="mr-1 size-4" /> {user.name}</Button>
          ) : (
            <LoginDialog open={openLogin} onOpenChange={setOpenLogin} onLogin={(email) => { login(email); push("Sesión simulada iniciada"); setOpenLogin(false); }} />
          )}
          <Drawer>
            <DrawerTrigger asChild><Button variant="ghost" className="md:hidden"><Menu className="size-5" /></Button></DrawerTrigger>
            <DrawerContent><div className="space-y-3 p-4">{links.map((link) => <Link key={link.href} href={link.href} className="block rounded-lg border p-3">{link.label}</Link>)}</div></DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
}

function LoginDialog({ open, onOpenChange, onLogin }: { open: boolean; onOpenChange: (open: boolean) => void; onLogin: (email: string) => void }) {
  const [email, setEmail] = useState("familia@kuoia.com");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild><Button variant="outline">Acceder</Button></DialogTrigger>
      <DialogContent>
        <h3 className="text-lg font-semibold">Acceder (fake)</h3>
        <label className="mt-4 block text-sm">Email<Input type="email" className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <Button className="mt-4 w-full" onClick={() => onLogin(email)}>Entrar</Button>
      </DialogContent>
    </Dialog>
  );
}

function PublishDialog({ open, onOpenChange, onSubmit }: { open: boolean; onOpenChange: (open: boolean) => void; onSubmit: (data: { title: string; description: string; category: string; condition: "nuevo" | "segunda_mano"; city: string; schoolId: string; price: number; isOfficial: boolean }) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(10);
  const [category, setCategory] = useState("Uniformes");
  const [condition, setCondition] = useState<"nuevo" | "segunda_mano">("segunda_mano");
  const [city, setCity] = useState("Madrid");
  const [schoolId, setSchoolId] = useState("scl-1");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild><Button>Publicar</Button></DialogTrigger>
      <DialogContent>
        <h3 className="text-lg font-semibold">Publicar anuncio (demo UI)</h3>
        <div className="mt-4 grid gap-3">
          <Input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="grid grid-cols-2 gap-3"><Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /><Input value={category} onChange={(e) => setCategory(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3"><Select value={condition} onChange={(e) => setCondition(e.target.value as "nuevo" | "segunda_mano")}><option value="nuevo">Nuevo</option><option value="segunda_mano">Segunda mano</option></Select><Input value={city} onChange={(e) => setCity(e.target.value)} /></div>
          <Input value={schoolId} onChange={(e) => setSchoolId(e.target.value)} placeholder="scl-1" />
          <Button onClick={() => onSubmit({ title, description, price, category, condition, city, schoolId, isOfficial: false })}>Publicar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
