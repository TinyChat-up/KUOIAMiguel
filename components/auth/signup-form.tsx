"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Introduce tu nombre"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Mínimo 6 caracteres")
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden"
  });

type SignupValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" }
  });

  async function onSubmit(values: SignupValues) {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { full_name: values.fullName }
      }
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess("Cuenta creada. Si usas confirmación por email, revisa tu bandeja de entrada.");
    router.push("/login");
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="Nombre completo" {...form.register("fullName")} />
        {form.formState.errors.fullName && <p className="mt-1 text-sm text-red-600">{form.formState.errors.fullName.message}</p>}
      </div>
      <div>
        <Input type="email" placeholder="tu@email.com" {...form.register("email")} />
        {form.formState.errors.email && <p className="mt-1 text-sm text-red-600">{form.formState.errors.email.message}</p>}
      </div>
      <div>
        <Input type="password" placeholder="********" {...form.register("password")} />
        {form.formState.errors.password && <p className="mt-1 text-sm text-red-600">{form.formState.errors.password.message}</p>}
      </div>
      <div>
        <Input type="password" placeholder="********" {...form.register("confirmPassword")} />
        {form.formState.errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.confirmPassword.message}</p>
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-emerald-700">{success}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Creando..." : "Crear cuenta"}
      </Button>
    </form>
  );
}
