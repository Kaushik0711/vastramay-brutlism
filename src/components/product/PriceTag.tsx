import React from "react";
import { formatCurrency, cn } from "@/lib/utils";

export interface PriceTagProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceTag({
  price,
  originalPrice,
  currency = "INR",
  size = "md",
  className,
}: PriceTagProps) {
  const hasDiscount = originalPrice !== undefined && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm sm:text-base",
    lg: "text-lg sm:text-2xl",
  };

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)} aria-label="Product Pricing">
      <span className="sr-only">Current price: </span>
      <span
        className={cn(
          "font-display font-extrabold text-brand-ink tracking-tight",
          sizeClasses[size]
        )}
      >
        {formatCurrency(price, currency)}
      </span>

      {hasDiscount && (
        <>
          <span className="sr-only">Original price: </span>
          <span className="font-body text-xs sm:text-sm text-neutral-500 line-through">
            {formatCurrency(originalPrice, currency)}
          </span>
          <span className="sr-only">Discount: </span>
          <span className="px-1.5 py-0.5 bg-brand-pink text-brand-ink font-display text-[10px] font-extrabold border border-brand-ink shadow-[1px_1px_0px_#171717]">
            -{discountPercent}%
          </span>
        </>
      )}
    </div>
  );
}
