"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getSnapshot(): number {
  return typeof window !== "undefined" ? window.scrollY : 0;
}

function getServerSnapshot(): number {
  return 0;
}

/**
 * Modern React 19 hook to monitor window scroll coordinates using useSyncExternalStore
 */
export function useScrollPosition(): { scrollY: number; isScrolled: boolean } {
  const scrollY = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    scrollY,
    isScrolled: scrollY > 20,
  };
}
