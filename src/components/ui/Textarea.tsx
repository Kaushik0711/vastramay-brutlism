import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error = false,
      maxLength,
      showCharCount = false,
      value,
      defaultValue,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="relative w-full space-y-1">
        <textarea
          ref={ref}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "w-full min-h-[100px] p-3 font-body text-sm text-brand-ink bg-brand-white border-2 border-brand-ink rounded-[4px] shadow-neo-sm outline-none transition-all placeholder:text-neutral-400 focus:translate-x-[-1px] focus:translate-y-[-1px] focus:shadow-neo disabled:bg-neutral-100 disabled:cursor-not-allowed",
            error && "border-red-500 shadow-[2px_2px_0px_#EF4444] focus:shadow-[4px_4px_0px_#EF4444]",
            className
          )}
          {...props}
        />
        {showCharCount && maxLength && (
          <div className="flex justify-end text-[11px] font-mono text-neutral-500">
            {currentLength} / {maxLength}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
