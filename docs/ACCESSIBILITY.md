# Vastramay Accessibility & Interaction Standards

This document describes the WCAG 2.1 AA accessibility implementations embedded across the **Vastramay** component library.

---

## 1. Focus Management & Outlines

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
