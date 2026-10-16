import React from "react";
import { cn } from "@/lib/utils";
import styles from "./Card.module.scss";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  thick?: boolean;
  interactive?: boolean;
  shadowColor?: "ink" | "pink" | "yellow" | "blue";
  background?: "white" | "cream" | "dark";
  as?: React.ElementType;
}

export function Card({
  children,
  thick = false,
  interactive = false,
  shadowColor = "ink",
  background = "white",
  as: Component = "div",
  className,
  ...props
}: CardProps) {
  const shadowClass = {
    ink: "",
    pink: styles.shadowPink,
    yellow: styles.shadowYellow,
    blue: styles.shadowBlue,
  }[shadowColor];

  const bgClass = {
    white: styles.bgWhite,
    cream: styles.bgCream,
    dark: styles.bgDark,
  }[background];

  return (
    <Component
      className={cn(
        styles.card,
        thick && styles.cardThick,
        interactive && styles.cardInteractive,
        shadowClass,
        bgClass,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
