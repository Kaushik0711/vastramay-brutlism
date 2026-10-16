import React, { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { ProductCatalog } from "@/components/shop/ProductCatalog";
import { CatalogSkeleton } from "@/components/shop/CatalogSkeleton";
import { getAllProducts } from "@/lib/products";

export const metadata = {
  title: "Shop All Collections & Edits",
  description:
    "Explore the full Vastramay catalog of contemporary Indian menswear, womenswear, and gender-fluid architectural street fashion.",
  alternates: {
    canonical: "/shop",
  },
};

export default function ShopPage() {
  const allProducts = getAllProducts();

  return (
    <div className="w-full py-8 sm:py-12">
      <Container>
        <Suspense fallback={<CatalogSkeleton />}>
          <ProductCatalog
            initialProducts={allProducts}
            title="ALL COLLECTIONS & EDITS"
            description="Explore our complete archive of architectural menswear, womenswear, and unisex silhouettes engineered with pure heritage handlooms."
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Shop All" },
            ]}
          />
        </Suspense>
      </Container>
    </div>
  );
}
