import React from "react";
import { cn } from "@/lib/utils";

export type SpinnerSize = "sm" | "md" | "lg" | "xl";
export type SpinnerColor = "ink" | "pink" | "yellow" | "blue" | "white";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
}

export function Spinner({
  size = "md",
  color = "ink",
  label = "Loading...",
  className,
  ...props
}: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-10 h-10 border-3",
    xl: "w-14 h-14 border-4",
  };

  const colorClasses = {
    ink: "border-brand-ink/20 border-t-brand-ink",
    pink: "border-brand-pink/25 border-t-brand-pink",
    yellow: "border-brand-yellow/30 border-t-brand-yellow",
    blue: "border-brand-blue/25 border-t-brand-blue",
    white: "border-white/30 border-t-white",
  };

  return (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <div
        className={cn(
          "animate-spin rounded-none",
          sizeClasses[size],
          colorClasses[color]
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
