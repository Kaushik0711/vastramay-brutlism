import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductCatalog } from "@/components/shop/ProductCatalog";
import { CatalogSkeleton } from "@/components/shop/CatalogSkeleton";
import { categories } from "@/data/categories";
import { getCategoryBySlug, getAllProducts } from "@/lib/products";

import { siteConfig } from "@/config/site";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found — Vastramay",
    };
  }

  return {
    title: `${category.name} — Vastramay Collection`,
    description: category.description,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: `${category.name} | Vastramay Collection`,
      description: category.description,
      url: `${siteConfig.url}/category/${slug}`,
      images: category.imageSrc ? [category.imageSrc] : [],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const allProducts = getAllProducts();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${siteConfig.url}/shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${siteConfig.url}/category/${category.slug}`,
      },
    ],
  };

  return (
    <div className="w-full py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Container>
        <Suspense fallback={<CatalogSkeleton />}>
          <ProductCatalog
            initialProducts={allProducts}
            title={category.name}
            badge={category.badge || "CATEGORY ARCHIVE"}
            description={category.description}
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: category.name },
            ]}
            lockedCategory={category.slug}
          />
        </Suspense>
      </Container>
    </div>
  );
}
