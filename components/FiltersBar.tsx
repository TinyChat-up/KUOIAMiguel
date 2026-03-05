"use client";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ProductFilters, School } from "@/lib/types";

export function FiltersBar({ filters, onChange, categories, cities, schools }: { filters: ProductFilters; onChange: (next: ProductFilters) => void; categories: string[]; cities: string[]; schools: School[] }) {
  return (
    <div className="grid gap-3 rounded-2xl border bg-white p-4 md:grid-cols-3 lg:grid-cols-6">
      <Input placeholder="Buscar..." value={filters.query || ""} onChange={(e) => onChange({ ...filters, query: e.target.value })} aria-label="Buscar" />
      <Select value={filters.category || "all"} onChange={(e) => onChange({ ...filters, category: e.target.value })} aria-label="Categoría">
        <option value="all">Categoría</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}
      </Select>
      <Input type="number" placeholder="Precio min" value={filters.priceMin ?? ""} onChange={(e) => onChange({ ...filters, priceMin: Number(e.target.value) || undefined })} aria-label="Precio mínimo" />
      <Input type="number" placeholder="Precio max" value={filters.priceMax ?? ""} onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) || undefined })} aria-label="Precio máximo" />
      <Select value={filters.condition || "all"} onChange={(e) => onChange({ ...filters, condition: e.target.value as ProductFilters["condition"] })} aria-label="Estado">
        <option value="all">Estado</option><option value="nuevo">Nuevo</option><option value="segunda_mano">Segunda mano</option>
      </Select>
      <Select value={filters.city || "all"} onChange={(e) => onChange({ ...filters, city: e.target.value })}><option value="all">Ciudad</option>{cities.map((item) => <option key={item}>{item}</option>)}</Select>
      <Select value={filters.schoolId || "all"} onChange={(e) => onChange({ ...filters, schoolId: e.target.value })} className="md:col-span-3 lg:col-span-6">
        <option value="all">Colegio</option>{schools.map((school) => <option key={school.id} value={school.id}>{school.name}</option>)}
      </Select>
    </div>
  );
}
