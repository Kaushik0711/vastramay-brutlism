# Vastramay — Master AI Context & Engineering Knowledge Base

> **Primary Entry Point for AI Assistants**: Any AI coding assistant working on Vastramay **MUST read this document completely** before making any code modifications or architectural proposals.

---

## 1. Project Identity

| Attribute | Details |
| :--- | :--- |
| **Project Name** | **Vastramay** (Neo-Brutalist Men's & Women's Fashion Collective) |
| **Business Domain** | Contemporary fashion e-commerce fusing heritage Indian textile craft (slub cottons, hand-woven linens, Chanderi silks, artisan kurtas & bundis) with architectural silhouettes and industrial neo-brutalism. |
| **Current Status** | **Frontend Complete & Stabilized**. All 6 development phases completed. Top announcement marquee bug resolved. Branded neo-brutalist page reload loader implemented. 28 automated tests passing. Zero TypeScript/ESLint errors. Production build passing cleanly. |
| **Design Philosophy** | **Neo-Brutalism**: Raw geometric structure, high-contrast ink borders (`2px`, `3px`, `4px solid #171717`), 0-blur hard shadows (`2px`, `4px`, `6px`, `8px`, `12px`), warm cream canvas (`#F7F1E5`), saturated neon accents (`#FF5C8A`, `#FFE14A`, `#4867F5`), 3-tier typography (Syne, Plus Jakarta Sans, Playfair Display), and mechanical tactile micro-interactions (`active: translate(2px, 2px)`). |
| **Core Tech Stack** | **Next.js 16.4.2** (App Router, Turbopack, PPR), **React 19.3.0**, **TypeScript 5**, **Tailwind CSS v4**, **Sass / SCSS Modules (1.105.2)**, **Motion 14.3.0**, **Lucide React 1.57.0**, **React Hook Form 7.90.0**, **Zod 4.6.7**. |
| **Current Scope** | Complete customer-facing storefront: Homepage, `/shop`, `/men`, `/women`, `/category/[slug]`, `/product/[slug]`, `/search`, `/wishlist`, `/cart`, `/checkout`, `/about`, `/contact`, `/faq`, `/shipping-returns`, `/privacy-policy`, `/terms`, `/dev/components` (internal showcase), and dynamic `/robots.txt` + `/sitemap.xml`. |
| **Explicitly Postponed** | **Admin Dashboard**, **Supabase Database Integration**, **Real Payment Gateways**, **Vercel Remote Deployment**. (Do NOT implement without explicit user authorization). |

---

## 2. Architecture Overview

### 2.1 Next.js App Router & Boundary Conventions
- **Root Layout (`src/app/layout.tsx`)**: Server Component. Configures Google fonts (`Syne`, `Plus Jakarta Sans`, `Playfair Display`), metadataBase, JSON-LD schemas (`Organization`, `WebSite`), accessibility keyboard skip link (`#main-content`), `AnnouncementBar`, `Header`, `PageLoader`, `AppProviders`, and `Footer`.
- **Page Transitions (`src/app/template.tsx`)**: Re-renders solely on client route changes, wrapping route children in `<PageTransition>` (`src/components/layout/PageTransition.tsx`). This ensures persistent components (`Header`, `ShoppingProvider`, `ToastProvider`) are never unmounted during navigation.
- **Server Components (RSC) by Default**: All content pages (`/`, `/shop`, `/men`, `/women`, `/category/[slug]`, `/product/[slug]`, `/about`, `/shipping-returns`, `/privacy-policy`, `/terms`, `robots.ts`, `sitemap.ts`) are React Server Components to maintain zero JavaScript overhead for static markup.
- **Client Components (`"use client"`) Isolation**: Client boundaries are strictly confined to interactive leaves:
  - Form inputs, dialogs, drawers, and tabs (`src/components/ui/`).
  - Catalog filtering, sorting, and search state (`ProductCatalog.tsx`, `SearchView.tsx`).
  - Persistent shopping state providers and cart overlays (`ShoppingContext.tsx`, `CartDrawer.tsx`).
  - Multi-step checkout form (`src/app/checkout/page.tsx`).
  - Initial document reload loader (`PageLoader.tsx`).
  - Theme customizer studio (`src/app/dev/components/page.tsx`).

