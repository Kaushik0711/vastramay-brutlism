# Shopping State Architecture

This document describes the design, state lifecycle, and synchronization mechanisms powering the persistent shopping experience in **Vastramay**.

---

## 1. Core Principles

1. **Pure Client State with Zero Backend Requirement**:
   - The shopping session (cart, wishlist, coupon, drawer state) is maintained purely on the client side.
   - Persistence uses browser `localStorage` under a single unified key: `STORAGE_KEY = "vastramay_shopping_state_v1"` with version control (`STORAGE_VERSION = 1`).
   - The storage payload structure is `{ version: 1, cart: CartItem[], wishlist: string[] }`.
2. **React 19 / Compiler Strict Conformance**:
   - Standard `useEffect` hydration patterns trigger cascading render warnings in React 19 (`setState inside useEffect`).
   - We utilize React's `useSyncExternalStore` hook to subscribe directly to `localStorage` and `window.addEventListener("storage", ...)` alongside internal window event `vastramay_shopping_update`.
   - This ensures **zero hydration mismatch**, **zero cascading re-renders**, and **seamless multi-tab synchronization**.
3. **Variant-Specific Line Item Identity**:
   - Products are never stored by product ID alone. Each cart entry uses a deterministic compound line ID:
     `${productId}::${cleanSize}::${cleanColor}` (e.g. `prod-1::xl::cobalt-blue`).
   - Adding the same product with a different size or color creates a distinct cart line. Adding the same variant increments quantity up to `maxStock`.
4. **Data Integrity & Automatic Catalog Sanitization**:
   - Before returning or writing state, raw entries loaded from `localStorage` are filtered and reconciled against `src/data/products.ts`.
   - If a product or variant is removed or out-of-stock in the mock catalog, it is pruned automatically without crashing the UI.

---

## 2. Architecture & File Structure

```
src/
├── types/
│   └── index.ts                 # Extended CartItem, CouponRule, DemoOrder types
├── lib/
│   └── shopping.ts              # Pure calculation helpers, validation & sanitizers
├── context/
│   └── ShoppingContext.tsx      # Centralized React 19 useSyncExternalStore provider
└── components/
    ├── providers/
    │   └── AppProviders.tsx     # ShoppingProvider wrapped inside ToastProvider
    ├── cart/
    │   ├── CartDrawer.tsx       # Slide-over neo-brutalism quick cart
    │   └── CartBadge.tsx        # Dynamic animated badge with live count
    └── product/
        └── QuickViewModal.tsx   # Fast size/color selector dialog
```

---

## 3. Pure Calculation Engine (`src/lib/shopping.ts`)

All calculations and mutations are isolated into pure functions with zero side-effects:

| Function | Signature / Purpose |
| :--- | :--- |
| `calculateCartSubtotal(cart)` | Sums `item.price * item.quantity` across all active lines with defense against NaN. |
| `calculateCartCount(cart)` | Sums `item.quantity` across all lines. |
| `calculateDiscount(subtotal, couponCode)` | Computes integer rupee discount: `Math.round(subtotal * (rule.discountPercent / 100))`. Supported code `BOLD15` (15%). |
| `calculateShipping(subtotal)` | Returns `₹0` if subtotal $\ge$ `₹1,999` (`FREE_SHIPPING_THRESHOLD`), otherwise standard delivery `₹199` (`STANDARD_SHIPPING_FEE`). |
| `calculateCartTotal(subtotal, discount, shipping)` | Calculates `Math.max(0, subtotal - discount + shipping)`. |
| `createCartLineId(productId, size, color)` | Deterministically produces `{productId}::{cleanSize}::{cleanColor}` with trimmed, lowercase, hyphenated color. |
| `findMatchingVariant(product, size, color)` | Locates variant in product catalog by size and colorName. |
| `sanitizePersistedCart(raw)` | Verifies each stored item against existing mock catalog products; drops corrupted records. |
| `sanitizePersistedWishlist(raw)` | Prunes wishlist product IDs if they no longer exist in the catalog. |

---

## 4. Hook API Reference (`useShopping`)

Components access state and actions through the `useShopping()` hook:

### State Variables
- `cart: CartItem[]` — Current cart line items.
- `cartCount: number` — Total count of all items in cart.
- `subtotal: number` — Undiscounted subtotal in INR.
- `appliedCoupon: CouponRule | null` — Currently active validated coupon rule.
- `discountAmount: number` — Amount deducted by the coupon.
- `shippingEstimate: number` — Base shipping fee (`0` or `99`).
- `total: number` — Final order total payable.
- `wishlist: string[]` — Array of product IDs marked in wishlist.
- `wishlistCount: number` — Total number of unique favorited items.
- `isCartDrawerOpen: boolean` — Visibility flag for the mini-cart slide-over drawer.
- `quickViewProduct: Product | null` — Product currently loaded into the Quick View modal.
- `isHydrated: boolean` — Flag indicating whether local storage hydration is complete.

### Cart Actions
- `addToCart(item: Omit<CartItem, "id">, openDrawer?: boolean): boolean`
  - Validates stock limit (`maxStock`).
  - Merges into existing variant line if matching, or appends a new line.
  - Fires an interactive toast notification with action link.
  - Opens `CartDrawer` automatically when `openDrawer` is `true`.
- `updateQuantity(lineId: string, quantity: number): void`
  - Clamps quantity between `1` and `item.maxStock`. Removes line if set to `0`.
- `removeFromCart(lineId: string): void`
  - Drops the line item and triggers a toast notification.
- `clearCart(): void`
  - Empties all items from the bag.
- `applyCoupon(code: string): { success: boolean; message: string }`
  - Validates code (case-insensitive) against `COUPON_RULES`.
  - Enforces minimum order value rules (e.g. ₹999).
- `removeCoupon(): void`
  - Clears applied coupon and resets discount to zero.

### Wishlist Actions
- `isInWishlist(productId: string): boolean`
  - Fast $O(1)$ set/array lookup.
- `addToWishlist(productId: string): void`
  - Adds ID, updates badges, and displays toast.
- `removeFromWishlist(productId: string): void`
  - Removes ID and triggers toast.
- `toggleWishlist(productId: string): void`
  - Toggles state with appropriate feedback.
- `moveToCart(productId: string, size?: ProductSize, color?: string): boolean`
  - Directly adds default or selected variant to bag and removes from wishlist.

### Drawer & Quick View Modal Actions
- `openCartDrawer()` / `closeCartDrawer()` / `toggleCartDrawer()`
- `openQuickView(product: Product)` / `closeQuickView()`

---

## 5. Multi-Tab & Storage Synchronization

The implementation registers cross-tab storage dispatchers:
```typescript
function notifyStorageChange(key: string, value: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, value);
  window.dispatchEvent(new Event("storage"));
}
```
Any changes made in one browser tab instantly update all other open tabs in real-time without requiring a page refresh.
