import React, { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { ProductCatalog } from "@/components/shop/ProductCatalog";
import { CatalogSkeleton } from "@/components/shop/CatalogSkeleton";
import { getProductsByGender } from "@/lib/products";

export const metadata = {
  title: "Women's Collection — Contemporary Heritage Womenswear",
  description:
    "Maximalist proportions, pure handloom Chanderi silks, architectural boned tops, and statement festival silhouettes.",
  alternates: {
    canonical: "/women",
  },
};

export default function WomenPage() {
  const womenProducts = getProductsByGender("women");

  return (
    <div className="w-full py-8 sm:py-12">
      <Container>
        <Suspense fallback={<CatalogSkeleton />}>
          <ProductCatalog
            initialProducts={womenProducts}
            title="WOMEN'S COLLECTION"
            badge="WOMENSWEAR"
            description="Maximalist draped Angrakhas, sculptural corset blouses, tiered utilitarian skirts, and hand-embroidered silks."
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: "Women's Division" },
            ]}
            lockedGender="women"
          />
        </Suspense>
      </Container>
    </div>
  );
}
