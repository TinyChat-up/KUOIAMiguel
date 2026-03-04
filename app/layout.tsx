import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "KUOIA",
  description: "Marketplace escolar"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="mx-auto min-h-screen max-w-6xl p-4">{children}</main>
      </body>
    </html>
  );
}
