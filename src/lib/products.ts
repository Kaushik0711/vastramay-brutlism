import { sampleProducts } from "@/data/products";
import { categories } from "@/data/categories";
import type { Product, CategoryItem, ClothingGender } from "@/types";

export interface ProductFilterParams {
  category?: string;
  gender?: string;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  inStockOnly?: boolean;
  onSaleOnly?: boolean;
  sortBy?: "featured" | "newest" | "price-asc" | "price-desc" | "rating";
  query?: string;
}

/**
 * Retrieve all products
 */
export function getAllProducts(): Product[] {
  return sampleProducts;
}

/**
 * Retrieve a single product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return sampleProducts.find((p) => p.slug === slug);
}

/**
 * Retrieve a single product by ID
 */
export function getProductById(id: string): Product | undefined {
  return sampleProducts.find((p) => p.id === id);
}

/**
 * Retrieve products filtered by gender (includes unisex items)
 */
export function getProductsByGender(gender: ClothingGender): Product[] {
  return sampleProducts.filter((p) => p.gender === gender || p.gender === "unisex");
}

/**
 * Retrieve products by category slug
 */
export function getProductsByCategory(categorySlug: string): Product[] {
  return sampleProducts.filter((p) => p.category === categorySlug);
}

/**
 * Retrieve a category by slug
 */
export function getCategoryBySlug(slug: string): CategoryItem | undefined {
  return categories.find((c) => c.slug === slug);
}

/**
 * Retrieve featured products
 */
export function getFeaturedProducts(limit = 4): Product[] {
  return sampleProducts.filter((p) => p.isFeatured).slice(0, limit);
}

/**
 * Retrieve new arrival products
 */
export function getNewArrivals(limit = 4): Product[] {
  return sampleProducts.filter((p) => p.isNewArrival).slice(0, limit);
}

/**
 * Retrieve bestseller products
 */
export function getBestSellers(limit = 4): Product[] {
  return sampleProducts.filter((p) => p.isBestSeller).slice(0, limit);
}

/**
 * Retrieve related products based on category/gender, excluding current product
 */
export function getRelatedProducts(currentProductId: string, limit = 3): Product[] {
  const current = getProductById(currentProductId);
  if (!current) return sampleProducts.slice(0, limit);

  const related = sampleProducts.filter(
    (p) => p.id !== currentProductId && (p.category === current.category || p.gender === current.gender)
  );

  return related.slice(0, limit);
}

/**
 * Comprehensive client-side search across title, tagline, description, category, and tags
 */
export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return sampleProducts.filter((p) => {
    const titleMatch = p.title.toLowerCase().includes(q);
    const taglineMatch = p.tagline?.toLowerCase().includes(q) ?? false;
    const descMatch = p.description.toLowerCase().includes(q);
    const catMatch = p.category.toLowerCase().includes(q);
    const tagMatch = p.tags.some((t) => t.toLowerCase().includes(q));
    const collectionMatch = p.collection?.toLowerCase().includes(q) ?? false;

    return titleMatch || taglineMatch || descMatch || catMatch || tagMatch || collectionMatch;
  });
}

/**
 * Filter and sort products according to user criteria
 */
export function filterAndSortProducts(
  products: Product[],
  filters: ProductFilterParams
): Product[] {
  let result = [...products];

  // Gender filter
  if (filters.gender && filters.gender !== "all") {
    result = result.filter(
      (p) => p.gender === filters.gender || p.gender === "unisex"
    );
  }

  // Category filter
  if (filters.category && filters.category !== "all") {
    result = result.filter((p) => p.category === filters.category);
  }

  // Collection filter
  if (filters.collection && filters.collection !== "all") {
    result = result.filter((p) => p.collection === filters.collection);
  }

  // Price range
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= (filters.minPrice ?? 0));
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= (filters.maxPrice ?? Infinity));
  }

  // Size filter
  if (filters.size && filters.size !== "all") {
    result = result.filter((p) =>
      p.variants.some((v) => v.size === filters.size && v.inStock)
    );
  }

  // Color filter
  if (filters.color && filters.color !== "all") {
    result = result.filter((p) =>
      p.variants.some(
        (v) => v.colorName.toLowerCase() === filters.color?.toLowerCase()
      )
    );
  }

  // Stock status
  if (filters.inStockOnly) {
    result = result.filter((p) =>
      p.variants.some((v) => v.inStock && v.stock > 0)
    );
  }

  // On sale only
  if (filters.onSaleOnly) {
    result = result.filter((p) => p.originalPrice && p.originalPrice > p.price);
  }

  // Search query
  if (filters.query) {
    const q = filters.query.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sorting
  switch (filters.sortBy) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      break;
    case "rating":
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "featured":
    default:
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  return result;
}
