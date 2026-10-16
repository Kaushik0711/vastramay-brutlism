# Vastramay — Engineering Documentation

> **Vastramay** is a contemporary clothing e-commerce platform built for menswear and womenswear, fusing rich Indian heritage craft with unapologetic neo-brutalist aesthetics.

---

## Documentation Index

| Document | Purpose |
| :--- | :--- |
| [**AI_CONTEXT.md**](./AI_CONTEXT.md) | **MANDATORY FIRST READ**: Master AI assistant context, architecture, boundaries, and working rules |
| [**PROJECT_STATUS.md**](./PROJECT_STATUS.md) | Comprehensive audit report, route verification matrix, production readiness, and future roadmap |
| [**FEATURE_MAP.md**](./FEATURE_MAP.md) | Master feature-to-file matrix linking routes, components, state, utilities, and tests |
| [**SEO.md**](./SEO.md) | Technical SEO architecture, metadataBase, robots.txt, sitemap.xml, and JSON-LD structured data |
| [**PERFORMANCE.md**](./PERFORMANCE.md) | Rendering architecture (RSC default), image pipelines, font loading, Core Web Vitals, and build metrics |
| [**TESTING.md**](./TESTING.md) | Node 24 native test runner architecture, automated unit test suites, and verification commands |
| [**SHOPPING_STATE.md**](./SHOPPING_STATE.md) | Client-side persistent shopping state, useSyncExternalStore, multi-tab sync, and catalog sanitization |
| [**CART_AND_WISHLIST.md**](./CART_AND_WISHLIST.md) | Mini-cart drawer, /cart page, /wishlist page, stock limiting, and coupon rules |
| [**CHECKOUT_DEMO.md**](./CHECKOUT_DEMO.md) | 3-step checkout workflow, Zod validation, delivery options, and simulated receipt screen |
| [**ROUTES_AND_PAGES.md**](./ROUTES_AND_PAGES.md) | Comprehensive route structure, dynamic params, prerendering, and layout boundaries |
| [**PRODUCT_DATA_MODEL.md**](./PRODUCT_DATA_MODEL.md) | Catalog schema, categories, mock products, selectors, and INR currency conventions |
| [**SHOPPING_UI.md**](./SHOPPING_UI.md) | Faceted catalog, mobile filter drawer, product detail view, and responsive layouts |
| [**COMPONENT_LIBRARY.md**](./COMPONENT_LIBRARY.md) | Full API, prop interfaces, and usage examples for all UI and layout components |
| [**ANIMATION_SYSTEM.md**](./ANIMATION_SYSTEM.md) | Motion presets, spring physics, announcement marquee ticker, and branded page loader |
| [**ACCESSIBILITY.md**](./ACCESSIBILITY.md) | WCAG 2.2 AA keyboard navigation, ARIA semantics, skip links, and focus management |
| [**PROJECT_STRUCTURE.md**](./PROJECT_STRUCTURE.md) | Scalable folder architecture, directory boundaries, and file responsibilities |
| [**TECH_STACK.md**](./TECH_STACK.md) | Exact technology versions, package choices, and architectural rationale |
| [**DESIGN_SYSTEM.md**](./DESIGN_SYSTEM.md) | Neo-brutalist color tokens, 3-font typography engine, borders, and hard shadows |
| [**DEVELOPMENT_SETUP.md**](./DEVELOPMENT_SETUP.md) | Local development setup, installation instructions, and verification commands |
| [**IMPLEMENTATION_LOG.md**](./IMPLEMENTATION_LOG.md) | Complete changelog, files created, verification results, and roadmap |

---

## Project Status: Frontend Complete & Stabilized

- **Current Milestone**: Post-Phase 6 — Announcement Marquee Fix, Branded Page Loader & Master Knowledge Base Audit.
- **Framework**: Next.js 16.4.2 (App Router, Turbopack) + React 19.3.0.
- **Styling Architecture**: Tailwind CSS v4 + Sass (SCSS Modules) + Centralized Neo-Brutalist Design Tokens.
- **Quality & Assurance Highlights**:
  - **Technical SEO**: Centralized `siteConfig.url` origin, dynamic `/robots.txt` and `/sitemap.xml`, canonical URLs across all 16 customer routes, and OpenGraph / Twitter tags.
  - **Structured Data (JSON-LD)**: Organization and WebSite schemas on root layout; BreadcrumbList on category and product routes; Product and Offer schemas on product detail pages with real mock data and INR currency, strictly omitting fabricated reviews.
  - **Automated Unit Testing**: 28 automated unit tests across 11 suites (`npm test`) using Node 24 native test runner (`node:test`, `node:assert/strict`) verifying cart calculations, coupon engine (`BOLD15`), free shipping thresholds (₹1,999), variant-specific line identity, product filtering, and announcement bar configuration.
  - **Accessibility (WCAG 2.2 AA)**: Keyboard skip-to-content link, focus trap modals, ARIA expanded/controls, semantic headings, and reduced-motion detection.
  - **Performance**: RSC by default, responsive `next/image` with above-the-fold `priority`, self-hosted Google fonts with `swap`, and compositor-only Motion physics.
- **Static Compilation**: 46 static and partial-prerendered pages generated cleanly via `npm run build`.
- **TypeScript & Linting**: 100% clean check (`npx tsc --noEmit` and `npm run lint`).

---

## Quick Navigation

```bash
# Run local development server
npm run dev

# Run unit tests (Node.js 24 native runner)
npm test

# Run TypeScript verification
npx tsc --noEmit

# Run ESLint check
npm run lint

# Run production build
npm run build
```
