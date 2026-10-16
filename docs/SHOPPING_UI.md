# Vastramay — Shopping UI & Component Interaction Guide

This guide details the specialized shopping components, interactive state handling, responsive viewports, and design patterns implemented in Phase 3.

## 1. Component Overview

| Component | Path | Description |
| :--- | :--- | :--- |
| `ProductCatalog` | `src/components/shop/ProductCatalog.tsx` | Reusable faceted catalog supporting desktop sidebar, mobile filter drawer, sort selection, URL synchronization, and pagination. |
| `CatalogSkeleton` | `src/components/shop/CatalogSkeleton.tsx` | Suspense boundary fallback skeleton matching the neo-brutalist grid layout. |
| `ProductDetailView` | `src/components/product/ProductDetailView.tsx` | Product detail page experience: image thumbnail switcher, size selector with validation, color swatches, size guide modal, stock indicator, and accordions. |
| `SearchView` | `src/components/search/SearchView.tsx` | Search interface with immediate keyword suggestions, live query execution, and URL state retention. |
| `HomeNewsletter` | `src/components/home/HomeNewsletter.tsx` | Early-drop newsletter signup with email format validation and demo toast feedback. |
| `ProductCard` | `src/components/product/ProductCard.tsx` | Neo-brutalist product card with hover quick-view, image error fallback, badge overlays, and wishlist toggle. |
| `PriceTag` | `src/components/product/PriceTag.tsx` | Currency price tag displaying current price, original price, and percentage discount pill. |
| `CategoryNav` | `src/components/shop/CategoryNav.tsx` | Horizontal category scrolling pill bar linking to `/category/[slug]`. |

---

## 2. Faceted Filter & Sorting Engine (`ProductCatalog`)

The `ProductCatalog` component centralizes customer filtering and sorting:
- **Category Filter**: When unlocked, lists all 12 categories with dynamic item counts.
- **Gender / Division**: Filter by Men or Women while including gender-neutral unisex pieces.
- **Size Selector**: Multi-choice buttons (S, M, L, XL, XXL, FREE).
- **Color Swatches**: Color pills displaying hex swatches and names.
- **Price Slider**: Range slider from ₹1,000 to ₹6,000+.
- **Toggles**: "In Stock Only" and "On Sale Only" checkboxes.
- **Sorting**: Options for Featured, Newest First, Price (Low to High), Price (High to Low), and Top Customer Rated.
- **URL Synchronization**: Active filters, sorting, and page number update query parameters (`?category=...&size=...&sort=...&page=...`) using `useTransition` and `router.replace` without page reload, making filtered results shareable.
- **Mobile Filter Drawer**: On screens smaller than 1024px (`lg`), the sidebar converts into a slide-over `Drawer` opened by a prominent button.

---

## 3. Product Detail Experience (`ProductDetailView`)

- **Interactive Gallery**: Supports multi-angle product photography with clickable thumbnail buttons and keyboard navigation.
- **Size Selector Validation**: If a customer attempts to click "ADD TO SHOPPING BAG" without picking a size, a warning toast and inline error message appear.
- **Stock Indicator**: Dynamically calculates variant availability. Items with `<= 5` units display a high-urgency `"ONLY X LEFT IN STOCK"` badge.
- **Size Guide Modal**: Launches an accessible `Modal` containing a comprehensive garment measurement table (Chest, Waist, Shoulder, Length) and neo-brutalist fit styling advice.
- **Accordion Specifications**: Three collapsible panels provide in-depth information on Fabric & Artisanal Craft, Wash & Maintenance, and Pan-India Shipping & Doorstep Exchanges.

---

## 4. Search Experience (`SearchView`)

- **Live Query Execution**: Queries the local catalog without backend server roundtrips.
- **Curated Edit Chips**: Clickable suggestion buttons for high-intent searches ("Kurta", "Nehru Jacket", "Chanderi", "Denim", etc.).
- **URL Query Sync**: Query values persist in `?q=` parameter, allowing users to bookmark or share search results.
- **Empty & No-Result States**: Dedicated empty states with one-click clear actions.

---

## 5. Responsive Design Checklist

- **Mobile (320px – 430px)**:
  - Header collapses to hamburger drawer menu.
  - Category horizontal overflow navigation allows touch scrolling.
  - Product grids stack to 1 column on extra small screens or 2 columns on small tablets.
  - Filters collapse into the slide-over `Drawer`.
  - Image galleries place thumbnails below main imagery for easy thumb tapping.
- **Tablet (768px – 1023px)**:
  - 2-column product grids.
  - Split banner layouts retain high-voltage typography and overlaid previews.
- **Desktop (1024px+)**:
  - 3-column catalog grid with persistent left-hand sticky filter sidebar.
  - Full desktop horizontal navigation with hover states.
  - Split 7:5 ratio for product imagery and detail controls.
