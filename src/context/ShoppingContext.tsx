"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { CartItem, Product } from "@/types";
import { getProductById } from "@/lib/products";
import {
  calculateCartSubtotal,
  calculateCartCount,
  calculateDiscount,
  calculateShipping,
  calculateCartTotal,
  createCartLineId,
  validateCoupon,
  sanitizePersistedCart,
  sanitizePersistedWishlist,
  findMatchingVariant,
  FREE_SHIPPING_THRESHOLD,
  STORAGE_KEY,
  STORAGE_VERSION,
  type PersistedShoppingPayload,
} from "@/lib/shopping";
import { toast } from "@/components/ui/toast";

export interface ShoppingContextValue {
  // Cart State & Calculations
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  appliedCoupon: string | null;
  discountAmount: number;
  shippingEstimate: number;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  total: number;
  isHydrated: boolean;

  // Cart Actions
  addToCart: (
    item: Omit<CartItem, "id">,
    options?: { openDrawer?: boolean; silentToast?: boolean }
  ) => boolean;
  updateQuantity: (cartItemId: string, newQuantity: number) => boolean;
  removeFromCart: (cartItemId: string, options?: { silentToast?: boolean }) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Cart Drawer Controls
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;

  // Wishlist State & Actions
  wishlist: string[];
  wishlistCount: number;
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  moveToCart: (productId: string, size?: string, colorName?: string) => boolean;

  // Quick View / Variant Selection Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const ShoppingContext = createContext<ShoppingContextValue | undefined>(undefined);

const LOCAL_EVENT_NAME = "vastramay_shopping_update";

function subscribeShoppingStorage(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", callback);
  window.addEventListener(LOCAL_EVENT_NAME, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LOCAL_EVENT_NAME, callback);
  };
}

function getShoppingSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerShoppingSnapshot(): string | null {
  return null;
}

function saveShoppingPayload(payload: PersistedShoppingPayload): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(new Event(LOCAL_EVENT_NAME));
  } catch {
    // Graceful handling if storage is disabled or quota exceeded
  }
}

