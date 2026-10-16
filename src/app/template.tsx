import React from "react";
import { PageTransition } from "@/components/layout/PageTransition";

/**
 * Next.js App Router Template
 * Automatically remounts on route navigation to trigger subtle page entrance transitions
 * while preserving RootLayout, persistent shopping state, Header, and Footer.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
