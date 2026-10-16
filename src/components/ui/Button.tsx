import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./Button.module.scss";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "dark"
  | "outline"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;   // Backwards-compatible alias
  rightIcon?: React.ReactNode;  // Backwards-compatible alias
  href?: string;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      leadingIcon,
      trailingIcon,
      leftIcon,
      rightIcon,
      href,
      external,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const startIcon = leadingIcon ?? leftIcon;
    const endIcon = trailingIcon ?? rightIcon;

    const variantClass = {
      primary: styles.variantPrimary,
      secondary: styles.variantSecondary,
      accent: styles.variantAccent,
      dark: styles.variantDark,
      outline: styles.variantOutline,
      ghost: styles.variantGhost,
    }[variant];

    const sizeClass = {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
      icon: styles.sizeIcon,
    }[size];

    const combinedClassName = cn(
      styles.neoBtn,
      variantClass,
      sizeClass,
      fullWidth && styles.fullWidth,
      className
    );

    // If href is provided, render accessible Next.js Link
    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {startIcon}
            {children && <span>{children}</span>}
            {endIcon}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClassName}>
          {startIcon}
          {children && <span>{children}</span>}
          {endIcon}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading ? (
          <span
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            role="status"
            aria-label="Loading"
          />
        ) : (
          startIcon
        )}
        {children && <span>{children}</span>}
        {!isLoading && endIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
