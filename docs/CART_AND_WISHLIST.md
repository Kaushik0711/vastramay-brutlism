# Cart and Wishlist Specification

This document details the user interface, interaction flows, variant rules, and coupon system for the **Vastramay** shopping bag and wishlist.

---

## 1. Mini-Cart Drawer (`src/components/cart/CartDrawer.tsx`)

The Cart Drawer is a high-impact neo-brutalism slide-over drawer powered by the base `Drawer` component.

### Capabilities:
- **Instant Access**: Triggered from the Header bag icon or automatically whenever a product is added to cart.
- **Variant Summary**: Displays the product title, selected size badge, selected color swatch, and unit price.
- **Stock Limit Enforced Stepper**: Neo-brutalist `+` and `-` buttons that clamp between `1` and `item.maxStock`. When at maximum stock, the `+` button is disabled with visual styling.
- **Inline Line Deletion**: Direct trash button to remove variant lines immediately.
- **Free Delivery Progress Indicator**: Dynamic progress bar calculating `subtotal / 1999 * 100`. Informs customer how much more to add to unlock free shipping (`₹1,999` threshold).
- **Cart Summary Footer**: Real-time subtotal, active discount display, estimated shipping, and clear call-to-actions ("CHECKOUT NOW" and "VIEW FULL BAG").
- **Empty State**: Neo-brutalism empty bag graphic with a direct CTA to explore men's and women's clothing.

---

## 2. Dedicated Cart Page (`src/app/cart/page.tsx`)

The full shopping bag page at `/cart` provides comprehensive order preparation.

### Layout & Sections:
1. **Header & Quantity Counter**:
   - Title displaying active item count (e.g. `YOUR SHOPPING BAG (3 ITEMS)`).
   - "CLEAR BAG" action paired with a `ConfirmDialog` to prevent accidental resets.
2. **Item Lines Table / Cards**:
   - High-contrast card border (`border-3 border-black shadow-[4px_4px_0_#000]`).
   - Image thumbnail linking to product detail page.
   - Size and color chips.
   - Stepper controls with stock limits.
   - Subtotal per line item (`item.price * item.quantity`).
   - Remove button with trash icon.
3. **Order Summary Sidebar**:
   - Order breakdown: Bag Subtotal, Coupon Discount, Standard Delivery Fee, and Order Total.
   - **Coupon Input Block**:
     - Uppercase input field with instant coupon validation.
     - Displays error alert or success badge with applied coupon code.
     - Removable badge (`[x]`) to revoke applied coupon.
   - **Checkout Navigation**: "PROCEED TO SECURE CHECKOUT" button directing to `/checkout`.
   - **Value Badges**: Trust assurances (Neo-brutalist badges for "100% Genuine Handlooms", "7-Day Free Exchanges", "Secure Payments").

---

## 3. Dedicated Wishlist Page (`src/app/wishlist/page.tsx`)

The customer wishlist at `/wishlist` lets shoppers collect favorites and move them to their bag.

### Capabilities:
- **Persistent Favorites**: IDs are saved in `localStorage` as part of the unified `vastramay_shopping_state_v1` payload.
- **Dynamic Catalog Hydration**: Product IDs are resolved to complete `Product` objects from `src/data/products.ts`.
- **Quick Variant Selection & Move to Bag**:
  - Clicking "SELECT & MOVE TO BAG" opens the `QuickViewModal`, allowing immediate size and color selection before adding to the bag.
  - If a default variant exists, it can be added directly and removed from the wishlist.
- **Remove & Clear All**: Direct card removal and header "CLEAR WISHLIST" action with `ConfirmDialog` safeguard.
- **Empty Wishlist State**: High-visibility neo-brutalism empty state with "EXPLORE PRODUCTS" CTA.

---

## 4. Quick View Modal (`src/components/product/QuickViewModal.tsx`)

Allows rapid variant configuration from product cards and wishlist cards:
- Remounts cleanly per product without cascading render side-effects.
- Interactive color swatches and size selector buttons.
- Real-time stock display for the selected size/color combination.
- "ADD TO BAG" button that validates selection, closes the modal, and optionally opens the `CartDrawer`.

---

## 5. Coupon Configuration (`SUPPORTED_COUPONS`)

Active coupon configuration in `src/lib/shopping.ts`:

| Coupon Code | Type | Value | Case Sensitive | Description |
| :--- | :--- | :--- | :--- | :--- |
| `BOLD15` | Percentage | 15% | No (Normalized to uppercase) | Flat 15% off across all contemporary edits |

