import React from "react";

export type ToastType = "success" | "error" | "warning" | "info" | "default";

export interface ToastOptions {
  id?: string;
  description?: React.ReactNode;
  duration?: number;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastData extends ToastOptions {
  id: string;
  type: ToastType;
  message: React.ReactNode;
  createdAt: number;
}
