import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { sampleProducts } from "@/data/products";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";

import { siteConfig } from "@/config/site";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return sampleProducts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found — Vastramay",
    };
  }

  const primaryImage = product.images?.[0]?.src;

  return {
    title: `${product.title} — Vastramay Studio`,
    description: product.description,
    alternates: {
      canonical: `/product/${slug}`,
    },
    openGraph: {
      title: `${product.title} | Vastramay Studio`,
      description: product.description,
      url: `${siteConfig.url}/product/${slug}`,
      type: "website",
      images: primaryImage
        ? [
            {
              url: primaryImage,
              width: 800,
              height: 1000,
              alt: product.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Vastramay`,
      description: product.description,
      images: primaryImage ? [primaryImage] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 3);

  // Structured Data: BreadcrumbList
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
        name: product.category.toUpperCase(),
        item: `${siteConfig.url}/category/${product.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.title,
        item: `${siteConfig.url}/product/${product.slug}`,
      },
    ],
  };

  // Structured Data: Product & Offer (INR currency, real mock values only, no fabricated reviews)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images?.map((img) => img.src) || [],
    sku: product.variants?.[0]?.sku || `VM-${product.id}`,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Vastramay",
    },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/product/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.variants && product.variants.some((v) => v.inStock && v.stock > 0)
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Vastramay",
      },
    },
  };

  return (
    <div className="w-full py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Container>
        <ProductDetailView
          product={product}
          relatedProducts={relatedProducts}
        />
      </Container>
    </div>
  );
}
