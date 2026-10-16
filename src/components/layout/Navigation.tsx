"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export function Navigation({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main Navigation"
      className={cn("flex items-center gap-1 sm:gap-2", className)}
    >
      {siteConfig.mainNav.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative px-3 py-1.5 font-display text-sm font-bold tracking-wider uppercase transition-all duration-150 border-2",
              isActive
                ? "bg-brand-yellow text-brand-ink border-brand-ink shadow-neo-sm translate-x-[-1px] translate-y-[-1px]"
                : "bg-transparent text-brand-ink border-transparent hover:border-brand-ink hover:bg-brand-white hover:shadow-neo-sm"
            )}
          >
            <span className="flex items-center gap-1.5">
              {item.label}
              {item.badge && (
                <Badge variant="pink" shape="square" className="text-[9px] px-1 py-0">
                  {item.badge}
                </Badge>
              )}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
