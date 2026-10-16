import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: string;
  error?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      error = false,
      checked,
      defaultChecked,
      className,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className={cn("flex items-start gap-3 select-none", className)}>
        <div className="relative flex items-center pt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            aria-invalid={error ? "true" : undefined}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 flex items-center justify-center bg-brand-white border-2 border-brand-ink rounded-[2px] shadow-neo-sm transition-all cursor-pointer peer-focus-visible:outline-3 peer-focus-visible:outline-brand-ink peer-checked:bg-brand-pink peer-checked:text-brand-ink peer-checked:translate-x-[-1px] peer-checked:translate-y-[-1px] peer-checked:shadow-neo peer-disabled:bg-neutral-200 peer-disabled:cursor-not-allowed",
              error && "border-red-500 shadow-[2px_2px_0px_#EF4444]"
            )}
          >
            <Check className="w-3.5 h-3.5 stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
        </div>

        {(label || description) && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium leading-tight cursor-pointer",
              disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {label && <span className="font-display font-bold text-brand-ink">{label}</span>}
            {description && (
              <p className="font-body text-xs text-neutral-600 mt-0.5">{description}</p>
            )}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
