"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: string;
  id?: string;
  className?: string;
}

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  label,
  description,
  id,
  className,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const generatedId = useId();
  const switchId = id || generatedId;

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onCheckedChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className={cn("flex items-start gap-3 select-none", className)}>
      <button
        type="button"
        role="switch"
        id={switchId}
        aria-checked={isChecked}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center border-2 border-brand-ink rounded-full transition-colors duration-200 outline-none shadow-neo-sm focus-visible:outline-3 focus-visible:outline-brand-ink disabled:cursor-not-allowed disabled:opacity-50",
          isChecked ? "bg-brand-pink" : "bg-neutral-200"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-brand-white border-2 border-brand-ink shadow-[1px_1px_0px_#171717] transition-transform duration-200",
            isChecked ? "translate-x-5 bg-brand-yellow" : "translate-x-0.5"
          )}
        />
      </button>

      {(label || description) && (
        <div
          onClick={toggle}
          className={cn(
            "text-sm font-medium leading-tight cursor-pointer",
            disabled && "cursor-not-allowed opacity-60"
          )}
        >
          {label && <span className="font-display font-bold text-brand-ink">{label}</span>}
          {description && (
            <p className="font-body text-xs text-neutral-600 mt-0.5">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}
