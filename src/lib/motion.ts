import type { Variants, Transition } from "motion/react";

/**
 * Vastramay Centralized Neo-Brutalist Animation & Motion System
 *
 * Mechanical, high-stiffness tactile physics tailored for neo-brutalism.
 * Exposes standardized durations, spring configurations, reusable variants,
 * and built-in prefers-reduced-motion adaptations.
 */

/* -------------------------------------------------------------------------
 * 1. Standard Durations (in seconds for Motion)
 * ------------------------------------------------------------------------- */
export const DURATION_FAST = 0.14;
export const DURATION_BASE = 0.2;
export const DURATION_SLOW = 0.35;

/* -------------------------------------------------------------------------
 * 2. Shared Easing & Spring Physics
 * ------------------------------------------------------------------------- */
/** Neo-brutalist snap easing curve */
export const EASE_NEO = [0.2, 0, 0, 1] as const;

/** Subtle bounce curve for micro-interactions */
export const EASE_BOUNCE = [0.34, 1.56, 0.64, 1] as const;

/** Standard high-tension neo-brutalist spring */
export const SPRING_NEO: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
};

/** Bouncy spring for micro-feedback (badges, heart taps) */
export const SPRING_BOUNCY: Transition = {
  type: "spring",
  stiffness: 550,
  damping: 24,
};

/** Gentle spring for larger surface motions (drawers, large dialogs) */
export const SPRING_GENTLE: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 34,
};

/** Standard tween transition */
export const TWEEN_NEO: Transition = {
  duration: DURATION_BASE,
  ease: EASE_NEO,
};

/** Fast snap tween */
export const TWEEN_FAST: Transition = {
  duration: DURATION_FAST,
  ease: EASE_NEO,
};

/** Slow smooth tween */
export const TWEEN_SLOW: Transition = {
  duration: DURATION_SLOW,
  ease: [0.16, 1, 0.3, 1],
};

/* -------------------------------------------------------------------------
 * 3. General Entrance & Exit Variants
 * ------------------------------------------------------------------------- */

// Clean Opacity Fade
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: TWEEN_FAST },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

// Fade & Slide Up (Cards, Sections, Form messages)
export const fadeSlideUpVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: SPRING_NEO },
  exit: { opacity: 0, y: 10, transition: TWEEN_FAST },
};

// Fade & Slide Down (Dropdowns, Notification banners)
export const fadeSlideDownVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: SPRING_NEO },
  exit: { opacity: 0, y: -8, transition: TWEEN_FAST },
};

// Horizontal Slides
export const fadeSlideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: SPRING_NEO },
  exit: { opacity: 0, x: -14, transition: TWEEN_FAST },
};

export const fadeSlideRightVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: SPRING_NEO },
  exit: { opacity: 0, x: 14, transition: TWEEN_FAST },
};

// Scale & Fade (Buttons, Modals, Pills)
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: SPRING_NEO },
  exit: { opacity: 0, scale: 0.94, transition: TWEEN_FAST },
};

/* -------------------------------------------------------------------------
 * 4. Overlay & Dialog Variants (Modal, Drawer, Tooltip, Popover)
 * ------------------------------------------------------------------------- */

// Modal / Dialog Box
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: SPRING_NEO },
  exit: { opacity: 0, scale: 0.95, y: 6, transition: { duration: 0.14, ease: EASE_NEO } },
};

// Backdrop Dimmer
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.14 } },
};

// Drawers (Slide-overs)
export const drawerRightVariants: Variants = {
  hidden: { x: "100%", opacity: 0.8 },
  visible: { x: 0, opacity: 1, transition: SPRING_GENTLE },
  exit: { x: "100%", opacity: 0.8, transition: { duration: 0.18, ease: EASE_NEO } },
};

export const drawerLeftVariants: Variants = {
  hidden: { x: "-100%", opacity: 0.8 },
  visible: { x: 0, opacity: 1, transition: SPRING_GENTLE },
  exit: { x: "-100%", opacity: 0.8, transition: { duration: 0.18, ease: EASE_NEO } },
};

export const drawerBottomVariants: Variants = {
  hidden: { y: "100%", opacity: 0.8 },
  visible: { y: 0, opacity: 1, transition: SPRING_GENTLE },
  exit: { y: "100%", opacity: 0.8, transition: { duration: 0.18, ease: EASE_NEO } },
};

// Dropdown Menus & Popovers
export const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: TWEEN_FAST },
  exit: { opacity: 0, y: -6, scale: 0.96, transition: { duration: 0.1 } },
};

export const popoverVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 4 },
  visible: { opacity: 1, scale: 1, y: 0, transition: TWEEN_FAST },
  exit: { opacity: 0, scale: 0.95, y: 4, transition: { duration: 0.1 } },
};

// Tooltip
export const tooltipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.1, ease: EASE_NEO } },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.08 } },
};

// Toast Notifications
export const toastVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: SPRING_NEO },
  exit: { opacity: 0, y: 12, scale: 0.92, transition: { duration: 0.14 } },
};

/* -------------------------------------------------------------------------
 * 5. Interactive Component Content Variants (Accordion, Tabs, Images)
 * ------------------------------------------------------------------------- */

// Accordion Collapsible Panel
export const accordionVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.22, ease: EASE_NEO } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.18, ease: EASE_NEO } },
};

// Tab Panel Switch
export const tabPanelVariants: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.16, ease: EASE_NEO } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.1 } },
};

// Image Cross-Fade for Gallery
export const imageCrossFadeVariants: Variants = {
  hidden: { opacity: 0.4 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: EASE_NEO } },
  exit: { opacity: 0.4, transition: { duration: 0.1 } },
};

/* -------------------------------------------------------------------------
 * 6. Micro-Interactions (Heartbeat, Badge Bump, Press)
 * ------------------------------------------------------------------------- */

// Wishlist Heartbeat Micro-Feedback
export const heartbeatVariants: Variants = {
  idle: { scale: 1 },
  active: {
    scale: [1, 1.35, 0.9, 1.15, 1],
    transition: { duration: 0.35, ease: EASE_BOUNCE },
  },
};

// Badge Counter Bump (Fires when cart/wishlist count changes)
export const badgeBumpVariants: Variants = {
  initial: { scale: 0.6, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: SPRING_BOUNCY },
  exit: { scale: 0.6, opacity: 0, transition: { duration: 0.1 } },
};

// Tactile Button Press Physics
export const buttonPressProps = {
  whileHover: { translate: "-1px -1px" },
  whileTap: { translate: "2px 2px" },
  transition: { duration: 0.1, ease: EASE_NEO },
};

/* -------------------------------------------------------------------------
 * 7. Staggered Orchestration
 * ------------------------------------------------------------------------- */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: SPRING_NEO },
};

/* -------------------------------------------------------------------------
 * 8. App Router Page Transitions
 * ------------------------------------------------------------------------- */
export const pageTransitionVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: EASE_NEO },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

/* -------------------------------------------------------------------------
 * 9. Reduced Motion Fallbacks & Utility Helpers
 * ------------------------------------------------------------------------- */

/**
 * Universal reduced-motion variant that collapses spatial coordinates (x, y, scale)
 * to zero, preserving gentle opacity transitions and content visibility.
 */
export const reducedMotionFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.08 } },
};

/**
 * Normalizes any Motion variants object for users with prefers-reduced-motion.
 * Keeps opacity transitions, strips spatial translations and scale jumps.
 */
export function getMotionVariant(
  standardVariant: Variants,
  prefersReduced: boolean = false
): Variants {
  if (!prefersReduced) return standardVariant;

  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.08 } },
  };
}
