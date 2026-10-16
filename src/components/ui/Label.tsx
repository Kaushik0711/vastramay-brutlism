import React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({
  children,
  required = false,
  className,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "block font-display font-bold text-xs uppercase tracking-wider text-brand-ink select-none",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {required && (
        <span className="text-brand-pink ml-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
