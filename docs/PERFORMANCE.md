# Frontend Performance & Core Web Vitals Audit

## 1. Executive Summary
The Vastramay frontend is engineered with Next.js 16 App Router using Turbopack, React 19 Server Components by default, optimized Web fonts with `font-display: swap`, responsive `next/image` pipelines, and compositor-only Motion animations.

### Actual Build Performance Metrics (Measured in Local Environment):
- **Turbopack Production Build**: `2.0s`
- **TypeScript Static Verification**: `2.6s`
- **Static Page Generation**: `46 static / partial-prerendered routes in 699ms`
- **Static Page HTML Output**: Clean prerendered HTML with zero blocking waterfall scripts.

---

## 2. Rendering Architecture (Server vs Client Components)

### Server Component Default (RSC)
To maintain minimal client bundle footprint, root layouts and all primary content presentation pages are React Server Components:
- `src/app/page.tsx` (Homepage presentation)
- `src/app/shop/page.tsx`
- `src/app/men/page.tsx`
- `src/app/women/page.tsx`
- `src/app/category/[slug]/page.tsx`
- `src/app/product/[slug]/page.tsx`
- `src/app/about/page.tsx`
- `src/app/shipping-returns/page.tsx`
- `src/app/privacy-policy/page.tsx`
- `src/app/terms/page.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`

### Client Components (Deliberate Boundary Isolation)
Client Components (`"use client"`) are restricted solely to views requiring user interactivity, state management, or browser APIs:
- `src/context/ShoppingContext.tsx` & `CustomizationContext.tsx`: Persistent client state.
- `src/components/cart/CartDrawer.tsx` & `src/app/cart/page.tsx`: Interactive cart staging.
- `src/app/checkout/page.tsx`: Multi-step checkout form with Zod client validation.
- `src/components/shop/ProductCatalog.tsx`: Instant client-side faceted filtering & sorting.
- `src/components/layout/Header.tsx`: Mobile slide-out drawer, quick cart/wishlist badges.
- `src/app/dev/components/page.tsx`: Isolated UI theme workbench.

---

## 3. Image Optimization Strategy

### 1. `next/image` Implementation
- All product cards, galleries, banners, and thumbnails use `next/image` with explicit `width`, `height`, or `fill` with parent relative positioning.
- Layout shifts (CLS) are prevented by enforcing aspect ratio containers (`aspect-[4/5]`, `aspect-[3/4]`, or explicit CSS grid dimensions).

### 2. Above-the-Fold Priority
- Primary hero banners and product detail primary images use `priority={true}` to maximize Largest Contentful Paint (LCP) performance.
- Product cards in grids below the fold use native lazy loading with responsive `sizes`:
  ```tsx
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  ```

### 3. Remote Image Domain Whitelisting
- Configured safely in `next.config.ts`:
  ```ts
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" }
    ]
  }
  ```

---

## 4. Typography & Font Performance
Fonts are loaded using `next/font/google`:
- **Syne**: Headings and display badges (`font-display: swap`, subset: `latin`).
- **Plus Jakarta Sans**: Body copy and utilitarian metadata (`font-display: swap`, subset: `latin`).
- **Playfair Display**: Editorial accent typography (`font-display: swap`, subset: `latin`).
- **Optimization**: Fonts are pre-downloaded at build time and self-hosted locally by Next.js, eliminating external Google Font network round-trips and layout shifts.

---

## 5. Animation & Motion Performance
To preserve smooth 60fps / 120fps frame rates on low-power mobile devices:
- **Compositor-Only Properties**: All motion variants animate only `transform` (`scale`, `translateX`, `translateY`) and `opacity`.
- **Zero Paint Recalculations**: Layout properties (`width`, `height`, `margin`, `top`, `left`) are strictly avoided inside animation loops.
- **Springs**: Tuned damping (`stiffness: 400, damping: 30`) avoids jitter or perpetual oscillation.
- **Hardware Acceleration**: GPU layer promotion via `transform: translateZ(0)` where appropriate.
- **Reduced Motion**: Automatically honored via `prefers-reduced-motion` media queries and the `CustomizationContext` switch, replacing animations with immediate transitions.

---

## 6. Core Web Vitals Guidance for Production Launch
| Metric | Target | Vastramay Architectural Safeguards |
| :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | < 2.5s | Server-rendered HTML, `priority` on hero banner images, zero client JS render blocking. |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Explicit aspect ratio wrappers on all images, skeleton loaders for async catalog lists, zero ad-hoc dynamic insertions. |
| **INP** (Interaction to Next Paint) | < 200ms | Lightweight state context updates, local memoized filtering, zero heavy third-party tracking scripts. |
