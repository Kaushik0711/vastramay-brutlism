"use client";

import React from "react";
import Link from "next/link";
import { categories } from "@/data/categories";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface CategoryNavProps {
  activeSlug?: string;
  className?: string;
}

export function CategoryNav({ activeSlug, className }: CategoryNavProps) {
  return (
    <div className={cn("w-full overflow-x-auto py-2", className)}>
      <div className="flex items-center gap-2.5 min-w-max pb-1">
        <Link
          href="/shop"
          className={cn(
            "px-4 py-2 border-2 border-brand-ink font-display text-xs sm:text-sm font-bold uppercase transition-all shadow-neo-sm",
            !activeSlug
              ? "bg-brand-pink text-brand-ink translate-x-[-1px] translate-y-[-1px] shadow-neo"
              : "bg-brand-white text-brand-ink hover:bg-brand-yellow"
          )}
        >
          All Edits
        </Link>

        {categories.map((cat) => {
          const isActive = activeSlug === cat.slug;
          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={cn(
                "flex items-center gap-2 px-4 py-2 border-2 border-brand-ink font-display text-xs sm:text-sm font-bold uppercase transition-all shadow-neo-sm",
                isActive
                  ? "bg-brand-yellow text-brand-ink translate-x-[-1px] translate-y-[-1px] shadow-neo"
                  : "bg-brand-white text-brand-ink hover:bg-brand-cream"
              )}
            >
              <span>{cat.name}</span>
              {cat.badge && (
                <Badge
                  variant={cat.badge === "NEW" ? "pink" : "yellow"}
                  className="text-[9px] px-1 py-0"
                >
                  {cat.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
