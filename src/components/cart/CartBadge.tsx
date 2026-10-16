"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { badgeBumpVariants } from "@/lib/motion";

export interface CartBadgeProps {
  count?: number;
  onClick?: () => void;
}

export function CartBadge({ count = 0, onClick }: CartBadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Shopping bag with ${count} items`}
      className="relative flex items-center justify-center p-2.5 bg-brand-white border-2 border-brand-ink shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
    >
      <ShoppingBag className="w-5 h-5 text-brand-ink stroke-[2.2]" />
      <span className="sr-only">Cart</span>
      <AnimatePresence mode="popLayout">
        {count > 0 && (
          <motion.span
            key={count}
            variants={badgeBumpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-5 px-1 bg-brand-pink text-brand-ink font-display font-extrabold text-[10px] border-2 border-brand-ink rounded-full shadow-[1px_1px_0px_#171717]"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
