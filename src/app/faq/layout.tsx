import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Vastramay",
  description:
    "Instant answers on sizing architecture, air delivery schedules, doorstep exchanges, handloom fabric care, and payment methods.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions — Vastramay",
    description:
      "Instant answers on sizing architecture, air delivery schedules, doorstep exchanges, and fabric care.",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
