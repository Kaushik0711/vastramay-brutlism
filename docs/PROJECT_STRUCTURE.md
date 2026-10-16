# Project Structure & Directory Responsibilities

This document outlines the organization and architectural boundaries of the **Vastramay** codebase.

```
vastramay/
├── docs/                               # Architecture and development documentation
│   ├── README.md                       # Documentation hub and index
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
│   │   ├── dev/
│   │   │   └── components/
│   │   │       ├── layout.tsx          # Unindexed dev route layout
│   │   │       └── page.tsx            # Comprehensive Component Showcase page
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
│   │   │   └── ProductCard.tsx         # Neo-brutalist product card (wishlist + quick view)
│   │   ├── providers/                  # Client-side context providers
│   │   │   └── AppProviders.tsx        # ToastProvider & application context wrapper
│   │   ├── shop/                       # Catalog filters and taxonomy
│   │   │   └── CategoryNav.tsx         # Category pill tabs
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
│   │   └── ui.ts                       # UI defaults (toasts, overlays, transitions)
│   ├── data/                           # Mock datasets and category taxonomy
│   │   ├── categories.ts               # Apparel category catalog
│   │   └── products.ts                 # Sample clothing products with variants
│   ├── hooks/                          # Reusable custom React hooks
│   │   ├── useMediaQuery.ts            # Viewport query listener via useSyncExternalStore
│   │   └── useScrollPosition.ts        # Window scroll monitor via useSyncExternalStore
│   ├── lib/                            # Shared utilities and helpers
│   │   ├── motion.ts                   # Central Motion presets and transitions
│   │   ├── scroll-lock.ts              # Document body scroll locking utility
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
