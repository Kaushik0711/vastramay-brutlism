/**
 * Vastramay TypeScript Type Definitions
 */

export type CurrencyCode = "INR" | "USD" | "EUR";

export type ClothingGender = "men" | "women" | "unisex";

export type ClothingCategory =
  | "kurtas"
  | "sherwanis"
  | "nehru-jackets"
  | "shirts"
  | "t-shirts"
  | "trousers"
  | "jeans"
  | "hoodies"
  | "dresses"
  | "tops"
  | "skirts"
  | "co-ord-sets"
  | "sarees"
  | "accessories";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "FREE" | string;

export interface ProductVariant {
  id: string;
  sku: string;
  colorName: string;
  colorHex: string;
  size: ProductSize;
  stock: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: CurrencyCode;
  gender: ClothingGender;
  category: ClothingCategory;
  collection?: string;
  tags: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  discountPercentage?: number;
  images: {
    src: string;
    alt: string;
    isPrimary?: boolean;
  }[];
  variants: ProductVariant[];
  fabric?: string;
  careInstructions?: string[];
  rating?: number;
  reviewsCount?: number;
}

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  gender: ClothingGender;
  description: string;
  itemCount: number;
  badge?: string;
  imageSrc?: string;
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  announcements: string[];
  mainNav: NavItem[];
  footerNav: {
    shop: NavItem[];
    about: NavItem[];
    customerService: NavItem[];
    legal: NavItem[];
  };
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    pinterest?: string;
  };
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  size: string;
  colorName: string;
  colorHex?: string;
  imageSrc: string;
  quantity: number;
  maxStock: number;
}

export interface CouponRule {
  code: string;
  discountPercent: number;
  description: string;
}

export interface DemoOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    pincode: string;
  };
  deliveryMethod: "express" | "priority";
  paymentMethod: "upi" | "card" | "netbanking" | "cod";
}
