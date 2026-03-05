"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const Drawer = Dialog;
export const DrawerTrigger = DialogTrigger;
export function DrawerContent({ children }: { children: React.ReactNode }) {
  return <DialogContent className="bottom-0 top-auto w-full max-w-none translate-x-[-50%] translate-y-0 rounded-b-none rounded-t-2xl">{children}</DialogContent>;
}
