/**
 * Utility to manage document body scroll locking for modals and drawers
 * Tracks lock count to safely handle nested or sequential overlays
 */

let lockCount = 0;
let originalOverflow = "";
let originalPaddingRight = "";

export function lockBodyScroll() {
  if (typeof document === "undefined") return;

  if (lockCount === 0) {
    originalOverflow = document.body.style.overflow;
    originalPaddingRight = document.body.style.paddingRight;

    // Compensate for scrollbar shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
  }

  lockCount += 1;
}

export function unlockBodyScroll() {
  if (typeof document === "undefined") return;

  lockCount = Math.max(0, lockCount - 1);

  if (lockCount === 0) {
    document.body.style.overflow = originalOverflow;
    document.body.style.paddingRight = originalPaddingRight;
  }
}
