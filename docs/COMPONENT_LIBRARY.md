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

### CategoryNav
- **Path**: `src/components/shop/CategoryNav.tsx`
- **Features**: Horizontal scrollable navigation pill tabs linking to `/category/[slug]` with active highlight and category badge indicators.

### ProductCatalog
- **Path**: `src/components/shop/ProductCatalog.tsx`
- **Features**: Composable faceted catalog supporting multi-facet filters (category, gender, size, color swatches, price range, in-stock, on-sale), sorting selector, active filter chips with removal, mobile `Drawer` filter, and URL search query parameter synchronization.

### CatalogSkeleton
- **Path**: `src/components/shop/CatalogSkeleton.tsx`
- **Features**: Suspense boundary fallback matching the desktop sidebar and 3-column product grid layout.

### ProductDetailView
- **Path**: `src/components/product/ProductDetailView.tsx`
- **Features**: Interactive product detail layout with thumbnail switcher gallery, color swatches, size buttons with required selection validation, stock indicator badges, size guide `Modal` trigger with measurement chart, and expandable accordions for fabric craft, wash care, and pan-India shipping.

### SearchView
- **Path**: `src/components/search/SearchView.tsx`
- **Features**: Client-side search interface over local dummy catalog, popular search tag suggestion chips, input clear button, and URL query preservation (`?q=`).

### HomeNewsletter
- **Path**: `src/components/home/HomeNewsletter.tsx`
- **Features**: Interactive email subscription input with client-side format validation and instant confirmation via `toast.success`.

---

## Layout Components

### AnnouncementBar
- **Path**: `src/components/layout/AnnouncementBar.tsx`
- **Export**: `AnnouncementBar`
- **Props**: None (reads from `siteConfig.announcements`).
- **Structure**: Single-line marquee ticker with dual identical sequences for continuous `-50% translate3d` CSS loop. Sequence 2 is marked `aria-hidden="true"`.
- **Interactions**: Automatically pauses marquee scroll on `:hover` and `:focus-within`.
- **Accessibility**: Employs `<aside aria-label="Announcements">` and a static fallback container (`role="status"`) for `prefers-reduced-motion: reduce`.
- **Styling**: `AnnouncementBar.module.scss` (height: 2.25rem mobile, 2.5rem desktop, overflow hidden, white-space nowrap).

### Header
- **Path**: `src/components/layout/Header.tsx`
- **Export**: `Header`
- **Props**: None.
- **Features**:
  - Sticky header (`sticky top-0 z-40`) with high-contrast 3px bottom border.
  - VASTRAMAY brand wordmark and STUDIO badge.
  - Desktop navigation pills with active route highlight.
  - Action buttons: Live Search trigger, Wishlist counter badge link, Cart trigger badge (`CartBadge`).
  - Mobile slide-out drawer (`Drawer`) with full navigation, social links, and studio details.
- **Accessibility**: `<header>` banner landmark, `aria-expanded` and `aria-controls` on mobile trigger.

### Footer
- **Path**: `src/components/layout/Footer.tsx`
- **Export**: `Footer`
- **Props**: None (reads from `siteConfig`).
- **Features**:
  - Neo-brutalist dark section (`bg-[#171717] text-[#F7F1E5]`) with 4px top border.
  - Newsletter registration form with client feedback.
  - Four categorized link columns: Shop Collections, Studio Story, Client Care, and Legal Disclosures.
  - Live local time indicator and copyright notice.
- **Accessibility**: `<footer>` contentinfo landmark, accessible form inputs with labels.

### Navigation
- **Path**: `src/components/layout/Navigation.tsx`
- **Export**: `Navigation`
- **Props**:
  - `mobile?: boolean` (defaults `false`).
  - `onItemClick?: () => void`.
- **Features**: Renders `siteConfig.mainNav` links (`/shop`, `/men`, `/women`, `/about`, `/faq`) with active pathname matching and tactile hover feedback.

### PageLoader
- **Path**: `src/components/layout/PageLoader.tsx`
- **Export**: `PageLoader`
- **Props**: None.
- **Features**:
  - Full-screen branded loading overlay on initial document load or browser reload.
  - Centered VASTRAMAY wordmark, cobalt STUDIO badge, animated textile swatches with running stitch dots, and barber-pole progress bar.
  - React 19 `useSyncExternalStore` client mount detection to prevent hydration flash.
  - 700ms display duration (200ms on reduced-motion), 2000ms failsafe, smooth 350ms dismissal fade/scale, and complete unmounting from React DOM.
- **Accessibility**: `role="status"`, `aria-label="Loading Vastramay application"`, non-essential decorative animations, no fake progress percentages.

### PageTransition
- **Path**: `src/components/layout/PageTransition.tsx`
- **Export**: `PageTransition`
- **Props**: `{ children: React.ReactNode }`.
- **Features**: App Router client transition wrapper for `template.tsx`. Applies subtle 180ms opacity and vertical glide (`y: 6px -> 0`) using `motion.div` and `pageTransitionVariants`.

---

## Shopping & State Components

### CartDrawer
- **Path**: `src/components/cart/CartDrawer.tsx`
- **Export**: `CartDrawer`
- **Props**: None (reads from `useShopping()`).
- **Features**:
  - High-impact slide-over drawer powered by `Drawer.tsx`.
  - Variant-specific list with thumbnail, title, size badge, color chip, and unit price.
  - Stock-limit clamped steppers (`+` and `-` clamping between 1 and `item.maxStock`).
  - Free shipping progress bar (`subtotal / 1999 * 100`).
  - Order subtotal, discount, shipping estimate, and final total.
  - Direct checkout navigation to `/checkout`.

### CartBadge
- **Path**: `src/components/cart/CartBadge.tsx`
- **Export**: `CartBadge`
- **Props**:
  - `onClick?: () => void`.
  - `className?: string`.
- **Features**: Header cart button displaying animated numeric counter badge (`badgeBumpVariants` on count change). Opens `CartDrawer`.

### QuickViewModal
- **Path**: `src/components/product/QuickViewModal.tsx`
- **Export**: `QuickViewModal`
- **Props**: None (reads from `useShopping()`).
- **Features**:
  - Fast size and color selection dialog for products opened via card Quick View or Wishlist.
  - Dynamic variant stock resolution (`findMatchingVariant`).
  - Direct "ADD TO BAG" action with instant drawer open option.

