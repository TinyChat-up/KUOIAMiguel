import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppStateProvider } from "@/components/providers/AppStateProvider";
import { ToastProvider } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "KUOIA UI Playground",
  description: "Front-end demo para iterar UX/UI de KUOIA"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ToastProvider><AppStateProvider>
          <Navbar />
          <main className="mx-auto min-h-screen max-w-6xl px-4 pb-16 pt-24">{children}</main>
          <Footer />
          </AppStateProvider></ToastProvider>
      </body>
    </html>
  );
}
