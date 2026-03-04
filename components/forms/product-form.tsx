"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().nonnegative(),
  condition: z.enum(["nuevo", "segunda_mano"]),
  category: z.string().min(2),
  city: z.string().min(2)
});

type Values = z.infer<typeof schema>;

export function ProductForm({ actionLabel = "Guardar" }: { actionLabel?: string }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (values: Values) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    if (!res.ok) alert("Error al crear anuncio");
    else window.location.href = "/marketplace";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input placeholder="Título" {...register("title")} />
      {errors.title && <p className="text-xs text-red-600">Título inválido</p>}
      <Textarea placeholder="Descripción" {...register("description")} />
      <Input type="number" step="0.01" placeholder="Precio" {...register("price")} />
      <Select {...register("condition")}>
        <option value="nuevo">Nuevo</option>
        <option value="segunda_mano">Segunda mano</option>
      </Select>
      <Input placeholder="Categoría" {...register("category")} />
      <Input placeholder="Ciudad" {...register("city")} />
      <Button disabled={isSubmitting} type="submit">{actionLabel}</Button>
    </form>
  );
}
