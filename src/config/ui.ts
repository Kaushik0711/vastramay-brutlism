/**
 * Vastramay UI Configuration & Reusable Defaults
 */

export const UI_CONFIG = {
  toast: {
    defaultDuration: 4000,
    maxVisible: 5,
    position: "bottom-right" as const,
  },
  overlay: {
    closeOnEscape: true,
    closeOnOutsideClick: true,
    preventScroll: true,
  },
  tooltip: {
    delayDuration: 200,
  },
  transitions: {
    defaultDurationMs: 180,
    modalDurationMs: 220,
    toastDurationMs: 200,
  },
} as const;

export type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
