# Vastramay — Product Data Model & Catalog Architecture

This document outlines the data schema, type contracts, category taxonomies, and selector helpers governing the Vastramay clothing catalog.

## 1. Type Architecture (`src/types/index.ts`)

```typescript
export type ClothingGender = "men" | "women" | "unisex";

export type ClothingCategory =
  | "kurtas"
  | "nehru-jackets"
  | "shirts"
  | "t-shirts"
  | "trousers"
  | "jeans"
  | "hoodies"
  | "dresses"
  | "tops"
  | "skirts"
  | "co-ord-sets"
  | "sarees"
  | "accessories";

export interface ProductVariant {
  id: string;
  sku: string;
  colorName: string;
  colorHex: string;
  size: "S" | "M" | "L" | "XL" | "XXL" | "FREE" | string;
  stock: number;
  inStock: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string; // "INR"
  gender: ClothingGender;
  category: ClothingCategory;
  collection?: string;
  tags?: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  discountPercentage?: number;
  images: ProductImage[];
  variants: ProductVariant[];
  fabric?: string;
  careInstructions?: string[];
  rating?: number;
  reviewsCount?: number;
}

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  gender?: ClothingGender;
  description?: string;
  itemCount: number;
  badge?: string;
  imageSrc?: string;
}
```

---

## 2. Mock Catalog Scope (`src/data/`)

### Products (`src/data/products.ts`)
The initial Phase 3 dataset contains 12 garments representing realistic Indian handlooms and industrial streetwear cuts:
1. **Cobalt Asymmetric Mandarin Kurta** (`kurtas`) — Men's.
2. **Electric Yellow Textured Nehru Jacket** (`nehru-jackets`) — Men's.
3. **Hot Pink Flared Angrakha Tunic** (`dresses`) — Women's.
4. **Structured Industrial Overshirt** (`shirts`) — Men's.
5. **Raw Denim Carpenter Pants** (`jeans`) — Unisex.
6. **Double-Pleated Wide Leg Trousers** (`trousers`) — Men's.
7. **Heavyweight 280 GSM Graphic Tee** (`t-shirts`) — Unisex.
8. **Architectural Chanderi Silk Saree** (`sarees`) — Women's.
9. **Sculptural Boned Corset Top** (`tops`) — Women's.
10. **Tiered Flounce Cargo Skirt** (`skirts`) — Women's.
11. **Minimalist Raw Linen Co-ord Set** (`co-ord-sets`) — Women's.
12. **Brutalist Boxy Terry Hoodie** (`hoodies`) — Unisex.

### Categories (`src/data/categories.ts`)
12 fully indexed categories with descriptions, item counts, badges, and verified Unsplash images:
- `kurtas`
- `nehru-jackets`
- `shirts`
- `t-shirts`
- `trousers`
- `jeans`
- `hoodies`
- `dresses`
- `tops`
- `skirts`
- `co-ord-sets`
- `sarees`

---

## 3. Selector Functions (`src/lib/products.ts`)

Pure selector and query functions keep data fetching and transformation isolated from UI components:

- `getAllProducts()`: Returns the full catalog array.
- `getProductBySlug(slug: string)`: Finds single product by unique route slug.
- `getProductById(id: string)`: Finds single product by unique identifier.
- `getProductsByGender(gender: ClothingGender)`: Filters by gender including unisex styles.
- `getProductsByCategory(categorySlug: string)`: Returns all products in a given category.
- `getCategoryBySlug(slug: string)`: Retrieves category metadata.
- `getFeaturedProducts(limit?: number)`: Retrieves products with `isFeatured: true`.
- `getNewArrivals(limit?: number)`: Retrieves products with `isNewArrival: true`.
- `getBestSellers(limit?: number)`: Retrieves products with `isBestSeller: true`.
- `getRelatedProducts(currentProductId: string, limit?: number)`: Recommends garments sharing category or gender.
- `searchProducts(query: string)`: Case-insensitive client search querying titles, descriptions, categories, and tags.
- `filterAndSortProducts(params: ProductFilterParams)`: Composable filtering engine.

---

## 4. Currency Formatting

All monetary values are denominated in Indian Rupees (INR) and formatted with the centralized helper in `src/lib/utils.ts`:

```typescript
export function formatCurrency(amount: number, currency: string = "INR", locale: string = "en-IN"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
```
Outputs: `₹2,499`, `₹3,899`, etc.

---

## 5. Guide: How to Safely Add or Update a Mock Product

To add a new garment or update an existing mock product in `src/data/products.ts`, follow these rules to maintain catalog integrity and prevent build failures:

### Step 1: Assign a Unique Identifier and URL Slug
- **ID**: Sequential format `prod-N` (e.g. `prod-13`).
- **Slug**: Hyphenated lowercase string matching the garment title (e.g. `crimson-embroidered-bundi-jacket`). Slugs are used directly by Next.js `generateStaticParams()` to create `/product/[slug]`.

### Step 2: Define Valid Category and Gender
- `category` must be one of the 13 defined `ClothingCategory` union strings:
  `kurtas`, `nehru-jackets`, `shirts`, `t-shirts`, `trousers`, `jeans`, `hoodies`, `dresses`, `tops`, `skirts`, `co-ord-sets`, `sarees`, `accessories`.
- `gender` must be `"men"`, `"women"`, or `"unisex"`.

### Step 3: Configure Images with Whitelisted Domains
- Remote image URLs must use `images.unsplash.com` (whitelisted in `next.config.ts`).
- Set at least one primary image with `isPrimary: true` and a descriptive, accessible `alt` text.

### Step 4: Define Real Variants with Stock
- Every product must define at least one variant in the `variants` array.
- Each variant requires:
  - `id`: Unique variant ID (e.g. `v13-1`).
  - `sku`: Unique SKU string (e.g. `BJ-CRM-M`).
  - `colorName`: Clean color label (e.g. `Crimson Red`).
  - `colorHex`: Valid hex code (e.g. `#991B1B`).
  - `size`: Valid size (`"S"`, `"M"`, `"L"`, `"XL"`, `"XXL"`, or `"FREE"`).
  - `stock`: Integer stock count $\ge 0$.
  - `inStock`: Boolean reflecting `stock > 0`.

### Step 5: Pricing & Fabric Information
- `price`: Integer in INR (e.g. `3499`).
- `originalPrice`: Optional comparison price (e.g. `4999`).
- `discountPercentage`: Optional integer discount calculation.
- `currency`: Must be `"INR"`.
- `fabric`: Detailed textile craft description (e.g. `"Hand-Spun Matka Silk"`).
- `careInstructions`: Array of care strings (e.g. `["Professional dry clean only"]`).

### Step 6: Verify Build & Tests
After updating `src/data/products.ts`:
1. Run `npm test` to ensure catalog lookup and partitioning tests pass.
2. Run `npm run build` to verify that `generateStaticParams()` pre-renders the new product route without error.

