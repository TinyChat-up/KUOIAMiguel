import { Button } from "@/components/ui/button";

export function EmptyState({ title, description, onReset }: { title: string; description: string; onReset?: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-10 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-foreground/70">{description}</p>
      {onReset ? <Button className="mt-4" variant="outline" onClick={onReset}>Limpiar filtros</Button> : null}
    </div>
  );
}
