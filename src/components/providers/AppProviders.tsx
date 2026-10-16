"use client";

import React from "react";
import { ToastProvider } from "@/components/ui/toast";
import { ShoppingProvider } from "@/context/ShoppingContext";
import { CustomizationProvider } from "@/context/CustomizationContext";

export interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Global Application Providers wrapper
 * Integrates CustomizationProvider, ToastProvider, and centralized ShoppingProvider
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <CustomizationProvider>
      <ToastProvider>
        <ShoppingProvider>{children}</ShoppingProvider>
      </ToastProvider>
    </CustomizationProvider>
  );
}
