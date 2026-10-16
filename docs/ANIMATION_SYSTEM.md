# Vastramay Animation & Motion System

This document specifies the motion standards, transition presets, and reduced-motion compliance governing the **Vastramay** component library.

---

## 1. Core Philosophy

Neo-brutalism relies on **mechanical, high-stiffness, low-damping tactile physics**. Animations must feel responsive, swift, and authoritative rather than floaty, blurry, or sluggish.

- **Primary Tool**: `motion/react` (Motion v12).
- **Duration**: Fast durations (120ms to 220ms).
- **Properties**: Restricted to GPU-accelerated `opacity` and `transform` properties to prevent layout shifts (CLS).
- **Reduced Motion**: Automatically respected through CSS media query and motion settings.

---

## 2. Shared Transition Presets (`src/lib/motion.ts`)

| Preset | Type | Config | Usage |
| :--- | :--- | :--- | :--- |
| `SPRING_NEO` | Spring | `stiffness: 400, damping: 30` | Modals, drawers, and card elevations |
| `TWEEN_NEO` | Tween | `duration: 0.18s, ease: [0.2, 0, 0, 1]` | Dropdowns, popovers, and tabs |
| `TWEEN_SLOW` | Tween | `duration: 0.3s, ease: [0.16, 1, 0.3, 1]` | Accordion expansion |

---

## 3. Standard Variants

### Modal / Dialog (`modalVariants`)
```ts
export const modalVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: SPRING_NEO },
  exit: { opacity: 0, scale: 0.94, y: 8, transition: { duration: 0.15 } },
};
```

### Drawer Sliding (`drawerRightVariants`, `drawerLeftVariants`, `drawerBottomVariants`)
Drawers slide in from their respective screen edge with a high-tension spring and slide out with a sharp exit tween.

### Toast Notifications (`toastVariants`)
```ts
export const toastVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: SPRING_NEO },
  exit: { opacity: 0, y: 16, scale: 0.9, transition: { duration: 0.15 } },
};
```

### Dropdowns & Popovers (`dropdownVariants`)
```ts
export const dropdownVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: TWEEN_NEO },
  exit: { opacity: 0, y: -6, scale: 0.96, transition: { duration: 0.12 } },
};
```

---

## 4. Reduced Motion Conventions

When the user specifies `prefers-reduced-motion: reduce`:
- CSS transitions fallback to instant or opacity-only transitions (`--duration-fast: 0ms`).
- In `_reset.scss`, smooth scrolling is automatically disabled.
- Transforms are minimized to prevent motion sickness.
