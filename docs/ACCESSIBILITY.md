# Vastramay Accessibility & Interaction Standards

This document describes the WCAG 2.2 AA practical accessibility implementations embedded across the **Vastramay** component library and application layout.

---

## 1. Skip to Main Content Link (Phase 6)
- **Implementation**: Embedded at the very top of `src/app/layout.tsx`.
- **Keyboard Behavior**: Visually hidden offscreen (`-translate-y-full`) by default; slides into full high-contrast focus on the first keyboard `Tab` press:
  ```html
  <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed ...">
    SKIP TO MAIN CONTENT
  </a>
  ```
- **Target**: `<main id="main-content">` wrapping all route children, allowing keyboard and screen-reader users to bypass the announcement bar and global header directly to the primary page contents.

---

## 2. Focus Management & Outlines

- **Consistent Focus Indicator**: All interactive elements (Buttons, Inputs, Checkboxes, Tabs, Cards) utilize a high-contrast focus indicator:
  ```css
  --focus-ring: 3px solid #171717;
  --focus-ring-offset: 2px;
  ```
- **Focus Trapping**: Modals and Drawers trap keyboard focus within the active dialog using a cycle loop on `Tab` and `Shift + Tab`.
- **Focus Restoration**: When a Modal or Drawer closes, focus returns automatically to the element that triggered it (`previousActiveElement.current.focus()`).

---

## 2. Keyboard Navigation

| Component | Key Bindings |
| :--- | :--- |
| **Modal / Drawer / Popover / Dropdown** | `Escape`: Closes the overlay immediately |
| **Tabs** | `ArrowLeft` / `ArrowRight`: Moves focus and activates adjacent tabs |
| **RadioGroup** | Arrow keys cycle selection across radio items |
| **Interactive Card / Switch** | `Enter` / `Space`: Activates the element |
| **Accordion** | `Enter` / `Space`: Expands or collapses the panel |

---

## 3. ARIA Semantics & Screen Readers

- **Live Regions**:
  - Toasts use `role="status"` and `aria-live="polite"` for success/info announcements.
  - Urgent alerts and error toasts use `role="alert"` and `aria-live="assertive"`.
- **Form Controls**:
  - `Input` and `Textarea` reflect `aria-invalid="true"` when errors are active.
  - `FormField` connects the inline error message with `role="alert"` and links `htmlFor` with label elements.
- **Price Displays**:
  - `PriceTag` injects visually hidden `.sr-only` context (`Current price:`, `Original price:`, `Discount:`) so screen readers do not read bare numbers ambiguously.
- **Progress & Loading**:
  - `Progress` exposes `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
  - `Spinner` exposes `role="status"` and an accessible screen reader label.
- **Dialogs**:
  - `Modal` and `Drawer` declare `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-describedby`.

---

## 4. Visual Contrast & Color Independence

- All text meets or exceeds the WCAG 4.5:1 contrast ratio against its background.
- Neo-brutalist solid black borders (`2px`, `3px`, `4px`) clearly delineate component boundaries without relying on subtle gray tints.
- Error states combine color changes with explicit icons and descriptive text messages (never color alone).

---

## 5. Motion Accessibility & Reduced-Motion Standards (Phase 5)

- **System-Level Respect**: Supports `prefers-reduced-motion: reduce` across both CSS and Motion via `useSyncExternalStore` subscription.
- **Graceful Motion Dampening**:
  - `html { scroll-behavior: auto }` disables smooth scrolling on reduced motion.
  - Infinite announcement marquee ticker stops running and renders a clean, static, centered single-line announcement via `.reducedMotionContainer`.
  - Tactile button and card push translates collapse to color and shadow changes (`transform: none`).
  - Page transitions and dialog entrances omit spatial movement (`y: 0`, `scale: 1`) and transition gently via opacity.
- **No Flashing or Seizure Triggers**: No animation exceeds 3 flashes per second; all motion uses controlled mechanical spring physics without continuous looping distractions.
- **Nonanimated Content Parity**: All interactive content, buttons, prices, variants, and navigation menus are 100% accessible and legible when motion is disabled.

---

## 6. Announcement Bar & Page Loader Accessibility Standards

### Announcement Marquee Ticker
- **Screen Reader Deduplication**: The marquee animation track utilizes two synchronized sequences for a seamless 0-gap loop. Sequence 1 contains the semantic announcements; Sequence 2 is strictly marked with `aria-hidden="true"` so assistive technologies never encounter duplicated promotional copy.
- **Pause on Interaction**: Both `:hover` and `:focus-within` trigger `animation-play-state: paused`, enabling low-vision and keyboard users to inspect items comfortably.
- **Static Reduced-Motion View**: When `prefers-reduced-motion: reduce` is active, the moving track is completely hidden (`display: none`), and a clean static container with `role="status"` displays the primary promotion.

### Branded Page-Reload Loader
- **Accessible Role**: Rendered with `role="status"` and `aria-label="Loading Vastramay application"`.
- **Honest Communication**: Exposes a clear status label ("PREPARING YOUR EDIT...") without announcing fabricated numerical percentages.
- **Non-Obstructive Teardown**: Upon dismissal, the overlay applies `pointer-events: none`, fades out smoothly, and unmounts from the React DOM tree (`return null`), ensuring all underlying focus targets and navigation are immediately reachable.

