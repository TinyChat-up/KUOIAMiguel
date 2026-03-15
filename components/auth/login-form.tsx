"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres")
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });

  async function onSubmit(values: LoginValues) {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword(values);
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    const nextPath = searchParams.get("next") ?? "/profile";
    router.push(nextPath);
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input type="email" placeholder="tu@email.com" {...form.register("email")} />
        {form.formState.errors.email && <p className="mt-1 text-sm text-red-600">{form.formState.errors.email.message}</p>}
      </div>
      <div>
        <Input type="password" placeholder="********" {...form.register("password")} />
        {form.formState.errors.password && <p className="mt-1 text-sm text-red-600">{form.formState.errors.password.message}</p>}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Acceder"}
      </Button>
    </form>
  );
}
