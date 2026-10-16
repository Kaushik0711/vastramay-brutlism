"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import styles from "./AnnouncementBar.module.scss";

export function AnnouncementBar() {
  const items = siteConfig.announcements;
  // Repeat items for seamless infinite marquee loop
  const duplicated = [...items, ...items, ...items, ...items];

  return (
    <aside
      aria-label="Announcements"
      className={styles.bar}
    >
      <div className={styles.track}>
        {duplicated.map((text, idx) => (
          <span key={idx} className={styles.item}>
            {text}
            <span className={styles.separator} aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </aside>
  );
}
