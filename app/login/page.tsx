import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md">
      <Card className="space-y-4">
        <h1 className="text-2xl font-bold">Acceder</h1>
        <LoginForm />
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta? <Link href="/signup" className="underline">Regístrate</Link>
        </p>
      </Card>
    </div>
  );
}
