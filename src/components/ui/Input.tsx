import React from "react";
import { cn } from "@/lib/utils";
import styles from "./Input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error = false,
      leadingIcon,
      trailingIcon,
      className,
      containerClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn(styles.inputWrapper, containerClassName)}>
        {leadingIcon && (
          <span className={styles.adornmentLeading} aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          className={cn(
            styles.input,
            error && styles.inputError,
            leadingIcon && styles.withLeading,
            trailingIcon && styles.withTrailing,
            className
          )}
          {...props}
        />
        {trailingIcon && (
          <span className={styles.adornmentTrailing}>{trailingIcon}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