### 2.2 Dual-Engine Styling Architecture
- **Tailwind CSS v4 (`src/app/globals.css`)**:
  - Handles structural layout, responsive grids (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`), spacing, flexbox utilities, and utility typography.
  - Configured with `@theme` block referencing design tokens.
  - Scoped specifically in `next.config.ts` via `turbopack.rules["**/globals.css"]` with `@tailwindcss/turbopack` loader so intermediate Sass CSS compilation is not intercepted.
- **SCSS Modules (`*.module.scss`)**:
  - Encapsulates neo-brutalist interactive physics: active mechanical press translations (`translate(2px, 2px)`), zero-blur shadow drops, continuous keyframe marquees (`AnnouncementBar.module.scss`), and custom scrollbars (`_tokens.scss`, `_mixins.scss`).
  - Guarantees zero class-name collisions through Turbopack hashed CSS module exports.

### 2.3 State Management & Multi-Tab Synchronization
- **Centralized Shopping State (`src/context/ShoppingContext.tsx`)**:
  - Governs `cart`, `wishlist`, `appliedCoupon`, `isCartDrawerOpen`, and `quickViewProduct`.
  - **React 19 Safe**: Uses `useSyncExternalStore` subscribing to `window.addEventListener("storage")` and an internal dispatch event `vastramay_shopping_update`.
  - **Zero SSR Mismatch**: Server snapshot returns `null`, ensuring deterministic hydration without hydration warnings.
  - **Unified Storage Payload**: Persisted under key `vastramay_shopping_state_v1` with format `{ version: 1, cart: CartItem[], wishlist: string[] }`.
  - **Catalog Reconciliation**: Upon hydration, stored line items are sanitized against active products in `src/data/products.ts` via `sanitizePersistedCart()` and `sanitizePersistedWishlist()`. Stale IDs or corrupted records are pruned automatically.

### 2.4 Product & Category Data Flow
- **Data Source (`src/data/`)**: Static, strongly-typed fixtures (`src/data/products.ts` with 12 handcrafted garments; `src/data/categories.ts` with 12 fashion categories).
- **Selectors & Utilities (`src/lib/products.ts`)**: Pure functions (`getAllProducts`, `getProductBySlug`, `getProductById`, `getProductsByGender`, `getProductsByCategory`, `searchProducts`, `filterAndSortProducts`).
- **Currency & Formatting (`src/lib/utils.ts`)**: All prices are integer INR (₹) formatted via `formatCurrency(val, "INR", "en-IN")`.

### 2.5 Shopping & Checkout Logic
- **Variant-Specific Line ID**: `createCartLineId(productId, size, color)` produces `{productId}::{cleanSize}::{cleanColor}`. Adding different sizes/colors creates distinct cart items.
- **Stock Clamping**: Quantity updates are clamped between `1` and available variant stock (`item.maxStock`).
- **Free Shipping Threshold**: Standard shipping is ₹199 (`STANDARD_SHIPPING_FEE`). Subtotals $\ge$ ₹1,999 (`FREE_SHIPPING_THRESHOLD`) unlock complimentary shipping (`₹0`).
- **Promotional Coupons**: `BOLD15` grants flat 15% off across all items, verified case-insensitively via `validateCoupon()` and `calculateDiscount()`.
- **Checkout Demo (`src/app/checkout/page.tsx`)**: 3-step form (Contact/Address -> Shipping Method -> Payment Method) validated with `zod` and `react-hook-form`. Generates a simulated receipt (`VASTRA-DEMO-XXXX`), snapshots order data, clears the bag, and never stores private customer card numbers.

### 2.6 Technical SEO & Metadata Architecture
- **Origin**: Centralized in `src/config/site.ts` (`siteConfig.url`), defaulting to `process.env.NEXT_PUBLIC_SITE_URL || "https://vastramay.local"`.
- **Production Guard**: Emits server warning if deployed in production with placeholder origin.
- **Robots Directives (`src/app/robots.ts`)**: Disallows `/dev/` and `/api/`. Explicitly allows crawlers to fetch `/cart`, `/checkout`, `/wishlist`, and `/search` so they can discover and honor `<meta name="robots" content="noindex" />`.
- **Dynamic XML Sitemap (`src/app/sitemap.ts`)**: Generates 46 canonical URLs dynamically across 10 static pages, 12 categories, and 12 products. Omits fabricated `<lastmod>` timestamps per Google Search Central guidelines.
- **Structured Data (JSON-LD)**: Organization, WebSite, BreadcrumbList, Product & Offer with INR currency, genuine availability, and XSS-safe serialization (`replace(/</g, "\\u003c")`).

### 2.7 Automated Testing Architecture
- **Runner**: Node.js v24 native test runner (`node:test`, `node:assert/strict`) via `test/register-loader.mjs` and `--experimental-strip-types`.
- **Zero Heavy Test Dependencies**: Runs in <150ms without Jest, Vitest, or Babel.
- **Suites**:
  - `test/shopping.test.ts`: 25 tests covering cart subtotal, line IDs, coupon rules, free shipping thresholds, catalog lookups, search filtering, and state sanitization.
  - `test/announcements.test.ts`: 3 tests verifying announcement copy, promotional messaging, and static reduced-motion single-line fallback.

---

## 3. Important Source Files & Responsibilities

| Path | Primary Exports / Components | Core Responsibility & Relationships |
| :--- | :--- | :--- |
| `src/app/layout.tsx` | `RootLayout` | Root layout shell. Mounts fonts, skip link, announcement bar, header, page loader, providers, footer, and root JSON-LD. |
| `src/app/template.tsx` | `Template` | App Router template wrapping page routes in `<PageTransition>` for subtle navigation entrance without remounting layout providers. |
| `src/components/layout/AnnouncementBar.tsx` | `AnnouncementBar` | Single-line top marquee ticker. Renders 2 synchronized sequences (accessible + aria-hidden), pauses on hover/focus, with reduced-motion fallback. |
| `src/components/layout/PageLoader.tsx` | `PageLoader` | Full-screen neo-brutalist page reload loader. Active on initial load/reload; dismisses in 700ms (200ms on reduced-motion) with 2000ms failsafe. |
| `src/components/layout/Header.tsx` | `Header` | Sticky header with wordmark, studio badge, desktop navigation, search trigger, wishlist count badge, and cart drawer trigger. |
| `src/components/cart/CartDrawer.tsx` | `CartDrawer` | Slide-over mini-cart drawer with variant details, stock-clamped steppers, free shipping progress bar, and checkout CTA. |
| `src/components/product/ProductCard.tsx` | `ProductCard` | Reusable product card with image fallback, wishlist toggle, price tag, quick-view trigger, and hover zoom. |
| `src/components/product/ProductDetailView.tsx` | `ProductDetailView` | Product detail interface with thumbnail gallery, color/size chips, size guide modal, accordions, and add-to-bag action. |
| `src/components/shop/ProductCatalog.tsx` | `ProductCatalog` | Faceted catalog with category tabs, desktop sidebar filters, mobile filter drawer, sorting, and pagination. |
| `src/context/ShoppingContext.tsx` | `ShoppingProvider`, `useShopping` | Centralized shopping state manager using `useSyncExternalStore` for multi-tab sync, cart calculations, and wishlist management. |
| `src/context/CustomizationContext.tsx` | `CustomizationProvider`, `useCustomization` | Runtime theme customizer managing CSS variables, border thickness, shadow offset, motion speeds, and reduced-motion detection. |
| `src/lib/shopping.ts` | Calculations & Sanitizers | Pure functions: `calculateCartSubtotal`, `createCartLineId`, `calculateShipping`, `calculateDiscount`, `validateCoupon`, sanitizers. |
| `src/lib/products.ts` | Catalog Selectors | Pure query functions: `getProductBySlug`, `getProductsByGender`, `searchProducts`, `filterAndSortProducts`. |
| `src/lib/motion.ts` | Motion Variants & Presets | Centralized Motion v14 variants (`SPRING_NEO`, `SPRING_BOUNCY`, `modalVariants`, `drawerRightVariants`, `pageTransitionVariants`). |
| `src/config/site.ts` | `siteConfig`, `isProductionOriginConfigured` | Centralized site metadata, origin validation, navigation links, and announcement items. |
| `src/config/ui.ts` | Design Token Defaults | Default theme configuration, colors, geometry, motion speeds, and toast defaults. |
| `src/data/products.ts` | `PRODUCTS` | Catalog mock dataset (12 garments with variants, colors, sizes, fabrics, prices, tags). |
| `src/data/categories.ts` | `CATEGORIES` | Category taxonomy dataset (12 categories with badges, descriptions, item counts). |
| `next.config.ts` | `nextConfig` | Next.js configuration (PPR, Cache Components, Unsplash remote patterns, scoped `@tailwindcss/turbopack` rule). |

---

## 4. Documentation Navigation Index

Read these specialized documents depending on the task at hand:

| When You Need To... | Read This Document |
| :--- | :--- |
| Understand project status, production readiness, and the future roadmap | [`docs/PROJECT_STATUS.md`](./PROJECT_STATUS.md) |
| Find the exact route, component, state source, and test for any feature | [`docs/FEATURE_MAP.md`](./FEATURE_MAP.md) |
| Understand or add pages, routes, dynamic params, and layout boundaries | [`docs/ROUTES_AND_PAGES.md`](./ROUTES_AND_PAGES.md) |
| Use, modify, or extend the 35+ UI and layout components | [`docs/COMPONENT_LIBRARY.md`](./COMPONENT_LIBRARY.md) |
| Understand colors, typography, hard shadows, SCSS mixins, and theme customizer | [`docs/DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) |
| Modify product schemas, category taxonomies, selectors, or mock catalog data | [`docs/PRODUCT_DATA_MODEL.md`](./PRODUCT_DATA_MODEL.md) |
| Work with cart, wishlist, `useSyncExternalStore`, multi-tab sync, or coupon engine | [`docs/SHOPPING_STATE.md`](./SHOPPING_STATE.md) |
| Inspect mini-cart drawer, `/cart` page, `/wishlist` page, or free shipping rules | [`docs/CART_AND_WISHLIST.md`](./CART_AND_WISHLIST.md) |
| Inspect or modify the 3-step checkout demo and Zod validation schema | [`docs/CHECKOUT_DEMO.md`](./CHECKOUT_DEMO.md) |
| Inspect faceted catalog filtering, mobile filter drawer, or detail views | [`docs/SHOPPING_UI.md`](./SHOPPING_UI.md) |
| Work with Motion presets, page transitions, marquee physics, or loader animation | [`docs/ANIMATION_SYSTEM.md`](./ANIMATION_SYSTEM.md) |
| Verify WCAG 2.2 AA accessibility, ARIA live regions, focus trapping, or skip links | [`docs/ACCESSIBILITY.md`](./ACCESSIBILITY.md) |
| Inspect metadataBase, robots.txt, dynamic sitemap, or JSON-LD schemas | [`docs/SEO.md`](./SEO.md) |
| Review Core Web Vitals, RSC boundaries, font loading, or image optimization | [`docs/PERFORMANCE.md`](./PERFORMANCE.md) |
| Run or write automated unit tests, type checks, linter, or production builds | [`docs/TESTING.md`](./TESTING.md) |
| Review local development prerequisites, scripts, and port configuration | [`docs/DEVELOPMENT_SETUP.md`](./DEVELOPMENT_SETUP.md) |
| Review file tree architecture and folder boundaries | [`docs/PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) |
| Inspect exact npm package versions and architectural choices | [`docs/TECH_STACK.md`](./TECH_STACK.md) |
| Review historical phase milestone logs, bug fixes, and verification entries | [`docs/IMPLEMENTATION_LOG.md`](./IMPLEMENTATION_LOG.md) |

---

## 5. Explicitly Postponed Work & Boundaries

The following systems are **INTENTIONALLY POSTPONED**. Do **NOT** implement or connect them without explicit user direction:

### 1. Admin Dashboard
- **Status**: `PLANNED, NOT IMPLEMENTED`.
- **Known Intent**: An internal admin portal to manage catalog items, categories, banner promos, inventory, and orders.
- **Unconfirmed Requirements**: Admin authentication (email/password, OAuth, MFA), role-based access control (Superadmin vs Content Editor), inventory multi-warehouse allocation, analytics reporting, and bulk product upload.
- **AI Rule**: Do not create admin routes (`/admin/*`) or decide schema models independently.

### 2. Supabase Database Connection
- **Status**: `PLANNED, NOT CONNECTED`.
- **Known Intent**: Future relational PostgreSQL database replacement for client-side mock fixtures.
- **Unconfirmed Decisions**: Supabase project URL, service role vs anon keys, Row Level Security (RLS) policies, database table migrations (`products`, `variants`, `orders`, `profiles`), customer auth integration, and database access patterns (direct client vs server actions).
- **AI Rule**: Never write real API keys or credentials into the codebase or markdown files. Do not create Supabase client instances until instructed.

### 3. Vercel Remote Deployment & Live Domain
- **Status**: `PLANNED, NOT DEPLOYED`.
- **Known Intent**: Production hosting on Vercel with custom domain.
- **Prerequisites**: Verified live production domain for `NEXT_PUBLIC_SITE_URL`, production DNS configuration, environment secrets provisioning, and final client sign-off.
- **AI Rule**: Maintain all operations on the local development machine. Do NOT run `git push` or deploy to remote hosts.

---

## 6. Mandatory AI Working Rules

Every AI assistant working in this repository must follow these rules without exception:

1. **Read `docs/AI_CONTEXT.md` first**: Refresh project identity, boundaries, and architecture before taking action.
2. **Read `docs/README.md` and `docs/PROJECT_STATUS.md`**: Understand the current state of features and verify active constraints.
3. **Read the specific documentation relevant to the requested change**: E.g., read `docs/SHOPPING_STATE.md` before altering cart logic; read `docs/ANIMATION_SYSTEM.md` before changing motion physics.
4. **Inspect the actual source code before editing**: Never assume code structure or API signatures from documentation alone. The source code is the ultimate ground truth.
5. **Treat source code and executed behavior as the implementation source of truth**: When documentation conflicts with actual working code, investigate the code first, resolve the conflict, and update the documentation.
6. **Resolve documentation inconsistencies before making risky architectural changes**: Verify that imports, types, and dependencies match active package definitions.
7. **Preserve working features and previous implementation decisions**: Do not alter, break, or delete existing shopping journeys, test coverage, SEO configurations, or design tokens.
8. **Avoid recreating existing components or duplicate state systems**: Before creating a button, modal, badge, drawer, or selector, check `src/components/ui/` and `src/lib/`.
9. **Update affected documentation after every meaningful code change**: Keep docs synchronized with the codebase.
10. **Run relevant tests and report actual validation results**: Execute `npm test`, `npx tsc --noEmit`, `npm run lint`, and `npm run build`. Never claim tests passed without executing them.
11. **Never implement postponed features without explicit user approval**: Strictly refrain from building the Admin Dashboard, Supabase integration, real payments, or Vercel deployment.
12. **Never invent successful tests, business rules, credentials, APIs, or configuration values**: State factual outcomes and highlight unknown requirements for user confirmation.
