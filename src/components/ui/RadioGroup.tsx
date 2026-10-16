"use client";

import React, { createContext, useContext, useId } from "react";
import { cn } from "@/lib/utils";

interface RadioGroupContextType {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
}

export function RadioGroup({
  name,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  orientation = "vertical",
  className,
  children,
  ...props
}: RadioGroupProps) {
  const generatedName = useId();
  const groupName = name || generatedName;

  return (
    <RadioGroupContext.Provider
      value={{
        name: groupName,
        value,
        defaultValue,
        onChange: onValueChange,
        disabled,
      }}
    >
      <div
        role="radiogroup"
        aria-orientation={orientation}
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col gap-3" : "flex-row flex-wrap gap-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value: string;
  label?: React.ReactNode;
  description?: string;
}

export const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(
  ({ value, label, description, className, disabled, id, ...props }, ref) => {
    const context = useContext(RadioGroupContext);
    const generatedId = useId();
    const itemId = id || generatedId;

    const isChecked = context?.value !== undefined ? context.value === value : undefined;
    const isDefaultChecked = context?.defaultValue === value;
    const isDisabled = disabled || context?.disabled;

    return (
      <div className={cn("flex items-start gap-3 select-none", className)}>
        <div className="relative flex items-center pt-0.5">
          <input
            ref={ref}
            type="radio"
            id={itemId}
            name={context?.name}
            value={value}
            checked={isChecked}
            defaultChecked={isDefaultChecked}
            disabled={isDisabled}
            onChange={() => context?.onChange?.(value)}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 flex items-center justify-center bg-brand-white border-2 border-brand-ink rounded-full shadow-neo-sm transition-all cursor-pointer peer-focus-visible:outline-3 peer-focus-visible:outline-brand-ink peer-checked:bg-brand-yellow peer-checked:translate-x-[-1px] peer-checked:translate-y-[-1px] peer-checked:shadow-neo peer-disabled:bg-neutral-200 peer-disabled:cursor-not-allowed"
            )}
          >
            <div className="w-2.5 h-2.5 bg-brand-ink rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
        </div>

        {(label || description) && (
          <label
            htmlFor={itemId}
            className={cn(
              "text-sm font-medium leading-tight cursor-pointer",
              isDisabled && "cursor-not-allowed opacity-60"
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

RadioItem.displayName = "RadioItem";
