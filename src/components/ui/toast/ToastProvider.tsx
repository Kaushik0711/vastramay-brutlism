"use client";

import React, { useSyncExternalStore } from "react";
import { AnimatePresence } from "motion/react";
import { toastStore } from "./toast-store";
import { ToastItem } from "./ToastItem";
import type { ToastPosition } from "@/config/ui";

export interface ToastProviderProps {
  position?: ToastPosition;
  children?: React.ReactNode;
}

export function ToastProvider({
  position = "bottom-right",
  children,
}: ToastProviderProps) {
  const toasts = useSyncExternalStore(
    (cb) => toastStore.subscribe(cb),
    toastStore.getSnapshot,
    () => []
  );

  const positionClasses: Record<ToastPosition, string> = {
    "top-left": "top-4 left-4 items-start",
    "top-right": "top-4 right-4 items-end",
    "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
    "bottom-left": "bottom-4 left-4 items-start",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  };

  return (
    <>
      {children}
      <aside
        aria-label="Notifications"
        className={`fixed z-[var(--z-toast)] pointer-events-none flex flex-col gap-2.5 p-4 w-full sm:w-auto max-w-full ${positionClasses[position]}`}
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((item) => (
            <ToastItem key={item.id} toast={item} />
          ))}
        </AnimatePresence>
      </aside>
    </>
  );
}
