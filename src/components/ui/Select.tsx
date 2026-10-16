import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  error?: boolean;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      error = false,
      placeholder,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "w-full appearance-none p-2.5 pr-10 font-body text-sm font-medium text-brand-ink bg-brand-white border-2 border-brand-ink rounded-[4px] shadow-neo-sm outline-none transition-all cursor-pointer focus:translate-x-[-1px] focus:translate-y-[-1px] focus:shadow-neo disabled:bg-neutral-100 disabled:cursor-not-allowed",
            error && "border-red-500 shadow-[2px_2px_0px_#EF4444] focus:shadow-[4px_4px_0px_#EF4444]",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-brand-ink">
          <ChevronDown className="w-5 h-5 stroke-[2.5]" />
        </span>
      </div>
    );
  }
);

Select.displayName = "Select";
