import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  asChild?: boolean;
};

export function Button({ className, variant = "default", asChild, ...props }: Props) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition",
        variant === "default" && "bg-primary text-white hover:opacity-90",
        variant === "outline" && "border border-border bg-white hover:bg-muted",
        className
      )}
      {...props}
    />
  );
}
