"use client";

import React from "react";
import { cn } from "@/lib/utils";
import styles from "./Card.module.scss";

export type CardBorderThickness = "hairline" | "base" | "thick" | "heavy";
export type CardShadow = "none" | "sm" | "base" | "md" | "lg" | "xl" | "pink" | "yellow" | "blue";
export type CardBackground = "white" | "cream" | "dark" | "pink" | "yellow" | "blue";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  border?: CardBorderThickness;
  thick?: boolean; // Backwards-compatible flag
  shadow?: CardShadow;
  shadowColor?: "ink" | "pink" | "yellow" | "blue"; // Backwards-compatible alias
  background?: CardBackground;
  interactive?: boolean;
  as?: React.ElementType;
}

export function Card({
  children,
  border,
  thick = false,
  shadow,
  shadowColor,
  background = "white",
  interactive = false,
  as: Component = "div",
  className,
  onClick,
  onKeyDown,
  tabIndex,
  role,
  ...props
}: CardProps) {
  // Resolve border
  const effectiveBorder: CardBorderThickness = border ?? (thick ? "thick" : "base");
  const borderClass = {
    hairline: styles.borderHairline,
    base: styles.borderBase,
    thick: styles.borderThick,
    heavy: styles.borderHeavy,
  }[effectiveBorder];

  // Resolve shadow
  let resolvedShadow: CardShadow = shadow ?? "base";
  if (shadowColor && shadowColor !== "ink") {
    resolvedShadow = shadowColor;
  }
  const shadowClass = {
    none: styles.shadowNone,
    sm: styles.shadowSm,
    base: styles.shadowBase,
    md: styles.shadowMd,
    lg: styles.shadowLg,
    xl: styles.shadowXl,
    pink: styles.shadowPink,
    yellow: styles.shadowYellow,
    blue: styles.shadowBlue,
  }[resolvedShadow];

  // Resolve background
  const bgClass = {
    white: styles.bgWhite,
    cream: styles.bgCream,
    dark: styles.bgDark,
    pink: styles.bgPink,
    yellow: styles.bgYellow,
    blue: styles.bgBlue,
  }[background];

  const isClickable = interactive && Boolean(onClick);

  const handleKeyDown = isClickable
    ? (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
        onKeyDown?.(e);
      }
    : onKeyDown;

  return (
    <Component
      className={cn(
        styles.card,
        borderClass,
        shadowClass,
        bgClass,
        interactive && styles.cardInteractive,
        className
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={isClickable ? (tabIndex ?? 0) : tabIndex}
      role={isClickable ? (role ?? "button") : role}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-5 border-b-2 border-brand-ink space-y-1.5", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  as: Component = "h3",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: React.ElementType }) {
  return (
    <Component
      className={cn(
        "font-display font-extrabold text-xl tracking-tight text-inherit",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-body text-sm opacity-80 leading-relaxed", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "p-5 pt-3 border-t-2 border-brand-ink flex items-center justify-between gap-3",
        className
      )}
      {...props}
    />
  );
}
