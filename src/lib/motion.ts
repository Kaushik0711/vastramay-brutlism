import type { Variants, Transition } from "motion/react";

/**
 * Neo-Brutalist Animation Physics & Transitions
 * Respects prefers-reduced-motion
 */

export const SPRING_NEO: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const TWEEN_NEO: Transition = {
  duration: 0.18,
  ease: [0.2, 0, 0, 1],
};

export const TWEEN_SLOW: Transition = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1],
};

// Fade Variants
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: TWEEN_NEO },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

// Fade & Slide
export const fadeSlideUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: SPRING_NEO },
  exit: { opacity: 0, y: 12, transition: TWEEN_NEO },
};

// Scale & Fade (Modals / Dialogs)
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: SPRING_NEO },
  exit: { opacity: 0, scale: 0.94, y: 8, transition: { duration: 0.15 } },
};

// Drawer Movement
export const drawerRightVariants: Variants = {
  hidden: { x: "100%", opacity: 0.6 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 350, damping: 35 } },
  exit: { x: "100%", opacity: 0.6, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
};

export const drawerLeftVariants: Variants = {
  hidden: { x: "-100%", opacity: 0.6 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 350, damping: 35 } },
  exit: { x: "-100%", opacity: 0.6, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
};

export const drawerBottomVariants: Variants = {
  hidden: { y: "100%", opacity: 0.6 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 350, damping: 35 } },
  exit: { y: "100%", opacity: 0.6, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
};

// Backdrop
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// Toast Notification
export const toastVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: SPRING_NEO },
  exit: { opacity: 0, y: 16, scale: 0.9, transition: { duration: 0.15 } },
};

// Dropdown / Popover expansion
export const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: TWEEN_NEO },
  exit: { opacity: 0, y: -6, scale: 0.96, transition: { duration: 0.12 } },
};

// Staggered Container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};
