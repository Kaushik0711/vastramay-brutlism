# Testing Architecture & Quality Assurance Guide

## 1. Overview
Vastramay maintains a zero-dependency testing approach utilizing Node.js v24's native test runner (`node:test`, `node:assert/strict`) coupled with native type-stripping (`--experimental-strip-types`) and an ESM alias registration hook.

This ensures instant test execution (< 150ms) without introducing large testing frameworks like Jest or Vitest or modifying project production dependencies.

---

## 2. Available Verification Commands

| Command | Purpose | Verification Scope | Status |
| :--- | :--- | :--- | :--- |
| `npm test` | Unit Test Suite | Pure business calculations, coupons, shipping, cart lines, catalog lookups, announcement ticker | **Passing (28/28)** |
| `npm run lint` | Code Quality & Style | ESLint Next.js configuration rules | **Passing (0 errors)** |
| `npx tsc --noEmit` | Strict Type Checking | TypeScript 5 type checker across all source and test files | **Passing (0 errors)** |
| `npm run build` | Production Build | Turbopack compilation, dynamic route validation, static page generation | **Passing (46/46 pages)** |

---

## 3. Automated Unit Test Suites

### Suite 1: Shopping & Catalog Logic (`test/shopping.test.ts` — 25 Tests)
1. **`createCartLineId`**:
   - Generates deterministic variant line ID with trimmed, lowercase, hyphenated color formatting (`prod-1::l::midnight-blue`).
   - Generates distinct IDs for different sizes/colors of the same product.
2. **`calculateCartSubtotal` & `calculateCartCount`**:
   - Returns 0 for an empty cart.
   - Accurately sums prices across multiple items and variable quantities.
   - Defensively sanitizes negative or NaN quantities.
3. **`validateCoupon` & `calculateDiscount`**:
   - Validates supported code `BOLD15` case-insensitively.
   - Rejects unknown coupon codes or empty strings.
   - Computes integer rounded rupee discounts (e.g., ₹2,499 * 15% = ₹375).
   - Defensively returns 0 discount for zero subtotals or invalid coupons.
4. **`calculateShipping` & `calculateCartTotal`**:
   - Returns 0 shipping for empty cart.
   - Charges standard shipping (₹199) below threshold (₹1,999).
   - Unlocks complimentary free shipping at or above ₹1,999.
   - Computes total = `subtotal - discount + shipping`, clamped at 0 minimum.
5. **Variant Lookup & State Sanitization**:
   - Locates variant by size and color case-insensitively.
   - Drops invalid/stale product IDs during persisted wishlist hydration.
   - Drops malformed cart objects during persisted cart hydration.
6. **Product Catalog Lookups**:
   - Retrieves product by valid slug (`cobalt-asymmetric-mandarin-kurta`).
   - Returns `undefined` safely for nonexistent slugs.
   - Retrieves product by ID.
7. **Gender & Category Partitioning**:
   - Partitions menswear including unisex items.
   - Partitions womenswear including unisex items.
8. **Search & Filtering**:
   - Matches search terms across title, description, category, and tags.
   - Returns empty list for blank queries.
   - Sorts products by price ascending (`price-asc`) and descending (`price-desc`).

### Suite 2: Announcement Marquee Configuration (`test/announcements.test.ts` — 3 Tests)
1. **Array Validity**: Verifies `siteConfig.announcements` is a non-empty array with trimmed, non-blank strings.
2. **Promotional Copy Integrity**: Confirms presence of free shipping messaging (`₹1,999`), drop announcements, and coupon codes (`BOLD15`).
3. **Reduced-Motion Static Fallback**: Confirms primary announcement item is present and descriptive for static display when motion is disabled.

---

## 4. Test Execution Instructions

```bash
# Run unit tests directly
npm test

# Run strict TypeScript verification
npx tsc --noEmit

# Run Next.js ESLint
npm run lint

# Run full Turbopack production build
npm run build
```

---

## 5. Troubleshooting & Encountered Pitfalls

### Pitfall 1: Turbopack CSS Module Compilation Coercion
- **Symptom**: Announcement bar rendered unstyled, wrapping text across 5 lines and pushing down the homepage.
- **Root Cause**: `turbopack.rules["*.css"]` with `as: "*.css"` coerced intermediate CSS from `.module.scss` into global CSS, stripping class-name exports (`styles = {}`).
- **Fix**: Scope the `@tailwindcss/turbopack` loader rule in `next.config.ts` strictly to `"**/globals.css"`.

### Pitfall 2: React 19 Cascading Render Lint Warnings
- **Symptom**: `react-hooks/set-state-in-effect` error when calling `setIsMounted(true)` inside `useEffect()`.
- **Root Cause**: React 19's compiler and strict linter disallow synchronous `setState` in effects to prevent layout waterfalls.
- **Fix**: Use `useSyncExternalStore(emptySubscribe, () => true, () => false)` for client mount detection in client-only overlays (`PageLoader.tsx`).

---

## 6. How to Verify the Critical Customer Shopping Journey

1. **Homepage Discovery**:
   - Navigate to `/`. Observe `PageLoader` dismiss smoothly.
   - Confirm `AnnouncementBar` scrolls continuously and pauses on hover.
2. **Catalog Browsing & Filtering**:
   - Navigate to `/shop`. Toggle "Men" and "Kurtas" filters.
   - Verify filtered products match criteria.
3. **Product Detail & Variant Selection**:
   - Click a product (e.g. `/product/cobalt-asymmetric-mandarin-kurta`).
   - Select Size `M` and Color `Cobalt Blue`. Click "ADD TO BAG".
   - Confirm `CartDrawer` opens with the selected variant and animated badge.
4. **Coupon & Shipping Threshold**:
   - Note the Free Shipping progress bar. If subtotal < ₹1,999, shipping displays ₹199.
   - Apply coupon `BOLD15`. Confirm flat 15% discount applies.
5. **Simulated Checkout**:
   - Click "CHECKOUT NOW" (navigates to `/checkout`).
   - Fill valid shipping address (10-digit phone, 6-digit PIN).
   - Proceed through Step 2 (Shipping) and Step 3 (Payment).
   - Click "PLACE DEMO ORDER". Confirm simulated order receipt with reference `VASTRA-DEMO-XXXX` appears and cart is cleared.


Run test suite with watch mode during active development:
```bash
node --experimental-strip-types --import ./test/register-loader.mjs --test --watch test/**/*.test.ts
```

Run full pre-commit validation pipeline:
```bash
npm test && npm run lint && npx tsc --noEmit && npm run build
```
