import type { CartItem, CouponRule, Product, ProductVariant } from "@/types";
import { getProductById } from "@/lib/products";

export const FREE_SHIPPING_THRESHOLD = 1999;
export const STANDARD_SHIPPING_FEE = 199;
export const STORAGE_KEY = "vastramay_shopping_state_v1";
export const STORAGE_VERSION = 1;

export const SUPPORTED_COUPONS: Record<string, CouponRule> = {
  BOLD15: {
    code: "BOLD15",
    discountPercent: 15,
    description: "Flat 15% off across all contemporary edits",
  },
};

/**
 * Generate a deterministic, variant-specific unique cart-line ID
 */
export function createCartLineId(
  productId: string,
  size: string,
  colorName: string
): string {
  const cleanSize = size.trim().toLowerCase();
  const cleanColor = colorName.trim().toLowerCase().replace(/\s+/g, "-");
  return `${productId}::${cleanSize}::${cleanColor}`;
}

/**
 * Calculate the subtotal of all items in the cart
 */
export function calculateCartSubtotal(cart: CartItem[]): number {
  return cart.reduce((acc, item) => {
    const validPrice = Math.max(0, Math.round(item.price || 0));
    const validQty = Math.max(1, Math.round(item.quantity || 1));
    return acc + validPrice * validQty;
  }, 0);
}

/**
 * Calculate the total unit quantity in the cart
 */
export function calculateCartCount(cart: CartItem[]): number {
  return cart.reduce((acc, item) => acc + Math.max(0, Math.round(item.quantity || 0)), 0);
}

/**
 * Validate a coupon code (case-insensitive)
 */
export function validateCoupon(code: string): CouponRule | null {
  if (!code) return null;
  const upper = code.trim().toUpperCase();
  return SUPPORTED_COUPONS[upper] || null;
}

/**
 * Calculate discount amount in integer rupees
 */
export function calculateDiscount(
  subtotal: number,
  couponCode: string | null
): number {
  if (!couponCode || subtotal <= 0) return 0;
  const rule = validateCoupon(couponCode);
  if (!rule) return 0;
  return Math.round(subtotal * (rule.discountPercent / 100));
}

/**
 * Calculate shipping charges according to the free shipping threshold
 */
export function calculateShipping(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
}

/**
 * Calculate the final payable total
 */
export function calculateCartTotal(
  subtotal: number,
  discountAmount: number,
  shippingFee: number
): number {
  return Math.max(0, subtotal - discountAmount + shippingFee);
}

/**
 * Find matching product variant by size and colorName
 */
export function findMatchingVariant(
  product: Product,
  size: string,
  colorName: string
): ProductVariant | undefined {
  if (!product.variants || product.variants.length === 0) return undefined;

  return product.variants.find(
    (v) =>
      v.size.toLowerCase() === size.toLowerCase() &&
      v.colorName.toLowerCase() === colorName.toLowerCase()
  );
}

export interface PersistedShoppingPayload {
  version: number;
  cart: {
    id: string;
    productId: string;
    variantId?: string;
    size: string;
    colorName: string;
    colorHex?: string;
    quantity: number;
  }[];
  wishlist: string[];
  appliedCoupon: string | null;
}

/**
 * Validate and reconstruct persisted cart lines against current catalog
 * Drops any items whose products or variants no longer exist or are corrupted.
 */
export function sanitizePersistedCart(
  persistedItems: unknown[]
): CartItem[] {
  if (!Array.isArray(persistedItems)) return [];

  const sanitized: CartItem[] = [];

  for (const raw of persistedItems) {
    if (!raw || typeof raw !== "object") continue;
    const item = raw as Partial<CartItem>;

    if (!item.productId || typeof item.productId !== "string") continue;
    const product = getProductById(item.productId);
    if (!product) continue; // Product was removed from catalog

    const size = typeof item.size === "string" ? item.size : "";
    const colorName = typeof item.colorName === "string" ? item.colorName : "";
    if (!size) continue;

    const variant = findMatchingVariant(product, size, colorName);
    const maxStock = variant ? variant.stock : 10;
    if (variant && (!variant.inStock || variant.stock <= 0)) {
      continue; // Sold out in current catalog
    }

    const quantity = Math.min(
      maxStock,
      Math.max(1, Math.round(Number(item.quantity) || 1))
    );

    const primaryImage =
      product.images?.[0]?.src ||
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80";

    sanitized.push({
      id: createCartLineId(product.id, size, colorName || variant?.colorName || "Default"),
      productId: product.id,
      variantId: variant?.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      originalPrice: product.originalPrice,
      size,
      colorName: colorName || variant?.colorName || "Default",
      colorHex: variant?.colorHex,
      imageSrc: primaryImage,
      quantity,
      maxStock,
    });
  }

  return sanitized;
}

/**
 * Validate and filter persisted wishlist IDs against current catalog
 */
export function sanitizePersistedWishlist(rawList: unknown[]): string[] {
  if (!Array.isArray(rawList)) return [];

  const unique = new Set<string>();
  for (const id of rawList) {
    if (typeof id === "string" && getProductById(id)) {
      unique.add(id);
    }
  }

  return Array.from(unique);
}