export function ShoppingProvider({ children }: { children: React.ReactNode }) {
  // Use React 19 useSyncExternalStore for safe client-side localStorage binding
  const storageRaw = useSyncExternalStore(
    subscribeShoppingStorage,
    getShoppingSnapshot,
    getServerShoppingSnapshot
  );

  const isHydrated = storageRaw !== null || (typeof window !== "undefined");

  // In-memory fallback if storage empty or SSR
  const [inMemoryState, setInMemoryState] = useState<PersistedShoppingPayload>({
    version: STORAGE_VERSION,
    cart: [],
    wishlist: [],
    appliedCoupon: null,
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Parse and sanitize current storage
  const parsedState = useMemo<PersistedShoppingPayload>(() => {
    if (!storageRaw) return inMemoryState;
    try {
      const parsed = JSON.parse(storageRaw);
      if (parsed && typeof parsed === "object") {
        return {
          version: STORAGE_VERSION,
          cart: Array.isArray(parsed.cart) ? parsed.cart : [],
          wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
          appliedCoupon: typeof parsed.appliedCoupon === "string" ? parsed.appliedCoupon : null,
        };
      }
    } catch {
      // Ignored
    }
    return inMemoryState;
  }, [storageRaw, inMemoryState]);

  // Derived sanitized cart lines with mock catalog resolution
  const cart = useMemo<CartItem[]>(() => {
    return sanitizePersistedCart(parsedState.cart);
  }, [parsedState.cart]);

  // Derived sanitized wishlist IDs
  const wishlist = useMemo<string[]>(() => {
    return sanitizePersistedWishlist(parsedState.wishlist);
  }, [parsedState.wishlist]);

  const appliedCoupon = useMemo<string | null>(() => {
    if (!parsedState.appliedCoupon) return null;
    const valid = validateCoupon(parsedState.appliedCoupon);
    return valid ? valid.code : null;
  }, [parsedState.appliedCoupon]);

  // State update dispatcher
  const updatePersistedState = useCallback(
    (updater: (prev: PersistedShoppingPayload) => PersistedShoppingPayload) => {
      const next = updater(parsedState);
      setInMemoryState(next);
      saveShoppingPayload(next);
    },
    [parsedState]
  );

  // Derived financial figures
  const subtotal = useMemo(() => calculateCartSubtotal(cart), [cart]);
  const cartCount = useMemo(() => calculateCartCount(cart), [cart]);
  const discountAmount = useMemo(
    () => calculateDiscount(subtotal, appliedCoupon),
    [subtotal, appliedCoupon]
  );
  const shippingEstimate = useMemo(() => calculateShipping(subtotal), [subtotal]);
  const amountToFreeShipping = useMemo(
    () => Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
    [subtotal]
  );
  const total = useMemo(
    () => calculateCartTotal(subtotal, discountAmount, shippingEstimate),
    [subtotal, discountAmount, shippingEstimate]
  );

  // Cart Actions
  const addToCart = useCallback(
    (
      newItem: Omit<CartItem, "id">,
      options?: { openDrawer?: boolean; silentToast?: boolean }
    ): boolean => {
      if (!newItem.size) {
        toast.error("Please select a size", {
          description: "Choose your preferred fit before adding to bag.",
        });
        return false;
      }

      const product = getProductById(newItem.productId);
      if (!product) {
        toast.error("Product unavailable", {
          description: "This item could not be found in our current catalog.",
        });
        return false;
      }

      const variant = findMatchingVariant(product, newItem.size, newItem.colorName);
      const maxStock = variant ? variant.stock : newItem.maxStock || 10;

      if (variant && (!variant.inStock || variant.stock <= 0)) {
        toast.error("Selected variant sold out", {
          description: `${newItem.size} in ${newItem.colorName} is currently unavailable.`,
        });
        return false;
      }

      const lineId = createCartLineId(newItem.productId, newItem.size, newItem.colorName);

      updatePersistedState((prev) => {
        const existingIdx = prev.cart.findIndex((i) => i.id === lineId);
        if (existingIdx > -1) {
          const updated = [...prev.cart];
          const curr = updated[existingIdx];
          const newQty = Math.min(maxStock, curr.quantity + (newItem.quantity || 1));
          updated[existingIdx] = { ...curr, quantity: newQty };
          return { ...prev, cart: updated };
        }

        const validQty = Math.min(maxStock, Math.max(1, newItem.quantity || 1));
        return {
          ...prev,
          cart: [
            ...prev.cart,
            {
              id: lineId,
              productId: newItem.productId,
              variantId: variant?.id,
              size: newItem.size,
              colorName: newItem.colorName,
              colorHex: variant?.colorHex,
              quantity: validQty,
            },
          ],
        };
      });

      if (!options?.silentToast) {
        toast.success(`Added to bag: ${newItem.title}`, {
          description: `Size: ${newItem.size} · Color: ${newItem.colorName} · Qty: ${newItem.quantity || 1}`,
        });
      }

      if (options?.openDrawer ?? true) {
        setIsCartDrawerOpen(true);
      }

      return true;
    },
    [updatePersistedState]
  );

  const updateQuantity = useCallback(
    (cartItemId: string, newQuantity: number): boolean => {
      const existing = cart.find((i) => i.id === cartItemId);
      if (!existing) return false;

      if (newQuantity <= 0) {
        toast.info(`Removed ${existing.title} from bag`);
        updatePersistedState((prev) => ({
          ...prev,
          cart: prev.cart.filter((i) => i.id !== cartItemId),
        }));
        return true;
      }

      if (newQuantity > existing.maxStock) {
        toast.warning(`Maximum stock limit reached`, {
          description: `Only ${existing.maxStock} units available for this variant.`,
        });
        return false;
      }

      updatePersistedState((prev) => ({
        ...prev,
        cart: prev.cart.map((i) => (i.id === cartItemId ? { ...i, quantity: newQuantity } : i)),
      }));

      return true;
    },
    [cart, updatePersistedState]
  );

  const removeFromCart = useCallback(
    (cartItemId: string, options?: { silentToast?: boolean }) => {
      const existing = cart.find((i) => i.id === cartItemId);
      if (existing && !options?.silentToast) {
        toast.info(`Removed ${existing.title} (${existing.size}) from bag`);
      }
      updatePersistedState((prev) => ({
        ...prev,
        cart: prev.cart.filter((i) => i.id !== cartItemId),
      }));
    },
    [cart, updatePersistedState]
  );

  const clearCart = useCallback(() => {
    updatePersistedState((prev) => ({
      ...prev,
      cart: [],
    }));
    toast.info("Your shopping bag was cleared");
  }, [updatePersistedState]);

  const applyCoupon = useCallback(
    (code: string): { success: boolean; message: string } => {
      const trimmed = code.trim().toUpperCase();
      const rule = validateCoupon(trimmed);

      if (!rule) {
        toast.error("Invalid coupon code", {
          description: "Use BOLD15 for flat 15% off across all contemporary edits.",
        });
        return { success: false, message: "Invalid code" };
      }

      if (appliedCoupon === rule.code) {
        toast.info(`Coupon ${rule.code} is already applied`);
        return { success: true, message: "Already applied" };
      }

      updatePersistedState((prev) => ({
        ...prev,
        appliedCoupon: rule.code,
      }));

      toast.success(`Coupon ${rule.code} applied!`, {
        description: rule.description,
      });
      return { success: true, message: `Applied ${rule.code}` };
    },
    [appliedCoupon, updatePersistedState]
  );

  const removeCoupon = useCallback(() => {
    updatePersistedState((prev) => ({
      ...prev,
      appliedCoupon: null,
    }));
    toast.info("Coupon code removed");
  }, [updatePersistedState]);

  // Wishlist Actions
  const isInWishlist = useCallback(
    (productId: string): boolean => {
      return wishlist.includes(productId);
    },
    [wishlist]
  );

  const addToWishlist = useCallback(
    (productId: string) => {
      const product = getProductById(productId);
      updatePersistedState((prev) => {
        if (prev.wishlist.includes(productId)) return prev;
        toast.success(`Saved to wishlist: ${product?.title || "Garment"}`);
        return { ...prev, wishlist: [...prev.wishlist, productId] };
      });
    },
    [updatePersistedState]
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      const product = getProductById(productId);
      updatePersistedState((prev) => {
        if (!prev.wishlist.includes(productId)) return prev;
        toast.info(`Removed from wishlist: ${product?.title || "Garment"}`);
        return { ...prev, wishlist: prev.wishlist.filter((id) => id !== productId) };
      });
    },
    [updatePersistedState]
  );

  const toggleWishlist = useCallback(
    (productId: string): boolean => {
      const product = getProductById(productId);
      let nowWishlisted = false;

      updatePersistedState((prev) => {
        if (prev.wishlist.includes(productId)) {
          toast.info(`Removed from wishlist: ${product?.title || "Garment"}`);
          nowWishlisted = false;
          return { ...prev, wishlist: prev.wishlist.filter((id) => id !== productId) };
        } else {
          toast.success(`Saved to wishlist: ${product?.title || "Garment"}`);
          nowWishlisted = true;
          return { ...prev, wishlist: [...prev.wishlist, productId] };
        }
      });

      return nowWishlisted;
    },
    [updatePersistedState]
  );

  const clearWishlist = useCallback(() => {
    updatePersistedState((prev) => ({
      ...prev,
      wishlist: [],
    }));
    toast.info("Cleared all items from your wishlist");
  }, [updatePersistedState]);

  const moveToCart = useCallback(
    (productId: string, size?: string, colorName?: string): boolean => {
      const product = getProductById(productId);
      if (!product) return false;

      const targetSize = size || product.variants?.[0]?.size;
      const targetColor = colorName || product.variants?.[0]?.colorName || "Default";

      if (!targetSize) {
        setQuickViewProduct(product);
        return false;
      }

      const variant = findMatchingVariant(product, targetSize, targetColor);
      const maxStock = variant ? variant.stock : 10;

      const added = addToCart({
        productId: product.id,
        variantId: variant?.id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice,
        size: targetSize,
        colorName: targetColor,
        colorHex: variant?.colorHex,
        imageSrc: product.images?.[0]?.src || "",
        quantity: 1,
        maxStock,
      });

      if (added) {
        removeFromWishlist(productId);
      }

      return added;
    },
    [addToCart, removeFromWishlist]
  );

  // Mini-Cart Drawer & QuickView Modal Controllers
  const openCartDrawer = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setIsCartDrawerOpen(false), []);
  const toggleCartDrawer = useCallback(() => setIsCartDrawerOpen((p) => !p), []);

  const openQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      subtotal,
      appliedCoupon,
      discountAmount,
      shippingEstimate,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      amountToFreeShipping,
      total,
      isHydrated,

      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      applyCoupon,
      removeCoupon,

      isCartDrawerOpen,
      openCartDrawer,
      closeCartDrawer,
      toggleCartDrawer,

      wishlist,
      wishlistCount: wishlist.length,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearWishlist,
      moveToCart,

      quickViewProduct,
      openQuickView,
      closeQuickView,
    }),
    [
      cart,
      cartCount,
      subtotal,
      appliedCoupon,
      discountAmount,
      shippingEstimate,
      amountToFreeShipping,
      total,
      isHydrated,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      applyCoupon,
      removeCoupon,
      isCartDrawerOpen,
      openCartDrawer,
      closeCartDrawer,
      toggleCartDrawer,
      wishlist,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearWishlist,
      moveToCart,
      quickViewProduct,
      openQuickView,
      closeQuickView,
    ]
  );

  return <ShoppingContext.Provider value={value}>{children}</ShoppingContext.Provider>;
}

export function useShopping(): ShoppingContextValue {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error("useShopping must be used within a <ShoppingProvider>");
  }
  return context;
}
