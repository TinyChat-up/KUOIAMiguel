import { Star } from "lucide-react";

export function RatingStars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < Math.round(value) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
      ))}
      <span className="ml-1 text-xs text-foreground/70">{value.toFixed(1)}</span>
    </div>
  );
}
