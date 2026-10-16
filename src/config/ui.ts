/**
 * Vastramay UI Configuration & Reusable Defaults
 *
 * Centralized design tokens and interactive system settings.
 * Strongly typed and consumable by components, animation hooks, and the live theme customizer.
 */

export interface ColorCustomization {
  bgBase: string;
  fgBase: string;
  brandPrimary: string;
  brandSecondary: string;
  brandAccent: string;
  bgSurface: string;
  borderColor: string;
  focusRingColor: string;
  scrollbarTrack: string;
  scrollbarThumb: string;
  scrollbarThumbHover: string;
  scrollbarThumbActive: string;
}

export interface GeometryCustomization {
  borderWidth: number; // in pixels (1, 2, 3, 4)
  shadowOffset: number; // in pixels (0, 2, 4, 6, 8)
  radius: number; // in pixels (0, 2, 4, 6)
  contentWidth: "standard" | "wide" | "compact";
}

export interface MotionCustomization {
  motionIntensity: "normal" | "subtle" | "reduced";
  durationBaseMs: number; // 120, 200, 350
  reducedMotion: boolean;
  pageTransitionStyle: "slide" | "fade" | "none";
}

export interface ThemeCustomization {
  colors: ColorCustomization;
  geometry: GeometryCustomization;
  motion: MotionCustomization;
}

export const DEFAULT_THEME_CUSTOMIZATION: ThemeCustomization = {
  colors: {
    bgBase: "#F7F1E5",
    fgBase: "#171717",
    brandPrimary: "#FF5C8A",
    brandSecondary: "#FFE14A",
    brandAccent: "#4867F5",
    bgSurface: "#FFFFFF",
    borderColor: "#171717",
    focusRingColor: "#171717",
    scrollbarTrack: "#F7F1E5",
    scrollbarThumb: "#171717",
    scrollbarThumbHover: "#FF5C8A",
    scrollbarThumbActive: "#FFE14A",
  },
  geometry: {
    borderWidth: 2,
    shadowOffset: 4,
    radius: 2,
    contentWidth: "standard",
  },
  motion: {
    motionIntensity: "normal",
    durationBaseMs: 200,
    reducedMotion: false,
    pageTransitionStyle: "slide",
  },
};

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
    delayDuration: 180,
  },
  transitions: {
    fastDurationMs: 140,
    defaultDurationMs: 200,
    slowDurationMs: 350,
    modalDurationMs: 220,
    toastDurationMs: 200,
    drawerDurationMs: 240,
    pageTransitionDurationMs: 180,
  },
  motion: {
    intensity: "normal" as const,
    defaultSpringStiffness: 420,
    defaultSpringDamping: 32,
  },
  defaults: DEFAULT_THEME_CUSTOMIZATION,
} as const;

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";
