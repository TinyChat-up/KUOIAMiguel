import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { Card } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md">
      <Card className="space-y-4">
        <h1 className="text-2xl font-bold">Crear cuenta</h1>
        <SignupForm />
        <p className="text-sm text-gray-600">
          ¿Ya tienes cuenta? <Link href="/login" className="underline">Accede</Link>
        </p>
      </Card>
    </div>
  );
}
