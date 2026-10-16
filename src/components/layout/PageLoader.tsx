"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import styles from "./PageLoader.module.scss";

const emptySubscribe = () => () => {};

/**
 * Branded Full-Screen Initial Page-Reload Loader
 *
 * Appears solely on initial document mount or full browser refresh.
 * Never interrupts client-side Next.js App Router navigation.
 * Complies with WCAG 2.2 AA and honors prefers-reduced-motion.
 */
export function PageLoader() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Minimum display duration to register brand identity without artificial latency
    const displayDuration = prefersReducedMotion ? 200 : 700;

    let exitTimeoutId: ReturnType<typeof setTimeout>;

    const triggerDismissal = () => {
      setIsExiting(true);
      exitTimeoutId = setTimeout(() => {
        setIsDone(true);
      }, prefersReducedMotion ? 0 : 350);
    };

    const minDisplayTimer = setTimeout(() => {
      triggerDismissal();
    }, displayDuration);

    // Hard failsafe: guaranteed removal within 2000ms regardless of network state
    const failsafeTimer = setTimeout(() => {
      triggerDismissal();
    }, 2000);

    return () => {
      clearTimeout(minDisplayTimer);
      clearTimeout(failsafeTimer);
      if (exitTimeoutId) clearTimeout(exitTimeoutId);
    };
  }, []);

  // Avoid SSR hydration mismatches and remove completely once finished
  if (!isMounted || isDone) {
    return null;
  }

  return (
    <div
      role="status"
      aria-label="Loading Vastramay"
      aria-live="polite"
      className={`${styles.overlay} ${isExiting ? styles.exiting : ""}`}
    >
      <div className={styles.card}>
        {/* Brand Wordmark & Studio Badge */}
        <div className={styles.brandRow}>
          <h1 className={styles.wordmark}>VASTRAMAY</h1>
          <span className={styles.badge}>STUDIO ATELIER</span>
        </div>

        {/* Neo-Brutalist Textile Swatches with Running Stitch Indicator */}
        <div className={styles.visualContainer} aria-hidden="true">
          <div className={`${styles.swatch} ${styles.swatchPink}`}>
            <span className={styles.stitchDot} />
          </div>
          <div className={`${styles.swatch} ${styles.swatchYellow}`}>
            <span className={styles.stitchDot} />
          </div>
          <div className={`${styles.swatch} ${styles.swatchBlue}`}>
            <span className={styles.stitchDot} />
          </div>
        </div>

        {/* Neo-Brutalist Striped Progress Track */}
        <div className={styles.progressTrack} aria-hidden="true">
          <div className={styles.progressBar} />
        </div>

        {/* Short Utilitarian Loading Label */}
        <p className={styles.statusText}>PREPARING YOUR EDIT...</p>
      </div>
    </div>
  );
}
