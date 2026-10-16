"use client";

import React from "react";
import { motion } from "motion/react";
import { pageTransitionVariants, reducedMotionFadeVariants } from "@/lib/motion";
import { useCustomization } from "@/context/CustomizationContext";

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageTransition wrapper for Next.js App Router.
 * Used inside template.tsx to provide subtle, swift entrance animations
 * without unmounting root providers, losing shopping state, or breaking SEO.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const { prefersReducedMotion, theme } = useCustomization();

  // If page transitions are explicitly set to 'none' in theme
  if (theme.motion.pageTransitionStyle === "none") {
    return <div className={className}>{children}</div>;
  }

  const selectedVariants =
    prefersReducedMotion || theme.motion.pageTransitionStyle === "fade"
      ? reducedMotionFadeVariants
      : pageTransitionVariants;

  return (
    <motion.div
      variants={selectedVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}
