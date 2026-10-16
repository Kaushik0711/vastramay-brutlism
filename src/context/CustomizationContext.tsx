"use client";

import React, { createContext, useContext, useState, useMemo, useCallback, useSyncExternalStore } from "react";
import {
  ThemeCustomization,
  DEFAULT_THEME_CUSTOMIZATION,
} from "@/config/ui";

export interface CustomizationContextValue {
  theme: ThemeCustomization;
  updateTheme: (partial: Partial<ThemeCustomization> | ((prev: ThemeCustomization) => ThemeCustomization)) => void;
  updateColor: <K extends keyof ThemeCustomization["colors"]>(key: K, value: ThemeCustomization["colors"][K]) => void;
  updateGeometry: <K extends keyof ThemeCustomization["geometry"]>(key: K, value: ThemeCustomization["geometry"][K]) => void;
  updateMotion: <K extends keyof ThemeCustomization["motion"]>(key: K, value: ThemeCustomization["motion"][K]) => void;
  resetTheme: () => void;
  isModified: boolean;
  prefersReducedMotion: boolean;
  cssVariables: Record<string, string>;
}

const CustomizationContext = createContext<CustomizationContextValue | null>(null);

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeCustomization>(DEFAULT_THEME_CUSTOMIZATION);

  // Subscribe to OS prefers-reduced-motion via React 19 useSyncExternalStore
  const osReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const prefersReducedMotion = theme.motion.reducedMotion || osReducedMotion;

  const updateTheme = useCallback(
    (updater: Partial<ThemeCustomization> | ((prev: ThemeCustomization) => ThemeCustomization)) => {
      setTheme((prev) => {
        if (typeof updater === "function") {
          return updater(prev);
        }
        return {
          ...prev,
          ...updater,
          colors: { ...prev.colors, ...updater.colors },
          geometry: { ...prev.geometry, ...updater.geometry },
          motion: { ...prev.motion, ...updater.motion },
        };
      });
    },
    []
  );

  const updateColor = useCallback(
    <K extends keyof ThemeCustomization["colors"]>(key: K, value: ThemeCustomization["colors"][K]) => {
      setTheme((prev) => ({
        ...prev,
        colors: { ...prev.colors, [key]: value },
      }));
    },
    []
  );

  const updateGeometry = useCallback(
    <K extends keyof ThemeCustomization["geometry"]>(key: K, value: ThemeCustomization["geometry"][K]) => {
      setTheme((prev) => ({
        ...prev,
        geometry: { ...prev.geometry, [key]: value },
      }));
    },
    []
  );

  const updateMotion = useCallback(
    <K extends keyof ThemeCustomization["motion"]>(key: K, value: ThemeCustomization["motion"][K]) => {
      setTheme((prev) => ({
        ...prev,
        motion: { ...prev.motion, [key]: value },
      }));
    },
    []
  );

  const resetTheme = useCallback(() => {
    setTheme(DEFAULT_THEME_CUSTOMIZATION);
  }, []);

  const isModified = useMemo(() => {
    return JSON.stringify(theme) !== JSON.stringify(DEFAULT_THEME_CUSTOMIZATION);
  }, [theme]);

  // Generate CSS custom properties dictionary
  const cssVariables = useMemo(() => {
    const { colors, geometry, motion } = theme;
    const bw = `${geometry.borderWidth}px`;
    const so = `${geometry.shadowOffset}px`;
    const rad = `${geometry.radius}px`;

    return {
      "--bg-base": colors.bgBase,
      "--fg-base": colors.fgBase,
      "--brand-primary": colors.brandPrimary,
      "--color-pink": colors.brandPrimary,
      "--brand-secondary": colors.brandSecondary,
      "--color-yellow": colors.brandSecondary,
      "--brand-accent": colors.brandAccent,
      "--color-blue": colors.brandAccent,
      "--bg-surface": colors.bgSurface,
      "--border-color-default": colors.borderColor,
      "--color-ink": colors.borderColor,
      "--focus-ring-color": colors.focusRingColor,
      "--scrollbar-track": colors.scrollbarTrack,
      "--scrollbar-thumb": colors.scrollbarThumb,
      "--scrollbar-thumb-hover": colors.scrollbarThumbHover,

      "--border-width-base": bw,
      "--border-width-thick": `${geometry.borderWidth + 1}px`,
      "--border-width-heavy": `${geometry.borderWidth + 2}px`,

      "--shadow-sm": `${Math.max(1, Math.round(geometry.shadowOffset * 0.5))}px ${Math.max(1, Math.round(geometry.shadowOffset * 0.5))}px 0px 0px ${colors.borderColor}`,
      "--shadow-base": `${so} ${so} 0px 0px ${colors.borderColor}`,
      "--shadow-md": `${geometry.shadowOffset + 2}px ${geometry.shadowOffset + 2}px 0px 0px ${colors.borderColor}`,
      "--shadow-lg": `${geometry.shadowOffset + 4}px ${geometry.shadowOffset + 4}px 0px 0px ${colors.borderColor}`,
      "--shadow-xl": `${geometry.shadowOffset + 8}px ${geometry.shadowOffset + 8}px 0px 0px ${colors.borderColor}`,

      "--radius-sm": rad,
      "--radius-base": rad,
      "--radius-md": `${geometry.radius + 2}px`,

      "--duration-base": `${motion.durationBaseMs}ms`,
      "--duration-fast": `${Math.round(motion.durationBaseMs * 0.7)}ms`,
      "--duration-slow": `${Math.round(motion.durationBaseMs * 1.75)}ms`,
    } as Record<string, string>;
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      updateTheme,
      updateColor,
      updateGeometry,
      updateMotion,
      resetTheme,
      isModified,
      prefersReducedMotion,
      cssVariables,
    }),
    [theme, updateTheme, updateColor, updateGeometry, updateMotion, resetTheme, isModified, prefersReducedMotion, cssVariables]
  );

  return (
    <CustomizationContext.Provider value={value}>
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization(): CustomizationContextValue {
  const ctx = useContext(CustomizationContext);
  if (!ctx) {
    throw new Error("useCustomization must be used within a CustomizationProvider");
  }
  return ctx;
}
