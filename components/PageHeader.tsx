import { Badge } from "@/components/ui/badge";

export function PageHeader({ title, description, tag }: { title: string; description: string; tag?: string }) {
  return (
    <header className="space-y-3">
      {tag ? <Badge>{tag}</Badge> : null}
      <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
      <p className="max-w-2xl text-foreground/70">{description}</p>
    </header>
  );
}
