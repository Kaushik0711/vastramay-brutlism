import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Saved Pieces — Wishlist — Vastramay",
  description:
    "Review and manage your curated selection of architectural garments and saved seasonal pieces.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/wishlist",
  },
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
