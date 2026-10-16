# Vastramay Component Library Reference

This document serves as the architectural reference for all components in the **Vastramay** neo-brutalist UI library.

---

## Component Index

| Category | Component | File Path |
| :--- | :--- | :--- |
| **Primitives** | [Button](#button) | `src/components/ui/Button.tsx` |
| | [Badge](#badge) | `src/components/ui/Badge.tsx` |
| | [Card](#card) | `src/components/ui/Card.tsx` |
| | [Container](#container) | `src/components/ui/Container.tsx` |
| **Form Controls** | [Label](#label) | `src/components/ui/Label.tsx` |
| | [Input](#input) | `src/components/ui/Input.tsx` |
| | [Textarea](#textarea) | `src/components/ui/Textarea.tsx` |
| | [Select](#select) | `src/components/ui/Select.tsx` |
| | [Checkbox](#checkbox) | `src/components/ui/Checkbox.tsx` |
| | [RadioGroup](#radiogroup) | `src/components/ui/RadioGroup.tsx` |
| | [Switch](#switch) | `src/components/ui/Switch.tsx` |
| | [FormField](#formfield) | `src/components/ui/FormField.tsx` |
| **Feedback** | [Alert](#alert) | `src/components/ui/Alert.tsx` |
| | [Toast & Provider](#toast--provider) | `src/components/ui/toast/` |
| | [Spinner](#spinner) | `src/components/ui/Spinner.tsx` |
| | [Skeleton](#skeleton) | `src/components/ui/Skeleton.tsx` |
| | [EmptyState](#emptystate) | `src/components/ui/EmptyState.tsx` |
| | [ErrorState](#errorstate) | `src/components/ui/ErrorState.tsx` |
| | [Progress](#progress) | `src/components/ui/Progress.tsx` |
| **Overlays & Nav** | [Modal](#modal) | `src/components/ui/Modal.tsx` |
| | [ConfirmDialog](#confirmdialog) | `src/components/ui/ConfirmDialog.tsx` |
| | [Drawer](#drawer) | `src/components/ui/Drawer.tsx` |
| | [DropdownMenu](#dropdownmenu) | `src/components/ui/DropdownMenu.tsx` |
| | [Popover](#popover) | `src/components/ui/Popover.tsx` |
| | [Tooltip](#tooltip) | `src/components/ui/Tooltip.tsx` |
| | [Accordion](#accordion) | `src/components/ui/Accordion.tsx` |
| | [Tabs](#tabs) | `src/components/ui/Tabs.tsx` |
| | [Breadcrumbs](#breadcrumbs) | `src/components/ui/Breadcrumbs.tsx` |
| | [Pagination](#pagination) | `src/components/ui/Pagination.tsx` |
| **E-Commerce** | [ProductCard](#productcard) | `src/components/product/ProductCard.tsx` |
| | [PriceTag](#pricetag) | `src/components/product/PriceTag.tsx` |

---

## Primitives

### Button
- **Path**: `src/components/ui/Button.tsx`
- **Variants**: `primary` (Hot Pink), `secondary` (Yellow), `accent` (Cobalt), `dark` (Ink), `outline` (White), `ghost` (Transparent).
- **Sizes**: `sm`, `md` (default), `lg`, `icon`.
- **Props**:
  - `isLoading?: boolean`: Displays inline spinner, sets `aria-busy="true"`.
  - `fullWidth?: boolean`: Expands to fill parent container width.
  - `leadingIcon?: React.ReactNode` / `trailingIcon?: React.ReactNode`.
  - `href?: string`: Renders as Next.js `<Link>` or external `<a>`.
  - Native `React.ButtonHTMLAttributes` (defaults `type="button"`).
- **Interaction**: Mechanical push-down on active (`translate(2px, 2px)` with shadow collapse to 1px).
- **Example**:
  ```tsx
  <Button variant="primary" size="lg" trailingIcon={<ArrowRight />}>
    EXPLORE COLLECTION
  </Button>
  ```

### Badge
- **Path**: `src/components/ui/Badge.tsx`
- **Variants**:
  - Brand: `pink`, `yellow`, `blue`, `dark`, `white`, `cream`.
  - Semantic: `success`, `warning`, `error`, `info`, `neutral`.
- **Shapes**: `square` (default), `rounded`, `pill`.
- **Sizes**: `sm`, `md` (default), `lg`.
- **Props**: `icon?: React.ReactNode`, standard `HTMLAttributes<HTMLSpanElement>`.
- **Example**:
  ```tsx
  <Badge variant="success" shape="pill" size="sm" icon={<Check />}>
    IN STOCK
  </Badge>
  ```

### Card
- **Path**: `src/components/ui/Card.tsx`
- **Props**:
  - `border?: "hairline" | "base" | "thick" | "heavy"`.
  - `shadow?: "none" | "sm" | "base" | "md" | "lg" | "xl" | "pink" | "yellow" | "blue"`.
  - `background?: "white" | "cream" | "dark" | "pink" | "yellow" | "blue"`.
  - `interactive?: boolean`: Enables hover elevation and active press.
- **Child Components**: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
- **Accessibility**: When `interactive` and `onClick` are provided, Card automatically binds `role="button"`, `tabIndex={0}`, and handles `Enter`/`Space` key triggers.

---

## Form Controls

### Input
- **Path**: `src/components/ui/Input.tsx`
- **Props**: `error?: boolean`, `leadingIcon?: React.ReactNode`, `trailingIcon?: React.ReactNode`, standard `InputHTMLAttributes`.
- **Accessibility**: Automatically reflects `aria-invalid="true"` when `error` is active.

### Textarea
- **Path**: `src/components/ui/Textarea.tsx`
- **Props**: `error?: boolean`, `showCharCount?: boolean`, `maxLength?: number`.

### Select
- **Path**: `src/components/ui/Select.tsx`
- **Props**: `options?: SelectOption[]`, `placeholder?: string`, `error?: boolean`. Features custom neo-brutalist chevron indicator.

### Checkbox & Switch
- **Path**: `src/components/ui/Checkbox.tsx`, `src/components/ui/Switch.tsx`
- **Props**: `checked?: boolean`, `onCheckedChange?: (val: boolean) => void`, `label?: ReactNode`, `description?: string`.
- **Accessibility**: Full keyboard toggling with `role="switch"` or native checkbox `aria-checked`.

### FormField
- **Path**: `src/components/ui/FormField.tsx`
- **Props**: `label?: string`, `required?: boolean`, `error?: string`, `helperText?: string`, `htmlFor?: string`.
- **Accessibility**: Emits `role="alert"` for inline error messages and links `id` attributes.

---

## Feedback & Notifications

### Toast & Provider
- **Path**: `src/components/ui/toast/`
- **Methods**:
  - `toast.success(message, options?)`
  - `toast.error(message, options?)`
  - `toast.warning(message, options?)`
  - `toast.info(message, options?)`
  - `toast.custom(message, options?)`
  - `toast.dismiss(id)`
- **Features**: Pause timer on hover and focus, stack limit of 5, ARIA `role="status"` / `role="alert"` live regions, action buttons.

### Alert
- **Path**: `src/components/ui/Alert.tsx`
- **Variants**: `info`, `success`, `warning`, `error`.
- **Props**: `title?: string`, `dismissible?: boolean`, `onDismiss?: () => void`.

---

## Navigation & Overlays

### Modal & ConfirmDialog
- **Path**: `src/components/ui/Modal.tsx`, `src/components/ui/ConfirmDialog.tsx`
- **Features**: Focus trap, focus restoration on dismissal, body scroll locking, Escape key listener, outside click dismissal, spring animations.

### Drawer
- **Path**: `src/components/ui/Drawer.tsx`
- **Placements**: `right` (default), `left`, `bottom`.

### DropdownMenu, Popover & Tooltip
- **Path**: `src/components/ui/DropdownMenu.tsx`, `src/components/ui/Popover.tsx`, `src/components/ui/Tooltip.tsx`
- **Accessibility**: Tooltip uses `aria-describedby` and does not hide critical content; DropdownMenu supports keyboard Escape and outside click dismissal.

---

## E-Commerce Components

### ProductCard
- **Path**: `src/components/product/ProductCard.tsx`
- **Features**: Stable 3:4 aspect ratio, image error fallback state, interactive wishlist heart toggle, functional `onQuickView` callback, discount badges, out-of-stock overlay.

### PriceTag
- **Path**: `src/components/product/PriceTag.tsx`
- **Features**: Formats Indian Rupee (INR), calculates discount percentage, includes hidden screen reader labels for current, original, and discount prices.
