"use client";

import React, { useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";
import { backdropVariants, modalVariants } from "@/lib/motion";
import { UI_CONFIG } from "@/config/ui";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  size = "md",
  closeOnEscape = UI_CONFIG.overlay.closeOnEscape,
  closeOnOutsideClick = UI_CONFIG.overlay.closeOnOutsideClick,
  showCloseButton = true,
  className,
}: ModalProps) {
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  // Manage body scroll locking and focus restoration
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      lockBodyScroll();

      // Focus first focusable element inside modal
      const timer = setTimeout(() => {
        if (modalContentRef.current) {
          const focusable = modalContentRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            focusable[0].focus();
          } else {
            modalContentRef.current.focus();
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

  // Handle Escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }

      // Basic tab cycle trap
      if (e.key === "Tab" && modalContentRef.current) {
        const focusable = modalContentRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  const sizeClasses: Record<ModalSize, string> = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[calc(100vw-2rem)] min-h-[calc(100vh-2rem)]",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
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

          {/* Modal Content Frame */}
          <motion.div
            ref={modalContentRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            tabIndex={-1}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "relative w-full bg-brand-white border-3 sm:border-4 border-brand-ink shadow-neo-xl z-10 my-auto outline-none rounded-[2px]",
              sizeClasses[size],
              className
            )}
          >
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="absolute top-4 right-4 z-10 p-1.5 border-2 border-brand-ink bg-brand-white text-brand-ink hover:bg-brand-pink transition-colors cursor-pointer shadow-neo-sm focus-visible:outline-2"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ModalHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-6 border-b-2 sm:border-b-3 border-brand-ink space-y-1.5", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalTitle({
  className,
  as: Component = "h2",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: React.ElementType }) {
  return (
    <Component
      className={cn("font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-brand-ink", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function ModalDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-body text-xs sm:text-sm text-neutral-600 leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function ModalBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 max-h-[70vh] overflow-y-auto font-body text-sm", className)} {...props}>
      {children}
    </div>
  );
}

export function ModalFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "p-4 sm:p-6 border-t-2 sm:border-t-3 border-brand-ink flex flex-col-reverse sm:flex-row items-center justify-end gap-3 bg-brand-cream/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
