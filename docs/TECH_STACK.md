# Technology Stack & Architectural Decisions

This document details the exact technologies, package versions, and architectural decisions governing the **Vastramay** frontend.

---

## Core Technologies & Versions

| Package | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js** | `16.4.2` | App Router framework with Turbopack and Partial Prerendering |
| **React** / **React DOM** | `19.3.0` | React 19 core library |
| **TypeScript** | `^5` | Strict type safety across all components and models |
| **Tailwind CSS** | `^4` | Utility-first CSS framework with native `@theme` integration |
| **@tailwindcss/turbopack** | `^4` | Next.js Turbopack loader for Tailwind v4 CSS |
| **Sass** | `^1.105.2` | SCSS compiler for complex neo-brutalist tactile physics and keyframe animations |
| **Motion** | `^14.3.0` | Production animation library for spring presets, overlays, and page transitions |
| **Lucide React** | `^1.57.0` | Crisp geometric iconography matching neo-brutalist aesthetic |
| **React Hook Form** | `^7.90.0` | Lightweight form state management for checkout and newsletter |
| **@hookform/resolvers** | `^5.9.1` | Zod resolver adapter for React Hook Form |
| **Zod** | `^4.6.7` | Type-safe schema validation |
| **clsx** + **tailwind-merge** | `^2.1.1` / `^3.7.0` | Conflict-free className composition (`cn` helper) |

---

## Architectural Decisions

### 1. Dual-Engine Styling: Tailwind CSS v4 + SCSS Modules
- **Why Both?**
  - **Tailwind CSS v4** provides hyper-fast layout assembly, responsive modifiers (`sm:`, `md:`, `lg:`), grid systems, and flexbox utilities without CSS bloat.
  - **SCSS Modules** provide deterministic encapsulation for neo-brutalist interactive physics (e.g. `active: translate(2px, 2px) box-shadow: 1px 1px 0px 0px #171717`), continuous keyframe ticker marquees, and custom high-contrast scrollbars.
  - **CSS Custom Properties** (`_tokens.scss`) act as the single source of truth connecting both engines. Tailwind v4's `@theme` references these CSS variables directly, preventing duplication.

### 2. Next.js 16 App Router & Turbopack
- Next.js 16 includes **Turbopack** as the default build tool.
- All routing utilizes the `app/` directory convention:
  - Nested layout hierarchy (`layout.tsx`).
  - Native loading fallbacks (`loading.tsx`).
  - Segment error handling (`error.tsx`).
  - Root error boundary (`global-error.tsx`).
  - Not found handling (`not-found.tsx`).

### 3. React 19 State Synchronization (`useSyncExternalStore`)
- In React 19, synchronous `setState()` calls inside `useEffect()` trigger cascading renders and lint warnings (`react-hooks/set-state-in-effect`).
- All window and browser subscriptions (`useMediaQuery`, `useScrollPosition`) utilize `useSyncExternalStore` with server-side snapshot fallbacks to ensure hydration safety and instant render performance.

### 4. Font Optimization via `next/font/google`
- Fonts are loaded using Next.js font optimization with `display: 'swap'` and zero external runtime network requests.
- CSS variables (`--font-syne`, `--font-plus-jakarta`, `--font-playfair`) are injected directly onto the `<html>` root.
