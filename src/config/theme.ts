/**
 * Vastramay Neo-Brutalism Design System Tokens
 * TypeScript Constants for Programmatic Access
 */

export const THEME_COLORS = {
  cream: "#F7F1E5",
  pink: "#FF5C8A",
  yellow: "#FFE14A",
  blue: "#4867F5",
  ink: "#171717",
  white: "#FFFFFF",
} as const;

export const THEME_SHADOWS = {
  sm: "2px 2px 0px 0px #171717",
  base: "4px 4px 0px 0px #171717",
  md: "6px 6px 0px 0px #171717",
  lg: "8px 8px 0px 0px #171717",
  xl: "12px 12px 0px 0px #171717",
  pink: "4px 4px 0px 0px #FF5C8A",
  yellow: "4px 4px 0px 0px #FFE14A",
  blue: "4px 4px 0px 0px #4867F5",
} as const;

export const THEME_BORDERS = {
  hairline: "1px solid #171717",
  base: "2px solid #171717",
  thick: "3px solid #171717",
  heavy: "4px solid #171717",
} as const;

export const THEME_RADII = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  base: "6px",
  md: "8px",
  full: "9999px",
} as const;

export const THEME_FONTS = {
  display: "var(--font-family-display)",
  body: "var(--font-family-body)",
  editorial: "var(--font-family-editorial)",
} as const;
