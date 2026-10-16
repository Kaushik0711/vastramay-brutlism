import React from "react";
import { cn } from "@/lib/utils";
import styles from "./Badge.module.scss";

export type BadgeVariant =
  | "pink"
  | "yellow"
  | "blue"
  | "dark"
  | "white"
  | "cream"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

export type BadgeShape = "square" | "rounded" | "pill";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  shape?: BadgeShape;
  size?: BadgeSize;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Badge({
  variant = "yellow",
  shape = "square",
  size = "md",
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  const variantClass = {
    pink: styles.variantPink,
    yellow: styles.variantYellow,
    blue: styles.variantBlue,
    dark: styles.variantDark,
    white: styles.variantWhite,
    cream: styles.variantCream,
    success: styles.variantSuccess,
    warning: styles.variantWarning,
    error: styles.variantError,
    info: styles.variantInfo,
    neutral: styles.variantNeutral,
  }[variant];

  const shapeClass = {
    square: styles.shapeSquare,
    rounded: styles.shapeRounded,
    pill: styles.shapePill,
  }[shape];

  const sizeClass = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  }[size];

  return (
    <span
      className={cn(styles.badge, variantClass, shapeClass, sizeClass, className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
