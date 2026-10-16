import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Component Showcase & UI Lab — Vastramay Internal",
  description:
    "Internal developer showcase and live theme customization workbench for Vastramay neo-brutalist component design system.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DevComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
