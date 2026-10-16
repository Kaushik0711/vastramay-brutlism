"use client";

import React from "react";
import { ToastProvider } from "@/components/ui/toast";

export interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Global Application Providers wrapper
 * Integrates ToastProvider and future state management
 */
export function AppProviders({ children }: AppProvidersProps) {
  return <ToastProvider>{children}</ToastProvider>;
}
