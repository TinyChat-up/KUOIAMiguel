"use client";

import { createContext, useContext, useMemo, useState } from "react";

type ToastItem = { id: string; message: string };

const ToastContext = createContext<{ push: (message: string) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const value = useMemo(() => ({ push: (message: string) => {
    const id = crypto.randomUUID();
    setItems((prev) => [...prev, { id, message }]);
    setTimeout(() => setItems((prev) => prev.filter((item) => item.id !== id)), 2400);
  } }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-20 z-[60] space-y-2">{items.map((item) => <div key={item.id} className="rounded-xl bg-foreground px-4 py-2 text-sm text-white shadow">{item.message}</div>)}</div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
