"use client";

import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { FiltersBar } from "@/components/FiltersBar";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts, getSchools } from "@/lib/mock-api";
import { Product, ProductFilters, School } from "@/lib/types";

export default function MarketplacePage() {
  const [items, setItems] = useState<Product[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [loading, setLoading] = useState(true);
  const [errorMode, setErrorMode] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      if (errorMode) {
        setLoading(false);
        return;
      }
      const [productsData, schoolsData] = await Promise.all([getProducts(filters), getSchools()]);
      setItems(productsData);
      setSchools(schoolsData);
      setLoading(false);
    };
    run();
  }, [filters, errorMode]);

  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.category))), [items]);
  const cities = useMemo(() => Array.from(new Set(items.map((i) => i.city))), [items]);

  return (
    <div className="space-y-6">
      <PageHeader title="Marketplace escolar" description="Compra y vende productos con filtros avanzados y resultados instantáneos." tag="UI DEMO" />
      <div className="flex justify-end"><Button variant="outline" onClick={() => setErrorMode((v) => !v)}>{errorMode ? "Desactivar error" : "Simular error"}</Button></div>
      {errorMode ? <EmptyState title="Ups, hubo un error" description="Estado de error simulado para validar UX." onReset={() => setErrorMode(false)} /> : <FiltersBar filters={filters} onChange={setFilters} categories={categories} cities={cities} schools={schools} />}
      {loading ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-72" />)}</div> : items.length ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <EmptyState title="Sin resultados" description="Ajusta filtros o publica un nuevo producto desde el header." onReset={() => setFilters({})} />}
    </div>
  );
}
