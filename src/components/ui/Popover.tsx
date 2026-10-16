"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { popoverVariants } from "@/lib/motion";

export type PopoverAlign = "start" | "center" | "end";
export type PopoverSide = "top" | "bottom" | "left" | "right";

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: PopoverSide;
  align?: PopoverAlign;
  className?: string;
}

export function Popover({
  trigger,
  children,
  side = "bottom",
  align = "center",
  className,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const sideClasses: Record<PopoverSide, string> = {
    bottom: "top-full mt-2",
    top: "bottom-full mb-2",
    left: "right-full mr-2 top-0",
    right: "left-full ml-2 top-0",
  };

  const alignClasses: Record<PopoverAlign, string> = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <div
        role="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex cursor-pointer"
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={popoverVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "absolute z-[var(--z-dropdown)] p-4 max-h-[360px] overflow-y-auto neo-scrollbar bg-brand-white border-2 border-brand-ink shadow-neo rounded-[2px] min-w-[240px]",
              sideClasses[side],
              (side === "top" || side === "bottom") && alignClasses[align],
              className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
