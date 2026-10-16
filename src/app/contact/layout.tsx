import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Atelier & Studio — Vastramay",
  description:
    "Direct communication channels for bespoke garment inquiries, order assistance, atelier appointments, and customer service.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Atelier & Studio — Vastramay",
    description:
      "Direct communication channels for bespoke garment inquiries, order assistance, and customer support.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
