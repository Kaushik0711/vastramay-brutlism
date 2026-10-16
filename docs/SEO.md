# Technical SEO Architecture & Strategy

## 1. Overview
The Vastramay storefront implements modern Next.js 16 App Router technical SEO best practices, prioritizing crawl efficiency, canonical accuracy, indexation control, and structured data validity without fabricating non-existent business metrics.

---

## 2. Centralized Site Origin & Production Validation
All metadata and canonical URL calculations resolve against a single centralized source of truth:
- **Configuration File**: [`src/config/site.ts`](file:///Users/jarvis/MySites/vastramay/src/config/site.ts)
- **Environment Variable**: `NEXT_PUBLIC_SITE_URL`
- **Fallback / Local Development Placeholder**: `https://vastramay.local`
- **Metadata Base**: Initialized in `src/app/layout.tsx` via `metadataBase: new URL(siteConfig.url)`.
- **Production Guard Check**: `isProductionOriginConfigured` verifies whether `NEXT_PUBLIC_SITE_URL` is set and non-placeholder. In production mode, a build/runtime console warning is automatically emitted if `NEXT_PUBLIC_SITE_URL` is missing or uses `vastramay.local`.

> **Production Requirement**: When launching on a live production domain, configure `NEXT_PUBLIC_SITE_URL="https://www.yourdomain.com"` in hosting environment variables. The placeholder `https://vastramay.local` must never be used in a live environment.

---

## 3. Robots Directives & Crawlability Consistency
Implemented via Next.js dynamic metadata route in [`src/app/robots.ts`](file:///Users/jarvis/MySites/vastramay/src/app/robots.ts).

### Critical Search-Engine Crawling Consistency:
Per Google Search Central standards, search engine crawlers must be permitted to fetch a page to read and honor its `<meta name="robots" content="noindex" />` tag. If a URL is disallowed in `robots.txt`, the crawler cannot fetch the HTML, will never discover the `noindex` directive, and may still index the bare URL.

Therefore:
- **Allowed in `robots.txt`**: `/cart`, `/checkout`, `/wishlist`, and `/search` are NOT blocked in `robots.txt` so crawlers can discover and obey their explicit `noindex` meta tags.
- **Disallowed in `robots.txt`**: Internal development workbench (`/dev/`) and backend API routes (`/api/`) are blocked at the crawler level.

### Indexing Policy by Route Type:
| Route Path | robots.txt Access | Indexing Directive | Rationale |
| :--- | :--- | :--- | :--- |
| `/` | Allowed | `index, follow` | Homepage landing |
| `/shop`, `/men`, `/women` | Allowed | `index, follow` | Core catalog discovery hubs |
| `/category/[slug]` | Allowed | `index, follow` | Category landing pages |
| `/product/[slug]` | Allowed | `index, follow` | Canonical product detail pages |
| `/about`, `/contact`, `/faq` | Allowed | `index, follow` | Public brand authority and customer support |
| `/shipping-returns`, `/privacy-policy`, `/terms` | Allowed | `index, follow` | Legal and logistical disclosures |
| `/cart` | Allowed | `noindex, follow` | Transient utility page; accessible to discover `noindex` |
| `/checkout` | Allowed | `noindex, nofollow` | Secure transactional funnel; accessible to discover `noindex` |
| `/wishlist` | Allowed | `noindex, follow` | Saved garments; accessible to discover `noindex` |
| `/search` | Allowed | `noindex, follow` | Parameterized faceted search; accessible to discover `noindex` |
| `/dev/*` | Disallowed | `noindex, nofollow` | Internal showcase and theme customizer |
| `/api/*` | Disallowed | N/A | Backend endpoints |

---

## 4. XML Sitemap Architecture
Implemented via Next.js dynamic metadata route in [`src/app/sitemap.ts`](file:///Users/jarvis/MySites/vastramay/src/app/sitemap.ts).
- Automatically aggregates:
  - 10 static informational and landing routes (`/`, `/shop`, `/men`, `/women`, `/about`, `/contact`, `/faq`, `/shipping-returns`, `/privacy-policy`, `/terms`)
  - 12 active category listing paths dynamically queried from `src/data/categories.ts`
  - 12 active product detail paths dynamically queried from `src/data/products.ts`
- Fully excludes `/cart`, `/checkout`, `/search`, `/wishlist`, and `/dev/*`.
- Served at `/sitemap.xml`.
- **Trustworthy Revision Timestamps**: Fabricated `<lastmod>` timestamps are strictly avoided. Because mock catalog items do not track verified revision dates, uniform placeholder dates are omitted per Google Search Central guidance to avoid penalization.

---

## 5. Structured Data (JSON-LD)
Structured data is rendered as valid, non-fabricated JSON-LD with XSS-safe serialization (`replace(/</g, "\\u003c")`).

### Implemented Schemas:
1. **Organization (`https://schema.org/Organization`)**:
   - Rendered in Root Layout [`src/app/layout.tsx`](file:///Users/jarvis/MySites/vastramay/src/app/layout.tsx).
   - Contains official brand name, site URL, and description. Invented social profiles and placeholder `sameAs` links are strictly omitted.
2. **WebSite (`https://schema.org/WebSite`)**:
   - Rendered in Root Layout with `SearchAction` pointing to `${siteConfig.url}/search?q={search_term_string}`.
3. **BreadcrumbList (`https://schema.org/BreadcrumbList`)**:
   - Category pages: `Home` -> `Shop` -> `Category Name`
   - Product pages: `Home` -> `Shop` -> `Category Name` -> `Product Title`
4. **Product & Offer (`https://schema.org/Product` & `Offer`)**:
   - Product detail page [`src/app/product/[slug]/page.tsx`](file:///Users/jarvis/MySites/vastramay/src/app/product/[slug]/page.tsx).
   - Currency: `INR`.
   - Real price and availability derived from actual product variants (`InStock` vs `OutOfStock`).
   - Sku, images, category, and brand attributes.
   - **Strict Constraint**: Verified reviews, star ratings, fake review counts, and false delivery guarantees are strictly omitted to comply with search quality guidelines and avoid deceptive schema penalties.

---

## 6. Pre-Production Launch Checklist
- [ ] Set `NEXT_PUBLIC_SITE_URL` in production environment to the actual live custom domain.
- [ ] Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools.
- [ ] Validate Open Graph card previews on LinkedIn Post Inspector and Twitter Card Validator.
- [ ] Test structured data on Google Rich Results Test once connected to the live domain.
