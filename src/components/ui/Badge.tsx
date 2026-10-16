import React from "react";
import { cn } from "@/lib/utils";
import styles from "./Badge.module.scss";

export type BadgeVariant =
  | "pink"
  | "yellow"
  | "blue"
  | "dark"
  | "white"
  | "cream";

export type BadgeShape = "square" | "rounded" | "pill";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  shape?: BadgeShape;
  children: React.ReactNode;
}

export function Badge({
  variant = "yellow",
  shape = "square",
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
  }[variant];

  const shapeClass = {
    square: styles.shapeSquare,
    rounded: styles.shapeRounded,
    pill: styles.shapePill,
  }[shape];

  return (
    <span
      className={cn(styles.badge, variantClass, shapeClass, className)}
      {...props}
    >
      {children}
    </span>
  );
}
