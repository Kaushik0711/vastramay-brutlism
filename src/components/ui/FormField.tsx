import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./Label";
import { AlertCircle } from "lucide-react";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  htmlFor?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  required = false,
  error,
  helperText,
  htmlFor,
  children,
  className,
  ...props
}: FormFieldProps) {
  const generatedId = useId();
  const fieldId = htmlFor || generatedId;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;

  return (
    <div className={cn("space-y-1.5 w-full", className)} {...props}>
      {label && (
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
      )}

      <div>{children}</div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 font-body text-xs font-bold text-red-600 mt-1 animate-in fade-in duration-150"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={helperId} className="font-body text-xs text-neutral-500 mt-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
