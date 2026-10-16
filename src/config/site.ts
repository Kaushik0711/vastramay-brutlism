import type { SiteConfig } from "@/types";

/**
 * Verification of production site origin.
 * In production environments, NEXT_PUBLIC_SITE_URL must be explicitly configured
 * to the verified live domain.
 */
export const isProductionOriginConfigured = Boolean(
  process.env.NEXT_PUBLIC_SITE_URL &&
    !process.env.NEXT_PUBLIC_SITE_URL.includes(".local") &&
    !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost")
);

// Fallback development domain placeholder — not for production use
export const FALLBACK_SITE_URL = "https://vastramay.local";

// Emits a server-side build/runtime warning when a placeholder URL is detected in production mode
if (
  typeof window === "undefined" &&
  process.env.NODE_ENV === "production" &&
  !isProductionOriginConfigured
) {
  console.warn(
    "[Vastramay Configuration Warning]: NEXT_PUBLIC_SITE_URL is not configured with a live production domain. " +
      `Falling back to development placeholder '${FALLBACK_SITE_URL}'. Configure NEXT_PUBLIC_SITE_URL prior to public launch.`
  );
}

export const siteConfig: SiteConfig = {
  name: "VASTRAMAY",
  tagline: "Neo-Brutalist Fashion Collective",
  description:
    "Curated contemporary menswear and womenswear with unapologetic silhouettes, sharp neo-brutalist construction, and modern Indian heritage roots.",
  url: process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL,
  ogImage: "/og-image.png",
  announcements: [
    "⚡ FREE EXPRESS SHIPPING ON ALL ORDERS OVER ₹1,999",
    "🔥 NEW DROP: NEO-HERITAGE EDIT IS LIVE NOW",
    "📦 7-DAY DOORSTEP EXCHANGES ACROSS PAN-INDIA",
    "✨ USE CODE BOLD15 FOR FLAT 15% OFF YOUR FIRST ORDER",
  ],
  mainNav: [
    { label: "Shop All", href: "/shop" },
    { label: "Men", href: "/men" },
    { label: "Women", href: "/women" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ],
  footerNav: {
    shop: [
      { label: "Shop All Products", href: "/shop" },
      { label: "Men's Collection", href: "/men" },
      { label: "Women's Collection", href: "/women" },
      { label: "Kurtas & Bundis", href: "/category/kurtas" },
      { label: "Nehru Jackets", href: "/category/nehru-jackets" },
      { label: "Contemporary Dresses", href: "/category/dresses" },
    ],
    about: [
      { label: "About Vastramay", href: "/about" },
      { label: "Artisan Craft", href: "/about" },
      { label: "Customer Care", href: "/contact" },
      { label: "Help & FAQ", href: "/faq" },
    ],
    customerService: [
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Track Your Order", href: "/shipping-returns" },
      { label: "Your Wishlist", href: "/wishlist" },
      { label: "Shopping Bag", href: "/cart" },
      { label: "Contact Us", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  socialLinks: {},
};
