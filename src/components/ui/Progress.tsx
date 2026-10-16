import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  showLabel?: boolean;
  color?: "pink" | "yellow" | "blue" | "ink";
}

export function Progress({
  value,
  max = 100,
  showLabel = false,
  color = "pink",
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const colorStyles = {
    pink: "bg-brand-pink",
    yellow: "bg-brand-yellow",
    blue: "bg-brand-blue",
    ink: "bg-brand-ink",
  }[color];

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-mono font-bold text-brand-ink">
          <span>PROGRESS</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="w-full h-4 bg-brand-white border-2 border-brand-ink rounded-[2px] shadow-neo-sm overflow-hidden p-0.5"
      >
        <div
          className={cn(
            "h-full border border-brand-ink transition-all duration-300 ease-out",
            colorStyles
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
