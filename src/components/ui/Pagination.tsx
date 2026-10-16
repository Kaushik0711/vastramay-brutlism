import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  ...props
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1.5 select-none", className)}
      {...props}
    >
      {/* Previous Button */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Go to previous page"
        className="flex items-center justify-center w-9 h-9 border-2 border-brand-ink bg-brand-white shadow-neo-sm font-display font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:not(:disabled):bg-brand-yellow hover:not(:disabled):translate-x-[-1px] hover:not(:disabled):translate-y-[-1px] transition-all cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
      </button>

      {/* Number Buttons */}
      {pages.map((p, idx) => {
        if (p === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="w-9 h-9 flex items-center justify-center font-display font-bold text-xs"
            >
              ...
            </span>
          );
        }

        const isCurrent = p === currentPage;

        return (
          <button
            key={`page-${p}`}
            type="button"
            aria-current={isCurrent ? "page" : undefined}
            onClick={() => onPageChange(p)}
            className={cn(
              "flex items-center justify-center w-9 h-9 border-2 border-brand-ink font-display font-bold text-xs transition-all cursor-pointer",
              isCurrent
                ? "bg-brand-pink text-brand-ink shadow-neo translate-x-[-1px] translate-y-[-1px]"
                : "bg-brand-white text-brand-ink shadow-neo-sm hover:bg-brand-yellow hover:translate-x-[-1px] hover:translate-y-[-1px]"
            )}
          >
            {p}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Go to next page"
        className="flex items-center justify-center w-9 h-9 border-2 border-brand-ink bg-brand-white shadow-neo-sm font-display font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:not(:disabled):bg-brand-yellow hover:not(:disabled):translate-x-[-1px] hover:not(:disabled):translate-y-[-1px] transition-all cursor-pointer"
      >
        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
      </button>
    </nav>
  );
}
