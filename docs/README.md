# Vastramay — Engineering Documentation

> **Vastramay** is a contemporary clothing e-commerce platform built for menswear and womenswear, fusing rich Indian heritage craft with unapologetic neo-brutalist aesthetics.

---

## Documentation Index

| Document | Purpose |
| :--- | :--- |
| [**COMPONENT_LIBRARY.md**](./COMPONENT_LIBRARY.md) | Full API, prop interfaces, and usage examples for all UI components |
| [**ANIMATION_SYSTEM.md**](./ANIMATION_SYSTEM.md) | Motion presets, spring physics, and reduced-motion conventions |
| [**ACCESSIBILITY.md**](./ACCESSIBILITY.md) | WCAG 2.1 AA keyboard navigation, ARIA semantics, and focus management |
| [**PROJECT_STRUCTURE.md**](./PROJECT_STRUCTURE.md) | Scalable folder architecture, directory boundaries, and file responsibilities |
| [**TECH_STACK.md**](./TECH_STACK.md) | Exact technology versions, package choices, and architectural rationale |
| [**DESIGN_SYSTEM.md**](./DESIGN_SYSTEM.md) | Neo-brutalist color tokens, 3-font typography engine, borders, and hard shadows |
| [**DEVELOPMENT_SETUP.md**](./DEVELOPMENT_SETUP.md) | Local development setup, installation instructions, and verification commands |
| [**IMPLEMENTATION_LOG.md**](./IMPLEMENTATION_LOG.md) | Changelog, files created, verification results, and roadmap |

---

## Project Status: Phase 2 Complete

- **Current Milestone**: Phase 2 — Complete the Neo-Brutalism Component Library.
- **Framework**: Next.js 16.4.2 (App Router) + React 19.3.0.
- **Styling Architecture**: Tailwind CSS v4 + Sass (SCSS Modules) + CSS Custom Properties.
- **Component System**: Complete UI library comprising 25+ reusable primitives (Buttons, Badges, Cards, Form Controls, Alerts, Toasts, Modals, Drawers, Dropdowns, Tabs, Accordions, Pagination).
- **Interactive Component Showcase**: Available locally at [`/dev/components`](http://localhost:3000/dev/components) (unindexed dev preview).
- **TypeScript**: Strict type checking with zero compiler warnings or errors.

---

## Quick Navigation

```bash
# Run local development server
npm run dev

# Run TypeScript verification
npx tsc --noEmit

# Run ESLint check
npm run lint

# Run production build
npm run build
```
