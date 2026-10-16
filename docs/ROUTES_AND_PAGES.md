# Vastramay — Routes & Page Structure

This document details the complete routing hierarchy, layout boundaries, rendering strategies, component dependencies, and metadata implementations across the Vastramay storefront.

---

## 1. Storefront Routes Matrix

| Route Path | Actual File Path | Boundary | Purpose & Interactive Behavior | Main Components Used | Data Dependencies | Metadata & Indexing | Status & Limitations |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Server (RSC) | Customer homepage. Features hero banner, category pills, split editorial banners, new drops grid, bestsellers carousel, promo callout, and newsletter. | `ProductCard`, `Button`, `Badge`, `HomeNewsletter` | `getFeaturedProducts()`, `getNewArrivals()`, `getBestSellers()` from `src/lib/products.ts` | `index, follow`<br>Canonical: `/`<br>JSON-LD: `Organization`, `WebSite` | **COMPLETE**.<br>Static mock products. |
| `/shop` | `src/app/shop/page.tsx` | Server + Client Suspense | Comprehensive fashion catalog. Provides multi-facet filtering (gender, category, size, color, price range, on-sale), sorting, pagination, and active filter chip management. | `ProductCatalog`, `CategoryNav`, `CatalogSkeleton`, `Drawer` | `getAllProducts()`, `CATEGORIES`, Client URL query parameters | `index, follow`<br>Canonical: `/shop`<br>JSON-LD: `Organization` | **COMPLETE**.<br>Client URL query sync. |
| `/men` | `src/app/men/page.tsx` | Server + Client Suspense | Men's collection catalog hub with locked gender parameter (`gender="men"`). Includes menswear-specific categories (Kurtas, Nehru Jackets, Shirts, T-Shirts, Trousers). | `ProductCatalog`, `CategoryNav` | `getProductsByGender("men")` from `src/lib/products.ts` | `index, follow`<br>Canonical: `/men`<br>JSON-LD: `Organization` | **COMPLETE**.<br>Includes unisex items. |
| `/women` | `src/app/women/page.tsx` | Server + Client Suspense | Women's collection catalog hub with locked gender parameter (`gender="women"`). Includes womenswear-specific categories (Sarees, Dresses, Tops, Skirts, Co-ords). | `ProductCatalog`, `CategoryNav` | `getProductsByGender("women")` from `src/lib/products.ts` | `index, follow`<br>Canonical: `/women`<br>JSON-LD: `Organization` | **COMPLETE**.<br>Includes unisex items. |
| `/category/[slug]` | `src/app/category/[slug]/page.tsx` | Server (PPR) | Category archive listing. Prerenders 12 fashion categories. Renders category hero banner and faceted catalog locked to the specified category. | `ProductCatalog`, `CategoryNav` | `getCategoryBySlug()`, `getProductsByCategory()` from `src/lib/products.ts` | `index, follow`<br>Dynamic Canonical: `/category/[slug]`<br>JSON-LD: `BreadcrumbList` | **COMPLETE**.<br>12 static paths prerendered via `generateStaticParams()`. 404 on invalid slug. |
| `/product/[slug]` | `src/app/product/[slug]/page.tsx` | Server (PPR) | Detailed garment presentation. Gallery thumbnail switcher, color/size selection chips, stock indicators, size guide modal, accordions, and related pieces. | `ProductDetailView`, `Breadcrumbs`, `PriceTag`, `Modal`, `Accordion`, `ProductCard` | `getProductBySlug()`, `getRelatedProducts()`, `useShopping()` | `index, follow`<br>Dynamic Canonical: `/product/[slug]`<br>JSON-LD: `BreadcrumbList`, `Product`, `Offer` | **COMPLETE**.<br>12 static paths prerendered via `generateStaticParams()`. |
| `/search` | `src/app/search/page.tsx` | Client Component | Live catalog search with query input, tag recommendation pills, clear button, and URL query preservation (`?q=`). | `SearchView`, `ProductCard`, `Container` | `searchProducts()` from `src/lib/products.ts`, URL search params | `noindex, follow`<br>Canonical: `/search` (Declared via `layout.tsx`) | **COMPLETE**.<br>Non-indexed search result page. |
| `/cart` | `src/app/cart/page.tsx` | Client Component | Order staging bag. Item table with thumbnails, size/color tags, stock-clamped steppers, line deletion, coupon validation input, and order summary sidebar. | `Button`, `Badge`, `ConfirmDialog`, `Input`, `EmptyState` | `useShopping()` (`cart`, `updateQuantity`, `removeFromCart`, `applyCoupon`, `clearCart`) | `noindex, follow`<br>Canonical: `/cart` (Declared via `layout.tsx`) | **COMPLETE**.<br>Persistent across reloads via `localStorage`. |
| `/checkout` | `src/app/checkout/page.tsx` | Client Component | 3-step checkout simulation: Step 1 (Contact & Address), Step 2 (Shipping Selection), Step 3 (Payment Selection). Validated with Zod schema. Displays simulated order confirmation receipt. | `Button`, `Badge`, `FormField`, `Input`, `Select`, `EmptyState` | React Hook Form, `useShopping()` (`cart`, `total`, `clearCart`) | `noindex, nofollow`<br>Canonical: `/checkout` (Declared via `layout.tsx`) | **COMPLETE (DEMO)**.<br>Simulated payment without real bank transaction. |
| `/wishlist` | `src/app/wishlist/page.tsx` | Client Component | Customer saved items. Displays favorited garments with size/color selection trigger (`QuickViewModal`), move-to-bag action, direct removal, and clear all. | `ProductCard`, `Button`, `EmptyState`, `ConfirmDialog`, `QuickViewModal` | `useShopping()` (`wishlist`, `removeFromWishlist`, `moveToCart`, `clearWishlist`) | `noindex, follow`<br>Canonical: `/wishlist` (Declared via `layout.tsx`) | **COMPLETE**.<br>Persisted in `localStorage`. |
| `/about` | `src/app/about/page.tsx` | Server (RSC) | Brand manifesto. Presents Vastramay's heritage textile craft philosophy, neo-brutalist architectural silhouette ethos, artisan clusters, and atelier standards. | `Container`, `Button`, `Badge` | Static editorial copy | `index, follow`<br>Canonical: `/about`<br>JSON-LD: `Organization` | **COMPLETE**. |
| `/contact` | `src/app/contact/page.tsx` | Client Component | Atelier contact form, studio operating hours, customer care email, and physical studio address details. | `Container`, `Button`, `Input`, `Textarea`, `FormField` | React Hook Form + Client validation, Toast notifications | `index, follow`<br>Canonical: `/contact` (Declared via `layout.tsx`) | **COMPLETE**.<br>Interactive demo submission with toast feedback. |
| `/faq` | `src/app/faq/page.tsx` | Client Component | Categorized accordion FAQ knowledge base covering sizing, care, shipping, exchanges, and payment methods. | `Container`, `Accordion`, `Badge` | Static FAQ dataset | `index, follow`<br>Canonical: `/faq` (Declared via `layout.tsx`) | **COMPLETE**. |
| `/shipping-returns` | `src/app/shipping-returns/page.tsx` | Server (RSC) | Shipping and doorstep exchange policy. Explains dispatch timelines (24-48h), free delivery threshold (₹1,999), 7-day doorstep exchange steps, and garment hygiene criteria. | `Container`, `Badge`, `Button` | Static policy data | `index, follow`<br>Canonical: `/shipping-returns`<br>JSON-LD: `Organization` | **COMPLETE**. |
| `/privacy-policy` | `src/app/privacy-policy/page.tsx` | Server (RSC) | DPDP Act compliant starter privacy policy draft with clear legal disclaimer badge. | `Container`, `Alert`, `Badge` | Static policy draft | `index, follow`<br>Canonical: `/privacy-policy`<br>JSON-LD: `Organization` | **COMPLETE (DRAFT)**.<br>Requires certified legal review before commercial launch. |
| `/terms` | `src/app/terms/page.tsx` | Server (RSC) | Terms of service starter draft with intellectual property, pricing, and dispute jurisdiction clauses. | `Container`, `Alert`, `Badge` | Static terms draft | `index, follow`<br>Canonical: `/terms`<br>JSON-LD: `Organization` | **COMPLETE (DRAFT)**.<br>Requires certified legal review before commercial launch. |
| `/dev/components` | `src/app/dev/components/page.tsx` | Client Component | Internal UI component showcase and Theme Customizer Studio. Provides live interactive controls for theme colors, border thickness, shadow offsets, and motion speeds. | Full `src/components/ui/` suite + `CustomizationContext` | `useCustomization()` | `noindex, nofollow`<br>Disallowed in `robots.txt`<br>Excluded from sitemap | **COMPLETE (INTERNAL)**.<br>Development showcase. |

