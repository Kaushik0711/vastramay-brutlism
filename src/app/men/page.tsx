import React, { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { ProductCatalog } from "@/components/shop/ProductCatalog";
import { CatalogSkeleton } from "@/components/shop/CatalogSkeleton";
import { getProductsByGender } from "@/lib/products";

export const metadata = {
  title: "Men's Collection — Architectural Indian Menswear",
  description:
    "Sharp tailoring, heavy woven jacquards, asymmetric kurtas, boxy shirts, and pleated trousers crafted for the contemporary man.",
  alternates: {
    canonical: "/men",
  },
};

export default function MenPage() {
  const menProducts = getProductsByGender("men");

  return (
    <div className="w-full py-8 sm:py-12">
      <Container>
        <Suspense fallback={<CatalogSkeleton />}>
          <ProductCatalog
            initialProducts={menProducts}
            title="MEN'S COLLECTION"
            badge="MENSWEAR"
            description="Angular Mandarin collars, heavy woven jacquard Nehru jackets, structured overshirts, and architectural bottom wear."
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: "Men's Division" },
            ]}
            lockedGender="men"
          />
        </Suspense>
      </Container>
    </div>
  );
}
