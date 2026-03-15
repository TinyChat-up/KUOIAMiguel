import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "KUOIA",
  description: "Marketplace escolar con Supabase y Stripe"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
