import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Bag — Vastramay",
  description:
    "Review your staged architectural garments, adjust sizing and quantities, apply promotion codes, and proceed to checkout.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/cart",
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
