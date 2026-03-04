export function Footer() {
  return (
    <footer className="border-t py-6 text-center text-sm text-gray-600">
      <p>© {new Date().getFullYear()} KUOIA. Hecho para despliegue en Vercel + Supabase + Stripe.</p>
    </footer>
  );
}
