import React, { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { SearchView } from "@/components/search/SearchView";
import { CatalogSkeleton } from "@/components/shop/CatalogSkeleton";

export const metadata = {
  title: "Search Catalog — Vastramay",
  description:
    "Search the full Vastramay catalog for kurtas, jackets, shirts, trousers, dresses, and streetwear garments.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/search",
  },
};

export default function SearchPage() {
  return (
    <div className="w-full py-8 sm:py-12">
      <Container>
        <Suspense fallback={<CatalogSkeleton />}>
          <SearchView />
        </Suspense>
      </Container>
    </div>
  );
}
