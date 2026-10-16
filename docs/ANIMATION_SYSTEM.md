# Vastramay Animation & Motion System

This document specifies the motion standards, transition presets, page transitions, and reduced-motion compliance governing the **Vastramay** application following Phase 5.

---

## 1. Core Philosophy

Neo-brutalism relies on **mechanical, high-stiffness, low-damping tactile physics**. Animations must feel responsive, swift, and authoritative rather than floaty, blurry, or sluggish.

- **Primary Tool**: `motion/react` (Motion v14).
- **Duration**: Standard durations (140ms to 350ms).
- **Properties**: Restricted to GPU-composited `opacity` and `transform` properties to prevent cumulative layout shifts (CLS).
- **Reduced Motion**: Automatically respected through CSS media queries and the centralized `useCustomization()` hook.

---

## 2. Shared Transition Presets (`src/lib/motion.ts`)

| Preset | Type | Config | Usage |
| :--- | :--- | :--- | :--- |
| `SPRING_NEO` | Spring | `stiffness: 420, damping: 32` | Modals, cards, and overlay dialogs |
| `SPRING_BOUNCY` | Spring | `stiffness: 550, damping: 24` | Badge bumps, heartbeat micro-interactions |
| `SPRING_GENTLE` | Spring | `stiffness: 320, damping: 34` | Full-height slide-over drawers |
| `TWEEN_FAST` | Tween | `duration: 0.14s, ease: [0.2, 0, 0, 1]` | Fast feedback, dropdowns, popovers |
| `TWEEN_NEO` | Tween | `duration: 0.20s, ease: [0.2, 0, 0, 1]` | Standard elements and tabs |
| `TWEEN_SLOW` | Tween | `duration: 0.35s, ease: [0.16, 1, 0.3, 1]` | Accordion expansion |

---

## 3. Standard Variants Catalog

### 1. General & Entrances
- `fadeVariants`: Pure opacity entrance (`0 -> 1`) and exit (`1 -> 0`).
- `fadeSlideUpVariants`: Vertical slide up (`y: 14 -> 0`) for cards, form alerts, and list items.
- `fadeSlideDownVariants`: Vertical slide down (`y: -12 -> 0`) for notifications.
- `fadeSlideLeftVariants` / `fadeSlideRightVariants`: Horizontal slides for carousel/drawer content.
- `scaleVariants`: Scale and fade (`scale: 0.94 -> 1`).

### 2. Overlays & Dialogs
- `modalVariants`: Tactile dialog pop (`scale: 0.95, y: 8 -> scale: 1, y: 0`).
- `backdropVariants`: Smooth dark scrim fade (`opacity: 0 -> 1`).
- `drawerRightVariants`, `drawerLeftVariants`, `drawerBottomVariants`: High-tension edge slides.
- `dropdownVariants` & `popoverVariants`: Compact popover expansion with subtle offset.
- `tooltipVariants`: Fast tooltip appearance (`duration: 0.1s`).
- `toastVariants`: Notification card entrance with vertical rise.

### 3. Interactive Components
- `accordionVariants`: Height collapse and expansion (`height: 0 -> auto`).
- `tabPanelVariants`: Subtle vertical fade between active tabs (`mode="wait"`).
- `imageCrossFadeVariants`: Soft opacity transition on gallery thumbnail selection.
- `badgeBumpVariants`: Tactile pop when cart or wishlist counter updates.
- `heartbeatVariants`: Wishlist icon tap micro-feedback.

---

## 4. App Router Page Transitions (`template.tsx`)

### Architecture
Page transitions are implemented using Next.js App Router's `src/app/template.tsx` and the `<PageTransition>` client component.

```tsx
// src/app/template.tsx
import { PageTransition } from "@/components/layout/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
```

### Safety & Performance Benefits:
1. **Preserves Root Layout & Providers**: `layout.tsx` is NOT unmounted on navigation; `Header`, `Footer`, `ToastProvider`, and `ShoppingProvider` maintain active local storage state.
2. **Zero Route Delays**: Transition duration is locked to 180ms with compositor-only properties (`opacity`, `translateY: 6px`).
3. **Reduced-Motion Ready**: If `prefers-reduced-motion: reduce` is detected or set in theme customization, page transitions fall back to simple instant or opacity-only transitions.

---

## 5. Reduced-Motion Implementation

Both CSS and JavaScript layers respect accessibility constraints:
1. **CSS Layer (`_mixins.scss`, `_reset.scss`, `AnnouncementBar.module.scss`)**:
   - `scroll-behavior: auto` when `prefers-reduced-motion: reduce`.
   - Announcement ticker marquee animation disabled.
   - Button and card hover/active translates disabled (`transform: none`).
2. **Motion Layer (`src/lib/motion.ts`)**:
   - `reducedMotionFadeVariants`: Universal fallback omitting spatial translation.
   - `getMotionVariant(standard, prefersReduced)` helper function.
3. **Customization Hook (`CustomizationContext.tsx`)**:
   - Uses React 19's `useSyncExternalStore` to subscribe directly to `window.matchMedia("(prefers-reduced-motion: reduce)")`.
   - Exposes `prefersReducedMotion` boolean and manual override switch.

---

## 6. Announcement Bar Marquee Physics (`AnnouncementBar.module.scss`)

The top announcement bar employs a continuous single-line horizontal ticker engineered for high-performance zero-CLS rendering:

- **Viewport Constraints**: Height locked strictly to `2.25rem` (36px) on mobile and `2.5rem` (40px) on desktop, with `overflow: hidden` and `white-space: nowrap`.
- **Two-Sequence Seamless Loop**:
  - Exactly two identical item sequences (`Sequence 1` accessible, `Sequence 2` with `aria-hidden="true"`).
  - Moves continuously along the X axis using GPU-accelerated `transform: translate3d(0, 0, 0)` to `translate3d(-50%, 0, 0)`.
  - Linear 28s duration ensures high legibility without stutter.
- **Interaction & Ergonomics**:
  - Pauses automatically on hover (`:hover`) and keyboard focus (`:focus-within`) via `animation-play-state: paused`.
- **Reduced-Motion Fallback**:
  - Hides the moving track and renders a static, centered `.reducedMotionContainer` displaying the primary promotion cleanly.

---

## 7. Branded Page-Reload Loader (`PageLoader.tsx`)

A dedicated full-screen neo-brutalist loading overlay for initial document visits and browser reloads:

- **Lifecycle & Execution**:
  - Mounts in `src/app/layout.tsx` within `<AppProviders>`.
  - Client mount detected synchronously via `useSyncExternalStore` (React 19 compliant, avoiding cascading re-renders).
  - Active strictly on full document load / hard reload; never triggered on App Router client-side link navigation (`template.tsx` handles route transitions).
  - **Minimum display duration**: 700ms (standard) or 200ms (reduced-motion) to allow brand recognition without friction.
  - **Failsafe**: 2000ms timer guarantees unconditional dismissal.
- **Visual Design**:
  - Warm cream canvas (`#F7F1E5`) with 3px ink-black border card and 8px neo-brutalist drop shadow.
  - VASTRAMAY bold wordmark with cobalt-blue STUDIO badge.
  - Neo-brutalist textile swatch trio with alternating stitch dash animations.
  - Diagonal striped progress bar with fluid pulse.
- **Dismissal**:
  - Smooth 350ms fade-out and scale transition (`opacity: 0, transform: scale(0.98)`), setting `pointer-events: none` and unmounting completely (`isDone: true`).

