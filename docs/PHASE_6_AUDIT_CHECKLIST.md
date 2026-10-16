# Phase 6 Audit & Stabilization Checklist

## 1. Initial Audit & Preservation
- [x] Inspect package versions: Next.js 16.4.2, React 19.3.0, Tailwind CSS v4, Motion 14.3.0.
- [x] Inspect repository docs and codebase structure.
- [x] Verify that no backend or deployment code is introduced.
- [x] Maintain local git repository integrity (no remote push).

## 2. Technical SEO & Metadata Architecture
- [x] Centralize canonical base URL in `src/config/site.ts` with fallback to `process.env.NEXT_PUBLIC_SITE_URL || "https://vastramay.local"`.
- [x] Set `metadataBase` in root `src/app/layout.tsx`.
- [x] Generate dynamic `src/app/robots.ts` with crawl rules for public vs private routes (`/dev/`, `/cart`, `/checkout`, `/search`).
- [x] Generate dynamic `src/app/sitemap.ts` covering all static routes, 12 dynamic category paths, and 12 dynamic product paths.
- [x] Implement server layout metadata for client pages:
  - `src/app/cart/layout.tsx` (title, description, noindex)
  - `src/app/checkout/layout.tsx` (title, description, noindex)
  - `src/app/wishlist/layout.tsx` (title, description, noindex)
  - `src/app/search/layout.tsx` (title, description, noindex/follow)
- [x] Audit metadata and canonical tags across:
  - `/` (Home)
  - `/shop` (Catalog)
  - `/men` (Men's Collection)
  - `/women` (Women's Collection)
  - `/about` (About Studio)
  - `/contact` (Contact & Care)
  - `/faq` (FAQ Knowledge Base)
  - `/shipping-returns` (Shipping & Returns)
  - `/privacy-policy` (Privacy Policy Draft)
  - `/terms` (Terms of Service Draft)
  - `/category/[slug]` (Category Archive)
  - `/product/[slug]` (Product Details)

## 3. Structured Data (JSON-LD)
- [x] Add `Organization` and `WebSite` JSON-LD schema to root layout or homepage.
- [x] Add `BreadcrumbList` JSON-LD schema to catalog, category, and product pages.
- [x] Add `Product` and `Offer` JSON-LD schema to `src/app/product/[slug]/page.tsx` with INR currency, genuine mock price/availability, and XSS-safe serialization.

## 4. Accessibility (WCAG 2.2 AA)
- [x] Add a visible "Skip to content" keyboard navigation bypass link in `src/app/layout.tsx`.
- [x] Audit aria-invalid and aria-describedby across checkout and contact forms.
- [x] Verify focus restoration and keyboard trapping in modals, drawers, and quick-view dialogs.
- [x] Verify color contrast and reduced-motion compliance.

## 5. Performance & Asset Optimization
- [x] Audit `next/image` attributes across product cards, detail views, and category navigation (sizes, priority on LCP hero, lazy on catalog).
- [x] Verify remote patterns in `next.config.ts`.
- [x] Audit font display swapping and weight loading.

## 6. Pure Calculation & Lookup Unit Testing
- [x] Add focused automated tests for pure utilities in `src/lib/shopping.ts` (subtotal, coupon calculations, free shipping threshold, cart line IDs).
- [x] Verify with package script `npm test`.

## 7. Documentation
- [x] Create `docs/SEO.md`
- [x] Create `docs/PERFORMANCE.md`
- [x] Create `docs/TESTING.md`
- [x] Create `docs/PROJECT_STATUS.md`
- [x] Update `docs/README.md`, `docs/PROJECT_STRUCTURE.md`, `docs/TECH_STACK.md`, `docs/DESIGN_SYSTEM.md`, `docs/COMPONENT_LIBRARY.md`, `docs/ANIMATION_SYSTEM.md`, `docs/ACCESSIBILITY.md`, `docs/ROUTES_AND_PAGES.md`, `docs/PRODUCT_DATA_MODEL.md`, `docs/SHOPPING_UI.md`, `docs/SHOPPING_STATE.md`, `docs/CART_AND_WISHLIST.md`, `docs/CHECKOUT_DEMO.md`, `docs/IMPLEMENTATION_LOG.md`, `docs/DEVELOPMENT_SETUP.md`.
