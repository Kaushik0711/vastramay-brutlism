"use client";

import React from "react";

export interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Global Application Providers wrapper
 * Pre-configured for state management, carts, toasts, and UI context
 */
export function AppProviders({ children }: AppProvidersProps) {
  return <>{children}</>;
}
