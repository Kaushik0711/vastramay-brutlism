import type { ToastData, ToastOptions, ToastType } from "./toast-types";
import { UI_CONFIG } from "@/config/ui";

type Listener = (toasts: ToastData[]) => void;

class ToastStore {
  private toasts: ToastData[] = [];
  private listeners: Set<Listener> = new Set();
  private maxVisible: number = UI_CONFIG.toast.maxVisible;

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public getSnapshot = (): ToastData[] => {
    return this.toasts;
  };

  private notify() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  public add(type: ToastType, message: React.ReactNode, options?: ToastOptions): string {
    const id = options?.id || `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    
    // Remove if duplicate id exists
    const filtered = this.toasts.filter((t) => t.id !== id);

    const newToast: ToastData = {
      id,
      type,
      message,
      createdAt: Date.now(),
      duration: options?.duration ?? UI_CONFIG.toast.defaultDuration,
      description: options?.description,
      icon: options?.icon,
      action: options?.action,
    };

    // Keep within maxVisible limit
    const updated = [newToast, ...filtered].slice(0, this.maxVisible);
    this.toasts = updated;
    this.notify();
    return id;
  }

  public dismiss(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  public clear() {
    this.toasts = [];
    this.notify();
  }
}

export const toastStore = new ToastStore();

export const toast = {
  success: (message: React.ReactNode, options?: ToastOptions) =>
    toastStore.add("success", message, options),
  error: (message: React.ReactNode, options?: ToastOptions) =>
    toastStore.add("error", message, options),
  warning: (message: React.ReactNode, options?: ToastOptions) =>
    toastStore.add("warning", message, options),
  info: (message: React.ReactNode, options?: ToastOptions) =>
    toastStore.add("info", message, options),
  custom: (message: React.ReactNode, options?: ToastOptions) =>
    toastStore.add("default", message, options),
  dismiss: (id: string) => toastStore.dismiss(id),
  clear: () => toastStore.clear(),
};