---

## 2. Layout & Shell Boundaries

### Root Layout (`src/app/layout.tsx`)
The root layout is an async React Server Component. It provides the global skeleton:
1. **Fonts**: Loads `Syne`, `Plus Jakarta Sans`, and `Playfair Display` via `next/font/google` with `display: 'swap'`.
2. **Metadata Base**: Initialized with `siteConfig.url`.
3. **Structured Data**: Injects `Organization` and `WebSite` JSON-LD schemas.
4. **Skip Link**: Injects accessible keyboard link `<a href="#main-content">SKIP TO MAIN CONTENT</a>`.
5. **AnnouncementBar**: Compact single-line marquee banner with `-50% translate3d` continuous loop.
6. **Header**: Sticky navigation header with search, wishlist badge, and cart trigger.
7. **PageLoader**: Branded full-screen loader active on initial document mount and browser reloads.
8. **AppProviders**: Wraps all child routes inside `ToastProvider`, `ShoppingProvider`, and `CustomizationProvider`.
9. **Footer**: Neo-brutalist dark footer with newsletter form and categorized links.

### Route Template (`src/app/template.tsx`)
Next.js App Router's `template.tsx` instantiates on every client-side page navigation:
- Wraps route children in `<PageTransition>` (`src/components/layout/PageTransition.tsx`).
- Renders subtle 180ms vertical fade/glide without re-rendering or unmounting root providers or persistent state.

---

## 3. Dynamic Route Generation (`generateStaticParams`)

Both dynamic routes are pre-compiled during `next build`:
1. **Category Route (`/category/[slug]`)**:
   - Compiles 12 static paths from `src/data/categories.ts`:
     `kurtas`, `nehru-jackets`, `shirts`, `t-shirts`, `trousers`, `jeans`, `hoodies`, `dresses`, `tops`, `skirts`, `co-ord-sets`, `sarees`.
   - Invalid slugs call `notFound()`, rendering `src/app/not-found.tsx`.
2. **Product Detail Route (`/product/[slug]`)**:
   - Compiles 12 static paths from `src/data/products.ts`:
     `cobalt-asymmetric-mandarin-kurta`, `electric-yellow-textured-nehru-jacket`, `hot-pink-flared-angrakha-tunic`, `structured-industrial-overshirt`, `raw-denim-carpenter-pants`, `double-pleated-wide-leg-trousers`, `heavyweight-280-gsm-graphic-tee`, `architectural-chanderi-silk-saree`, `sculptural-boned-corset-top`, `tiered-flounce-cargo-skirt`, `minimalist-raw-linen-co-ord-set`, `brutalist-boxy-terry-hoodie`.
   - Invalid slugs call `notFound()`.
