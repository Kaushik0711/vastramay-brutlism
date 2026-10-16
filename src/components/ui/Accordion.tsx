"use client";

import React, { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItemData[];
  type?: "single" | "multiple";
  defaultExpanded?: string[];
  className?: string;
}

export function Accordion({
  items,
  type = "single",
  defaultExpanded = [],
  className,
}: AccordionProps) {
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded);
  const baseId = useId();

  const toggle = (id: string) => {
    if (type === "single") {
      setExpanded((prev) => (prev.includes(id) ? [] : [id]));
    } else {
      setExpanded((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  return (
    <div className={cn("space-y-3 w-full", className)}>
      {items.map((item) => {
        const isExpanded = expanded.includes(item.id);
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className="border-2 border-brand-ink bg-brand-white shadow-neo-sm overflow-hidden rounded-[2px]"
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isExpanded}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 text-left font-display font-extrabold text-sm sm:text-base uppercase tracking-tight text-brand-ink transition-colors cursor-pointer outline-none focus-visible:bg-brand-cream",
                  isExpanded ? "bg-brand-yellow" : "hover:bg-brand-cream/60",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 shrink-0 transition-transform duration-200 stroke-[2.5]",
                    isExpanded && "rotate-180"
                  )}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-4 sm:p-5 border-t-2 border-brand-ink font-body text-xs sm:text-sm text-neutral-700 leading-relaxed bg-brand-white">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
