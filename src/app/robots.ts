import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Next.js App Router robots.txt configuration
 *
 * Directs search engine crawlers:
 * - Public pages, collections, and products are allowed.
 * - Routes relying on <meta name="robots" content="noindex" /> (e.g. /cart, /checkout,
 *   /wishlist, /search) are accessible so crawlers can read and respect the noindex directive.
 * - Internal development showcases (/dev/) and backend API endpoints (/api/) are disallowed.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dev/",
          "/api/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
