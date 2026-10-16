"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import styles from "./AnnouncementBar.module.scss";

export function AnnouncementBar() {
  const items = siteConfig.announcements;

  return (
    <aside
      aria-label="Announcements"
      className={styles.bar}
    >
      {/* Dynamic Animated Marquee Track */}
      <div className={styles.track} role="region" aria-label="Announcement ticker">
        {/* Sequence 1: Screen-reader accessible */}
        <div className={styles.sequence}>
          {items.map((text, idx) => (
            <span key={`seq1-${idx}`} className={styles.item}>
              <span className={styles.text}>{text}</span>
              <span className={styles.separator} aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>

        {/* Sequence 2: Duplicate sequence for seamless infinite -50% CSS translation */}
        <div className={styles.sequence} aria-hidden="true">
          {items.map((text, idx) => (
            <span key={`seq2-${idx}`} className={styles.item}>
              <span className={styles.text}>{text}</span>
              <span className={styles.separator} aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Static Fallback for Reduced-Motion Users */}
      <div className={styles.reducedMotionContainer} role="status">
        <span className={styles.reducedMotionText}>
          {items[0]}
        </span>
      </div>
    </aside>
  );
}
