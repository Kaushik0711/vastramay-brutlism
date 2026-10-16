import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { sampleProducts } from "@/data/products";
import { categories } from "@/data/categories";

/**
 * Next.js App Router sitemap.xml generator
 * Generates an up-to-date sitemap covering all canonical public routes,
 * category archives, and individual garments.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Core Storefront & Brand Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/men`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/women`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/shipping-returns`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic Category Archives (12 categories)
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic Product Pages (12 garments)
  const productRoutes: MetadataRoute.Sitemap = sampleProducts.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
