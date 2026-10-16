import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout — Vastramay",
  description:
    "Complete your bespoke garment order with our simulated neo-brutalist checkout flow.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/checkout",
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
