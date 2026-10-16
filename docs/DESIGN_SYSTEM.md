# Neo-Brutalism Design System

The **Vastramay** design system is grounded in the **Neo-Brutalism** aesthetic: high-contrast geometric blocks, crisp zero-blur hard shadows, prominent solid borders, saturated neon accents against warm canvas, and high-energy typography.

---

## 1. Color Palette

| Token Name | Hex Code | Swatch Role | CSS Variable |
| :--- | :--- | :--- | :--- |
| **Warm Cream** | `#F7F1E5` | Default body canvas background | `--color-cream` / `--bg-base` |
| **Hot Pink** | `#FF5C8A` | Primary CTA, urgent badges, active states | `--color-pink` / `--brand-primary` |
| **Electric Yellow** | `#FFE14A` | High-voltage highlights, ticker, announcement | `--color-yellow` / `--brand-secondary` |
| **Cobalt Blue** | `#4867F5` | Secondary accents, tags, links | `--color-blue` / `--brand-accent` |
| **Ink Black** | `#171717` | Structural borders, hard shadows, headings | `--color-ink` / `--fg-base` |
| **White** | `#FFFFFF` | Card surfaces, modals, high contrast | `--color-white` / `--bg-surface` |

---

## 2. Typography Hierarchy

The system employs three complementary font families loaded via `next/font/google`:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. SYNE (Bold Display)                                     │
│    Weights: 700, 800                                        │
│    Usage: Brand logo, h1-h6 headings, buttons, badges       │
│    CSS: var(--font-family-display)                          │
├─────────────────────────────────────────────────────────────┤
│ 2. PLUS JAKARTA SANS (Modern Clean Sans)                   │
│    Weights: 400, 500, 600, 700                              │
│    Usage: Body paragraphs, product descriptions, controls   │
│    CSS: var(--font-family-body)                             │
├─────────────────────────────────────────────────────────────┤
│ 3. PLAYFAIR DISPLAY (Editorial Fashion Highlight)          │
│    Weights: 600, 700 (Italic & Normal)                      │
│    Usage: Heritage callouts, collection quotes, subheadings │
│    CSS: var(--font-family-editorial)                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Borders & Outlines

Neo-brutalism relies on distinct, non-blurred structural lines:

- **Hairline**: `1px solid #171717` (`--border-hairline`)
- **Base**: `2px solid #171717` (`--border-base`) — used for standard buttons, badges, inputs
- **Thick**: `3px solid #171717` (`--border-thick`) — used for feature cards and header borders
- **Heavy**: `4px solid #171717` (`--border-heavy`) — used for hero frames and modal containers

---

## 4. Zero-Blur Hard Shadows

All shadows in Vastramay have **0px blur radius**, creating solid graphic silhouettes:

- `--shadow-sm`: `2px 2px 0px 0px #171717`
- `--shadow-base`: `4px 4px 0px 0px #171717`
- `--shadow-md`: `6px 6px 0px 0px #171717`
- `--shadow-lg`: `8px 8px 0px 0px #171717`
- `--shadow-xl`: `12px 12px 0px 0px #171717`
- `--shadow-pink`: `4px 4px 0px 0px #FF5C8A`
- `--shadow-yellow`: `4px 4px 0px 0px #FFE14A`
- `--shadow-blue`: `4px 4px 0px 0px #4867F5`

---

## 5. Micro-Interactions & Physics

Interactive elements (such as `Button` and interactive `Card`) feature tangible physical feedback:

- **Resting state**: Offset shadow (`4px 4px 0px #171717`).
- **Hover state**: Elements translate slightly up-left (`translate(-2px, -2px)`) while shadow expands to `6px 6px 0px #171717`.
- **Active / Pressed state**: Elements translate down-right (`translate(2px, 2px)`) while shadow collapses to `1px 1px 0px #171717` to mimic a mechanical button press.
- **Focus ring**: High-contrast `3px solid #171717` outline with `2px` offset (`--focus-ring`).

---

## 6. SCSS Mixins

Available in `src/styles/_mixins.scss`:

- `@include neo-box($bg, $shadow, $border-width, $border-color, $radius)`
- `@include neo-interactive($shadow, $hover-shadow, $press-offset)`
- `@include neo-focus`
- `@include neo-scrollbar`
- `@include text-balanced`
- `@include text-pretty`
