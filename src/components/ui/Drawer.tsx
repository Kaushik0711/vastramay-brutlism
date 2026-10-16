"use client";

import React, { useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";
import { backdropVariants, drawerRightVariants, drawerLeftVariants, drawerBottomVariants } from "@/lib/motion";
import { UI_CONFIG } from "@/config/ui";

export type DrawerPlacement = "left" | "right" | "bottom";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  children: React.ReactNode;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  placement = "right",
  children,
  closeOnEscape = UI_CONFIG.overlay.closeOnEscape,
  closeOnOutsideClick = UI_CONFIG.overlay.closeOnOutsideClick,
  showCloseButton = true,
  className,
}: DrawerProps) {
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      lockBodyScroll();

      const timer = setTimeout(() => {
        if (drawerRef.current) {
          const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            focusable[0].focus();
          } else {
            drawerRef.current.focus();
          }
        }
      }, 50);

      return () => {
        clearTimeout(timer);
        unlockBodyScroll();
        previousActiveElement.current?.focus?.();
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  const placementVariants = {
    right: drawerRightVariants,
    left: drawerLeftVariants,
    bottom: drawerBottomVariants,
  }[placement];

  const placementClasses = {
    right: "top-0 right-0 bottom-0 w-full max-w-md border-l-3 sm:border-l-4 border-brand-ink shadow-[-6px_0px_0px_#171717]",
    left: "top-0 left-0 bottom-0 w-full max-w-md border-r-3 sm:border-r-4 border-brand-ink shadow-[6px_0px_0px_#171717]",
    bottom: "bottom-0 inset-x-0 max-h-[85vh] border-t-3 sm:border-t-4 border-brand-ink shadow-[0px_-6px_0px_#171717]",
  }[placement];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-[var(--z-drawer)] overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeOnOutsideClick ? onClose : undefined}
            className="fixed inset-0 bg-brand-ink/70 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            variants={placementVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "fixed flex flex-col bg-brand-white z-10 outline-none",
              placementClasses,
              className
            )}
          >
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="absolute top-4 right-4 z-20 p-1.5 border-2 border-brand-ink bg-brand-white text-brand-ink hover:bg-brand-pink transition-colors cursor-pointer shadow-neo-sm"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}
            {children}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export function DrawerHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-6 border-b-2 sm:border-b-3 border-brand-ink space-y-1 bg-brand-cream/40", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DrawerTitle({
  className,
  as: Component = "h2",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: React.ElementType }) {
  return (
    <Component
      className={cn("font-display font-extrabold text-xl uppercase tracking-tight text-brand-ink", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function DrawerDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-body text-xs text-neutral-600 leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function DrawerBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 flex-1 overflow-y-auto neo-scrollbar font-body text-sm", className)} {...props}>
      {children}
    </div>
  );
}

export function DrawerFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "p-4 sm:p-6 border-t-2 sm:border-t-3 border-brand-ink flex items-center justify-end gap-3 bg-brand-cream/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
