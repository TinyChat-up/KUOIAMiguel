"use client";

import { useEffect, useMemo, useState } from "react";
import { CategoryChips } from "@/components/CategoryChips";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getAverageRating, getServices } from "@/lib/mock-api";
import { Service } from "@/lib/types";

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("Todas");

  useEffect(() => {
    getServices().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => ["Todas", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const filtered = active === "Todas" ? items : items.filter((item) => item.category === active);

  return (
    <div className="space-y-6">
      <PageHeader title="Servicios" description="Descubre proveedores educativos con chips por categoría y ratings calculados." />
      <CategoryChips categories={categories} active={active} onSelect={setActive} />
      {loading ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-72" />)}</div> : filtered.length ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{filtered.map((service) => <ServiceCard key={service.id} service={service} rating={getAverageRating(service.id)} />)}</div> : <EmptyState title="No hay servicios" description="No existen resultados para esta categoría." />}
    </div>
  );
}
