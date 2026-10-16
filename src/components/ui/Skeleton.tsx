import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export function Skeleton({
  bordered = false,
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-neutral-200/80 rounded-[2px]",
        bordered && "border-2 border-brand-ink/40 shadow-[2px_2px_0px_rgba(23,23,23,0.15)]",
        className
      )}
      {...props}
    />
  );
}
