"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { addSessionProduct } from "@/lib/mock-api";
import { Product, SessionUser } from "@/lib/types";

type PublishInput = Omit<Product, "id" | "image"> & { image?: string };

type AppState = {
  user: SessionUser | null;
  login: (email: string) => void;
  logout: () => void;
  publishProduct: (input: PublishInput) => void;
};

const AppStateContext = createContext<AppState | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);

  const value = useMemo<AppState>(() => ({
    user,
    login: (email) => setUser({ email, name: email.split("@")[0] || "Usuario" }),
    logout: () => setUser(null),
    publishProduct: (input) => {
      addSessionProduct({
        ...input,
        id: `pub-${crypto.randomUUID()}`,
        image: input.image || "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop"
      });
    }
  }), [user]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used within AppStateProvider");
  return context;
}
