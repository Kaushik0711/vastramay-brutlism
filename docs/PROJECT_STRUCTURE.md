# Project Structure & Directory Responsibilities

This document outlines the organization and architectural boundaries of the **Vastramay** codebase following Phase 3.

```
vastramay/
├── docs/                               # Architecture and development documentation
│   ├── README.md                       # Documentation hub and index
│   ├── SHOPPING_STATE.md               # Persistent client-side shopping state architecture (Phase 4)
│   ├── CART_AND_WISHLIST.md            # Cart drawer, /cart, /wishlist, and coupons (Phase 4)
│   ├── CHECKOUT_DEMO.md                # 3-step checkout and simulated receipt screen (Phase 4)
│   ├── ROUTES_AND_PAGES.md             # Complete storefront routes and layout rules (Phase 3)
│   ├── PRODUCT_DATA_MODEL.md           # Product schema, categories, and selector helpers (Phase 3)
│   ├── SHOPPING_UI.md                  # Shopping components, filters, and mobile design (Phase 3)
│   ├── COMPONENT_LIBRARY.md            # Complete UI library API reference
│   ├── ANIMATION_SYSTEM.md             # Motion presets and transition rules
│   ├── ACCESSIBILITY.md                # WCAG 2.1 AA keyboard and ARIA standards
│   ├── PROJECT_STRUCTURE.md            # Directory and file boundaries (this file)
│   ├── TECH_STACK.md                   # Dependencies, versions, and rationale
│   ├── DESIGN_SYSTEM.md                # Colors, fonts, tokens, and mixins
│   ├── DEVELOPMENT_SETUP.md            # Setup, CLI commands, and scripts
│   └── IMPLEMENTATION_LOG.md           # Completed work and test results
├── public/                             # Static public assets (images, icons)
├── src/
│   ├── app/                            # Next.js App Router root
│   │   ├── about/
│   │   │   └── page.tsx                # Brand manifesto, heritage craft, and 3 pillars
│   │   ├── cart/
│   │   │   └── page.tsx                # Shopping bag interface with quantity updates & promo engine
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Prerendered category archive pages (12 categories)
│   │   ├── checkout/
│   │   │   └── page.tsx                # 3-step shipping & demo payment checkout interface
│   │   ├── contact/
│   │   │   └── page.tsx                # Studio inquiry form, care hours, and location
│   │   ├── dev/
│   │   │   └── components/
│   │   │       ├── layout.tsx          # Unindexed dev route layout
│   │   │       └── page.tsx            # Comprehensive Component Showcase page
│   │   ├── faq/
│   │   │   └── page.tsx                # Categorized accordion FAQ knowledge base
│   │   ├── men/
│   │   │   └── page.tsx                # Men's collection filtered catalog
│   │   ├── privacy-policy/
│   │   │   └── page.tsx                # DPDP Act compliant starter privacy draft
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Prerendered product detail pages (12 garments)
│   │   ├── search/
│   │   │   └── page.tsx                # Live catalog search with query preservation
│   │   ├── shipping-returns/
│   │   │   └── page.tsx                # Delivery timelines, doorstep exchange steps & conditions
│   │   ├── shop/
│   │   │   └── page.tsx                # Full catalog with desktop sidebar & mobile drawer filters
│   │   ├── terms/
│   │   │   └── page.tsx                # Terms of service starter draft
│   │   ├── wishlist/
│   │   │   └── page.tsx                # Customer wishlist curation and move-to-bag interface
│   │   ├── women/
│   │   │   └── page.tsx                # Women's collection filtered catalog
│   │   ├── error.tsx                   # Segment error boundary (client component)
│   │   ├── global-error.tsx            # Root application crash fallback
│   │   ├── globals.css                 # Tailwind CSS v4 entry point with @theme tokens
│   │   ├── layout.tsx                  # Root layout (fonts, providers, header, footer)
│   │   ├── loading.tsx                 # Branded neo-brutalist loading indicator
│   │   ├── not-found.tsx               # Custom 404 page with return actions
│   │   ├── page.tsx                    # Complete customer homepage
│   │   └── template.tsx                # App Router page entrance transition template (Phase 5)
│   ├── components/
│   │   ├── cart/                       # Cart indicators & drawers (Phase 4)
│   │   │   ├── CartBadge.tsx           # Cart trigger with animated counter badge
│   │   │   └── CartDrawer.tsx          # Slide-over neo-brutalist quick shopping bag
│   │   ├── home/                       # Homepage specialized modules
│   │   │   └── HomeNewsletter.tsx      # Email registration with toast feedback
│   │   ├── layout/                     # Application shell structures
│   │   │   ├── AnnouncementBar.module.scss # Marquee ticker animations with pause & reduced motion
│   │   │   ├── AnnouncementBar.tsx     # Continuous single-line announcement banner
│   │   │   ├── Footer.tsx              # Neo-brutalist footer with real links
│   │   │   ├── Header.tsx              # Sticky header, search, live bag & wishlist counts
│   │   │   ├── Navigation.tsx          # Main navigation links with active state
│   │   │   ├── PageLoader.module.scss  # Neo-brutalism branded initial reload overlay styling
│   │   │   ├── PageLoader.tsx          # Full-screen branded initial document load overlay
│   │   │   └── PageTransition.tsx      # App Router subtle motion page transition (Phase 5)
│   │   ├── product/                    # Product presentation primitives
│   │   │   ├── PriceTag.tsx            # Price formatting with discount percentage
│   │   │   ├── ProductCard.tsx         # Neo-brutalist product card (wishlist + quick view)
│   │   │   ├── ProductDetailView.tsx   # Interactive gallery, size guide modal, selectors
│   │   │   └── QuickViewModal.tsx      # Quick size/color selector modal dialog (Phase 4)
│   │   ├── providers/                  # Client-side context providers
│   │   │   └── AppProviders.tsx        # ToastProvider, ShoppingProvider & CustomizationProvider wrapper
│   │   ├── search/                     # Catalog search interface
│   │   │   └── SearchView.tsx          # Live search with tag suggestions
│   │   ├── shop/                       # Catalog filters and taxonomy
│   │   │   ├── CatalogSkeleton.tsx     # Suspense boundary skeleton fallback
│   │   │   ├── CategoryNav.tsx         # Category pill tabs linking to /category/[slug]
│   │   │   └── ProductCatalog.tsx      # Faceted catalog with desktop sidebar & mobile drawer
│   │   └── ui/                         # Complete Neo-Brutalism UI Component Library
│   │       ├── toast/                  # Toast notification subsystem
│   │       │   ├── index.ts            # Toast exports
│   │       │   ├── toast-store.ts      # Reactive toast state manager
│   │       │   ├── toast-types.ts      # Toast TypeScript interfaces
│   │       │   ├── ToastItem.tsx       # Animated toast card
│   │       │   └── ToastProvider.tsx   # Toast container portal
│   │       ├── Accordion.tsx           # Collapsible FAQ and details panels
│   │       ├── Alert.tsx               # Inline semantic alerts
│   │       ├── Badge.module.scss       # Badge styles and shapes
│   │       ├── Badge.tsx               # Neo-brutalist tag and pill component
│   │       ├── Breadcrumbs.tsx         # Breadcrumb navigation
│   │       ├── Button.module.scss      # Button active push-down physics
│   │       ├── Button.tsx              # Reusable button with 6 variants & sizes
│   │       ├── Card.module.scss        # Card borders and hard shadow presets
│   │       ├── Card.tsx                # Card component with composition children
│   │       ├── Checkbox.tsx            # Square neo-brutalist checkbox
│   │       ├── ConfirmDialog.tsx       # Confirmation modal
│   │       ├── Container.tsx           # Responsive content width constraint
│   │       ├── Drawer.tsx              # Sliding sidebar drawer (right/left/bottom)
│   │       ├── DropdownMenu.tsx        # Popdown contextual menu
│   │       ├── EmptyState.tsx          # Framed empty state
│   │       ├── ErrorState.tsx          # Error presentation with retry
│   │       ├── FormField.tsx           # Label, Input, and Error wrapper
│   │       ├── index.ts                # UI library barrel export
│   │       ├── Input.module.scss       # Input SCSS module
│   │       ├── Input.tsx               # Text input with prefix/suffix icons
│   │       ├── Label.tsx               # Form label with required asterisk
│   │       ├── Modal.tsx               # Accessible dialog modal
│   │       ├── Pagination.tsx          # Page number controls
│   │       ├── Popover.tsx             # Floating popover bubble
│   │       ├── Progress.tsx            # Progress bar
│   │       ├── RadioGroup.tsx          # Radio group and radio items
│   │       ├── Select.tsx              # Dropdown select with custom chevron
│   │       ├── Skeleton.tsx            # Pulsing skeleton placeholder
│   │       ├── Spinner.tsx             # Geometric spinner
│   │       ├── Switch.tsx              # Sliding toggle switch
│   │       ├── Tabs.tsx                # Tab list and panels
│   │       ├── Textarea.tsx            # Multi-line text input with char count
│   │       └── Tooltip.tsx             # Accessible tooltip bubble
│   ├── config/                         # Static application configurations
│   │   ├── site.ts                     # Metadata, nav items, announcements
│   │   ├── theme.ts                    # Design system constants for TypeScript
│   │   └── ui.ts                       # UI defaults, transitions, theme tokens & customizer presets (Phase 5)
│   ├── context/                        # React context and state managers
│   │   ├── CustomizationContext.tsx    # Runtime theme, color, geometry, and motion customizer (Phase 5)
│   │   └── ShoppingContext.tsx         # useSyncExternalStore persistent shopping state (Phase 4)
│   ├── data/                           # Mock datasets and category taxonomy
│   │   ├── categories.ts               # 12 apparel categories with images
│   │   └── products.ts                 # 12 detailed mock garments with variants
│   ├── hooks/                          # Reusable custom React hooks
│   │   ├── useMediaQuery.ts            # Viewport query listener via useSyncExternalStore
│   │   └── useScrollPosition.ts        # Window scroll monitor via useSyncExternalStore
│   ├── lib/                            # Shared utilities and helpers
│   │   ├── motion.ts                   # Central Motion presets, spring physics, and reduced-motion variants (Phase 5)
│   │   ├── products.ts                 # Reusable catalog selectors and filter engine (Phase 3)
│   │   ├── scroll-lock.ts              # Document body scroll locking utility
│   │   ├── shopping.ts                 # Cart calculations, coupon rules, catalog sanitization (Phase 4)
│   │   └── utils.ts                    # Class merger (cn), formatCurrency, slugify
│   ├── styles/                         # Styling architecture and tokens
│   │   ├── _mixins.scss                # Hard shadows, borders, brutalist utilities
│   │   ├── _tokens.scss                # SCSS token variables & CSS custom properties
│   │   └── globals.scss                # Global Sass imports
│   └── types/                          # TypeScript definitions
│       └── index.ts                    # Product, Category, Cart, Coupon, DemoOrder & Site types
├── next.config.ts                      # Next.js 16 configuration
├── package.json                        # Dependencies, scripts, and engine specs
├── tsconfig.json                       # TypeScript compiler options
└── eslint.config.mjs                   # ESLint flat config with Next.js rules
```
