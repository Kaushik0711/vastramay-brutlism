"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

export function Alert({
  variant = "info",
  title,
  dismissible = false,
  onDismiss,
  icon,
  children,
  className,
  ...props
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const defaultIcons = {
    info: <Info className="w-5 h-5 stroke-[2.5]" />,
    success: <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />,
    warning: <AlertTriangle className="w-5 h-5 stroke-[2.5]" />,
    error: <AlertCircle className="w-5 h-5 stroke-[2.5]" />,
  };

  const variantStyles = {
    info: "bg-blue-50 text-blue-950 border-brand-ink shadow-[3px_3px_0px_#4867F5]",
    success: "bg-emerald-50 text-emerald-950 border-brand-ink shadow-[3px_3px_0px_#10B981]",
    warning: "bg-amber-50 text-amber-950 border-brand-ink shadow-[3px_3px_0px_#FFE14A]",
    error: "bg-rose-50 text-rose-950 border-brand-ink shadow-[3px_3px_0px_#FF5C8A]",
  };

  const iconColors = {
    info: "text-brand-blue",
    success: "text-emerald-700",
    warning: "text-amber-800",
    error: "text-brand-pink",
  };

  return (
    <div
      role="alert"
      className={cn(
        "relative flex items-start gap-3.5 p-4 border-2 rounded-[2px]",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className={cn("shrink-0 pt-0.5", iconColors[variant])}>
        {icon ?? defaultIcons[variant]}
      </span>

      <div className="flex-1 space-y-1">
        {title && (
          <h4 className="font-display font-extrabold text-sm uppercase tracking-wide">
            {title}
          </h4>
        )}
        <div className="font-body text-xs sm:text-sm leading-relaxed">{children}</div>
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
          className="shrink-0 p-1 border border-brand-ink bg-brand-white text-brand-ink hover:bg-brand-yellow transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}
