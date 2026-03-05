"use client";

import { useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toaster";

export default function UiPage() {
  const [showLoading, setShowLoading] = useState(false);
  const { push } = useToast();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">KUOIA Design System</h1>
      <Tabs defaultValue="components">
        <TabsList><TabsTrigger value="components">Componentes</TabsTrigger><TabsTrigger value="states">Estados</TabsTrigger></TabsList>
        <TabsContent value="components" className="space-y-4 pt-4">
          <Card className="space-x-2"><Button>Primary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button></Card>
          <Card><Input placeholder="Input de ejemplo" /></Card>
          <Card><Dialog><DialogTrigger asChild><Button>Abrir modal</Button></DialogTrigger><DialogContent><p>Modal shadcn-style listo.</p></DialogContent></Dialog></Card>
          <Card><Button onClick={() => push("Toast demo")}>Lanzar toast</Button></Card>
          <Card><Table><thead><tr><th>Nombre</th><th>Rol</th></tr></thead><tbody><tr><td>Ana</td><td>Familia</td></tr><tr><td>Tomás</td><td>Proveedor</td></tr></tbody></Table></Card>
        </TabsContent>
        <TabsContent value="states" className="space-y-4 pt-4">
          <Button variant="outline" onClick={() => setShowLoading((v) => !v)}>Toggle loading</Button>
          {showLoading ? <Skeleton className="h-40 w-full" /> : <EmptyState title="Empty state" description="Aquí puedes enseñar instrucciones y CTA." />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
