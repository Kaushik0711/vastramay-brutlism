"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { dropdownVariants } from "@/lib/motion";

export interface DropdownMenuItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: (DropdownMenuItem | "divider")[];
  align?: "left" | "right";
  className?: string;
}

export function DropdownMenu({
  trigger,
  items,
  align = "right",
  className,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (item: DropdownMenuItem) => {
    if (item.disabled) return;
    setIsOpen(false);
    item.onClick?.();
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <div
        role="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex cursor-pointer"
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            role="menu"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "absolute z-[var(--z-dropdown)] mt-2 min-w-[200px] p-1.5 bg-brand-white border-2 border-brand-ink shadow-neo rounded-[2px] outline-none",
              align === "right" ? "right-0" : "left-0",
              className
            )}
          >
            {items.map((item, idx) => {
              if (item === "divider") {
                return (
                  <div
                    key={`div-${idx}`}
                    role="separator"
                    className="my-1 border-t border-brand-ink/20"
                  />
                );
              }

              return (
                <button
                  key={item.id}
                  role="menuitem"
                  type="button"
                  disabled={item.disabled}
                  onClick={() => handleSelect(item)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2 text-left font-display font-bold text-xs uppercase tracking-wide transition-colors cursor-pointer rounded-[2px]",
                    item.disabled && "opacity-50 cursor-not-allowed",
                    item.destructive
                      ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                      : "text-brand-ink hover:bg-brand-yellow"
                  )}
                >
                  {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
