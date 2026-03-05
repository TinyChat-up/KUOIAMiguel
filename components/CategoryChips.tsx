"use client";

import { Button } from "@/components/ui/button";

export function CategoryChips({ categories, active, onSelect }: { categories: string[]; active: string; onSelect: (category: string) => void }) {
  return (
    <div className="sticky top-16 z-30 -mx-4 overflow-x-auto border-y bg-background/95 px-4 py-3 backdrop-blur md:top-20">
      <div className="flex gap-2">
        {categories.map((category) => (
          <Button key={category} variant={active === category ? "default" : "outline"} className="whitespace-nowrap" onClick={() => onSelect(category)}>{category}</Button>
        ))}
      </div>
    </div>
  );
}
