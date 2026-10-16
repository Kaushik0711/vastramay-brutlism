# Project Structure & Directory Responsibilities

This document outlines the organization and architectural boundaries of the **Vastramay** codebase.

```
vastramay/
├── docs/                               # Architecture and development documentation
│   ├── README.md                       # Documentation hub and index
│   ├── PROJECT_STRUCTURE.md            # Directory and file boundaries (this file)
│   ├── TECH_STACK.md                   # Dependencies, versions, and rationale
│   ├── DESIGN_SYSTEM.md                # Colors, fonts, tokens, and mixins
│   ├── DEVELOPMENT_SETUP.md            # Setup, CLI commands, and scripts
│   └── IMPLEMENTATION_LOG.md           # Completed work and test results
├── public/                             # Static public assets (images, icons)
├── src/
│   ├── app/                            # Next.js App Router root
│   │   ├── error.tsx                   # Segment error boundary (client component)
│   │   ├── global-error.tsx            # Root application crash fallback
│   │   ├── globals.css                 # Tailwind CSS v4 entry point with @theme tokens
│   │   ├── layout.tsx                  # Root layout (fonts, providers, header, footer)
│   │   ├── loading.tsx                 # Branded neo-brutalist loading indicator
│   │   ├── not-found.tsx               # Custom 404 page with return actions
│   │   └── page.tsx                    # Foundational landing shell
│   ├── components/
│   │   ├── cart/                       # Cart drawer and indicators
│   │   │   └── CartBadge.tsx           # Cart trigger with counter badge
│   │   ├── layout/                     # Application shell structures
│   │   │   ├── AnnouncementBar.module.scss # Marquee ticker animations
│   │   │   ├── AnnouncementBar.tsx     # Continuous announcement banner
│   │   │   ├── Footer.tsx              # Neo-brutalist footer with newsletter shell
│   │   │   ├── Header.tsx              # Sticky header, search, brand, mobile menu
│   │   │   └── Navigation.tsx          # Main navigation links with active state
│   │   ├── product/                    # Product presentation primitives
│   │   │   ├── PriceTag.tsx            # Price formatting with discount percentage
│   │   │   └── ProductCard.tsx         # Neo-brutalist product card skeleton
│   │   ├── providers/                  # Client-side context providers
│   │   │   └── AppProviders.tsx        # Application provider wrapper
│   │   ├── shop/                       # Catalog filters and taxonomy
│   │   │   └── CategoryNav.tsx         # Category pill tabs
│   │   └── ui/                         # Reusable primitive UI components
│   │       ├── Badge.module.scss       # Badge styles and shapes
│   │       ├── Badge.tsx               # Neo-brutalist tag and pill component
│   │       ├── Button.module.scss      # Button active push-down physics
│   │       ├── Button.tsx              # Reusable button with 6 variants & sizes
│   │       ├── Card.module.scss        # Card borders and hard shadow presets
│   │       ├── Card.tsx                # Neo-brutalist container card
│   │       └── Container.tsx           # Responsive content width constraint
│   ├── config/                         # Static application configurations
│   │   ├── site.ts                     # Metadata, nav items, announcements
│   │   └── theme.ts                    # Design system constants for TypeScript
│   ├── data/                           # Mock datasets and category taxonomy
│   │   ├── categories.ts               # Apparel category catalog
│   │   └── products.ts                 # Sample clothing products with variants
│   ├── hooks/                          # Reusable custom React hooks
│   │   ├── useMediaQuery.ts            # Viewport query listener via useSyncExternalStore
│   │   └── useScrollPosition.ts        # Window scroll monitor via useSyncExternalStore
│   ├── lib/                            # Shared utilities and helpers
│   │   └── utils.ts                    # Class merger (cn), formatCurrency, slugify
│   ├── styles/                         # Design system styling engine
│   │   ├── _mixins.scss                # Reusable SCSS mixins (neo-box, neo-interactive)
│   │   ├── _reset.scss                 # Reset, selection, scrollbar, headings
│   │   ├── _tokens.scss                # Central CSS custom properties
│   │   └── globals.scss                # Compiled global SCSS bundle
│   └── types/                          # Domain models and shared interfaces
│       └── index.ts                    # Product, Variant, Category, Nav, Cart types
├── next.config.ts                      # Next.js 16 compiler configuration
├── package.json                        # Project metadata and dependencies
├── tsconfig.json                       # Strict TypeScript compiler options
└── eslint.config.mjs                   # ESLint configuration
```

---

## Directory Responsibilities

### `src/app/`
- **Responsibility**: Routing, layouts, error boundaries, loading states, and page compositions.
- **Rule**: Keep route files focused on fetching and layout assembly; extract UI into `src/components/`.

### `src/components/ui/`
- **Responsibility**: Reusable, atomic visual primitives that have zero business logic (Button, Badge, Card, Container).
- **Rule**: Primitives must use SCSS modules for complex micro-interactions (e.g. brutalist push-down physics) combined with Tailwind for layout.

### `src/components/layout/`
- **Responsibility**: High-level visual frame shared across the application: Header, Footer, Navigation, and AnnouncementBar.

### `src/components/product/` & `src/components/shop/`
- **Responsibility**: Domain-specific UI components for clothing items, price displays, size selectors, and category navigation.

### `src/styles/`
- **Responsibility**: Centralized design tokens (`_tokens.scss`), mixins (`_mixins.scss`), global resets (`_reset.scss`), and global utility classes (`globals.scss`).
- **Rule**: Single source of truth for raw hex codes, shadow formulas, and transition curves.

### `src/types/`
- **Responsibility**: TypeScript type definitions shared across the entire frontend.
- **Rule**: Strict types for all product models, variants, cart items, and component contracts.
