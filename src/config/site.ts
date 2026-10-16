import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "VASTRAMAY",
  tagline: "Bold Neo-Brutalist Fashion Collective",
  description:
    "Curated contemporary menswear and womenswear with unapologetic silhouettes, sharp neo-brutalist construction, and modern Indian heritage roots.",
  url: "https://vastramay.local",
  ogImage: "/og-image.png",
  announcements: [
    "⚡ FREE EXPRESS SHIPPING ON ALL ORDERS OVER ₹1,999",
    "🔥 NEW DROP: NEO-HERITAGE KURTA & JACKET EDIT IS LIVE",
    "📦 7-DAY HASSLE-FREE RETURNS & INSTANT EXCHANGES",
    "✨ GET FLAT 15% OFF YOUR FIRST ORDER WITH CODE: BOLD15",
  ],
  mainNav: [
    { label: "Men", href: "/shop/men" },
    { label: "Women", href: "/shop/women" },
    { label: "New Drops", href: "/shop/new-arrivals", badge: "NEW" },
    { label: "Collections", href: "/collections" },
    { label: "About", href: "/about" },
  ],
  footerNav: {
    shop: [
      { label: "Men's Collection", href: "/shop/men" },
      { label: "Women's Collection", href: "/shop/women" },
      { label: "Kurtas & Sets", href: "/shop/men/kurtas" },
      { label: "Nehru Jackets", href: "/shop/men/nehru-jackets" },
      { label: "Dresses & Sarees", href: "/shop/women/dresses" },
      { label: "New Drops", href: "/shop/new-arrivals" },
    ],
    about: [
      { label: "Our Story", href: "/about" },
      { label: "Design Philosophy", href: "/about#philosophy" },
      { label: "Craft & Sustainability", href: "/craft" },
      { label: "Press & Features", href: "/press" },
    ],
    customerService: [
      { label: "Track Your Order", href: "/track-order" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "Contact Us", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
  socialLinks: {
    instagram: "https://instagram.com/vastramay",
    twitter: "https://twitter.com/vastramay",
    facebook: "https://facebook.com/vastramay",
    pinterest: "https://pinterest.com/vastramay",
  },
};
