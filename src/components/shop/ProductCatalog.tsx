"use client";

import React, { useState, useMemo, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Product, ClothingGender } from "@/types";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/Drawer";
import { SlidersHorizontal, X, RotateCcw, Filter } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

export interface ProductCatalogProps {
  initialProducts: Product[];
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  lockedCategory?: string;
  lockedGender?: ClothingGender;
  badge?: string;
}

const ITEMS_PER_PAGE = 6;

const SIZES = ["S", "M", "L", "XL", "XXL", "FREE"];
const COLORS = [
  { name: "Cobalt Blue", hex: "#4867F5" },
  { name: "Electric Yellow", hex: "#FFE14A" },
  { name: "Hot Pink", hex: "#FF5C8A" },
  { name: "Ink Black", hex: "#171717" },
  { name: "Ivory Cream", hex: "#F7F1E5" },
  { name: "Raw Indigo", hex: "#1B3B6F" },
  { name: "Sage Olive", hex: "#556B2F" },
];

export function ProductCatalog({
  initialProducts,
  title,
  description,
  breadcrumbs,
  lockedCategory,
  lockedGender,
  badge,
}: ProductCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Mobile Filter Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter States initialized from URL search params
  const [selectedCategory, setSelectedCategory] = useState<string>(
    lockedCategory || searchParams.get("category") || ""
  );
  const [selectedGender, setSelectedGender] = useState<string>(
    lockedGender || searchParams.get("gender") || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    searchParams.get("size") || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    searchParams.get("color") || ""
  );
  const [inStockOnly, setInStockOnly] = useState<boolean>(
    searchParams.get("inStock") === "true"
  );
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(
    searchParams.get("onSale") === "true"
  );
  const [priceMax, setPriceMax] = useState<number>(
    searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 6000
  );
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sort") || "featured"
  );
  const [currentPage, setCurrentPage] = useState<number>(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1
  );

  // Synchronize state with URL query parameters
  const updateURLParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Locked or selected category
      const targetCat = lockedCategory || selectedCategory;
      if (targetCat && product.category !== targetCat) {
        return false;
      }

      // Locked or selected gender
      const targetGen = lockedGender || selectedGender;
      if (
        targetGen &&
        product.gender !== targetGen &&
        product.gender !== "unisex"
      ) {
        return false;
      }

      // Size filter
      if (selectedSize) {
        const hasSize = product.variants?.some((v) => v.size === selectedSize);
        if (!hasSize) return false;
      }

      // Color filter
      if (selectedColor) {
        const hasColor = product.variants?.some(
          (v) => v.colorName.toLowerCase() === selectedColor.toLowerCase()
        );
        if (!hasColor) return false;
      }

      // Stock filter
      if (inStockOnly) {
        const hasStock = product.variants?.some((v) => v.inStock && v.stock > 0);
        if (!hasStock) return false;
      }

      // Sale status filter
      if (onSaleOnly) {
        const isOnSale =
          product.originalPrice && product.originalPrice > product.price;
        if (!isOnSale) return false;
      }

      // Price filter
      if (product.price > priceMax) {
        return false;
      }

      return true;
    });
  }, [
    initialProducts,
    lockedCategory,
    selectedCategory,
    lockedGender,
    selectedGender,
    selectedSize,
    selectedColor,
    inStockOnly,
    onSaleOnly,
    priceMax,
  ]);

  // Sort computation
  const sortedProducts = useMemo(() => {
    const prods = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return prods.sort((a, b) => a.price - b.price);
      case "price-desc":
        return prods.sort((a, b) => b.price - a.price);
      case "newest":
        return prods.sort(
          (a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0)
        );
      case "rating":
        return prods.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "featured":
      default:
        return prods.sort(
          (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        );
    }
  }, [filteredProducts, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  // Filter setters with URL updates
  const handleCategoryChange = (cat: string) => {
    const newVal = selectedCategory === cat ? "" : cat;
    setSelectedCategory(newVal);
    setCurrentPage(1);
    updateURLParams({ category: newVal || null, page: "1" });
  };

  const handleGenderChange = (gen: string) => {
    const newVal = selectedGender === gen ? "" : gen;
    setSelectedGender(newVal);
    setCurrentPage(1);
    updateURLParams({ gender: newVal || null, page: "1" });
  };

  const handleSizeChange = (size: string) => {
    const newVal = selectedSize === size ? "" : size;
    setSelectedSize(newVal);
    setCurrentPage(1);
    updateURLParams({ size: newVal || null, page: "1" });
  };

  const handleColorChange = (color: string) => {
    const newVal = selectedColor === color ? "" : color;
    setSelectedColor(newVal);
    setCurrentPage(1);
    updateURLParams({ color: newVal || null, page: "1" });
  };

  const handleInStockToggle = () => {
    const newVal = !inStockOnly;
    setInStockOnly(newVal);
    setCurrentPage(1);
    updateURLParams({ inStock: newVal ? "true" : null, page: "1" });
  };

  const handleOnSaleToggle = () => {
    const newVal = !onSaleOnly;
    setOnSaleOnly(newVal);
    setCurrentPage(1);
    updateURLParams({ onSale: newVal ? "true" : null, page: "1" });
  };

  const handlePriceChange = (val: number) => {
    setPriceMax(val);
    setCurrentPage(1);
    updateURLParams({ maxPrice: val < 6000 ? val.toString() : null, page: "1" });
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
    updateURLParams({ sort: newSort, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateURLParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearAll = () => {
    if (!lockedCategory) setSelectedCategory("");
    if (!lockedGender) setSelectedGender("");
    setSelectedSize("");
    setSelectedColor("");
    setInStockOnly(false);
    setOnSaleOnly(false);
    setPriceMax(6000);
    setSortBy("featured");
    setCurrentPage(1);
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(
    (!lockedCategory && selectedCategory) ||
      (!lockedGender && selectedGender) ||
      selectedSize ||
      selectedColor ||
      inStockOnly ||
      onSaleOnly ||
      priceMax < 6000
  );

  // Render Filter Form (shared between Desktop Sidebar and Mobile Drawer)
  const renderFilterControls = () => (
    <div className="space-y-6">
      {/* Category Filter (if not locked) */}
      {!lockedCategory && (
        <div className="space-y-2.5 pb-5 border-b-2 border-brand-ink">
          <span className="font-display text-xs font-bold uppercase tracking-wider text-neutral-600 block">
            Garment Category
          </span>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => {
              const active = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={cn(
                    "flex items-center justify-between px-2.5 py-1.5 text-xs font-display font-bold uppercase transition-all text-left border-2",
                    active
                      ? "bg-brand-pink text-brand-ink border-brand-ink shadow-neo-sm translate-x-[-1px] translate-y-[-1px]"
                      : "bg-brand-white text-brand-ink border-transparent hover:border-brand-ink"
                  )}
                >
                  <span>{cat.name}</span>
                  <span className="font-mono text-[10px] text-neutral-500">
                    ({cat.itemCount})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Gender Filter (if not locked) */}
      {!lockedGender && (
        <div className="space-y-2.5 pb-5 border-b-2 border-brand-ink">
          <span className="font-display text-xs font-bold uppercase tracking-wider text-neutral-600 block">
            Collection Division
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Men", value: "men" },
              { label: "Women", value: "women" },
            ].map((g) => {
              const active = selectedGender === g.value;
              return (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => handleGenderChange(g.value)}
                  className={cn(
                    "py-1.5 px-3 text-xs font-display font-bold uppercase border-2 text-center transition-all",
                    active
                      ? "bg-brand-yellow text-brand-ink border-brand-ink shadow-neo-sm"
                      : "bg-brand-white text-brand-ink border-brand-ink hover:bg-brand-cream"
                  )}
                >
                  {g.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Filter */}
      <div className="space-y-2.5 pb-5 border-b-2 border-brand-ink">
        <span className="font-display text-xs font-bold uppercase tracking-wider text-neutral-600 block">
          Select Size
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {SIZES.map((size) => {
            const active = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeChange(size)}
                className={cn(
                  "py-2 font-display text-xs font-bold uppercase border-2 text-center transition-all cursor-pointer",
                  active
                    ? "bg-brand-pink text-brand-ink border-brand-ink shadow-neo-sm"
                    : "bg-brand-white text-brand-ink border-brand-ink hover:bg-brand-yellow"
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="space-y-2.5 pb-5 border-b-2 border-brand-ink">
        <span className="font-display text-xs font-bold uppercase tracking-wider text-neutral-600 block">
          Color Palette
        </span>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((col) => {
            const active =
              selectedColor.toLowerCase() === col.name.toLowerCase();
            return (
              <button
                key={col.name}
                type="button"
                onClick={() => handleColorChange(col.name)}
                title={col.name}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-display font-bold border-2 transition-all cursor-pointer",
                  active
                    ? "bg-brand-ink text-brand-white border-brand-ink shadow-neo-sm"
                    : "bg-brand-white text-brand-ink border-brand-ink hover:bg-brand-cream"
                )}
              >
                <span
                  className="w-3 h-3 rounded-full border border-brand-ink shrink-0"
                  style={{ backgroundColor: col.hex }}
                />
                <span>{col.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Slider */}
      <div className="space-y-2.5 pb-5 border-b-2 border-brand-ink">
        <div className="flex justify-between items-center text-xs font-display font-bold uppercase">
          <span className="text-neutral-600">Max Price</span>
          <span className="text-brand-ink bg-brand-yellow px-1.5 py-0.5 border border-brand-ink">
            {formatCurrency(priceMax)}
          </span>
        </div>
        <input
          type="range"
          min={1000}
          max={6000}
          step={200}
          value={priceMax}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full accent-brand-pink cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-neutral-500">
          <span>₹1,000</span>
          <span>₹6,000+</span>
        </div>
      </div>

      {/* Toggles: In Stock & On Sale */}
      <div className="space-y-2.5">
        <label className="flex items-center gap-2.5 p-2 bg-brand-white border-2 border-brand-ink cursor-pointer hover:bg-brand-cream">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={handleInStockToggle}
            className="w-4 h-4 accent-brand-ink rounded cursor-pointer"
          />
          <span className="font-display text-xs font-bold uppercase tracking-wider text-brand-ink">
            In Stock Items Only
          </span>
        </label>

        <label className="flex items-center gap-2.5 p-2 bg-brand-white border-2 border-brand-ink cursor-pointer hover:bg-brand-cream">
          <input
            type="checkbox"
            checked={onSaleOnly}
            onChange={handleOnSaleToggle}
            className="w-4 h-4 accent-brand-pink rounded cursor-pointer"
          />
          <span className="font-display text-xs font-bold uppercase tracking-wider text-brand-ink">
            Discounted / On Sale
          </span>
        </label>
      </div>

      {/* Reset Filter Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearAll}
          className="w-full justify-center"
          leadingIcon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          CLEAR ALL FILTERS
        </Button>
      )}
    </div>
  );

  return (
    <div className="w-full space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="space-y-3 pb-6 border-b-2 border-brand-ink">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-2" />}

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-brand-ink">
                {title}
              </h1>
              {badge && (
                <Badge variant="pink" shape="square" className="text-xs">
                  {badge}
                </Badge>
              )}
            </div>
            {description && (
              <p className="font-body text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden"
              leadingIcon={<Filter className="w-4 h-4 stroke-[2.5]" />}
            >
              FILTERS
              {hasActiveFilters && (
                <span className="ml-1 px-1.5 py-0.2 bg-brand-pink text-brand-ink text-[10px] font-bold border border-brand-ink">
                  !
                </span>
              )}
            </Button>

            {/* Sorting Dropdown */}
            <div className="w-44 sm:w-52">
              <Select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                options={[
                  { label: "SORT: FEATURED", value: "featured" },
                  { label: "SORT: NEWEST FIRST", value: "newest" },
                  { label: "PRICE: LOW TO HIGH", value: "price-asc" },
                  { label: "PRICE: HIGH TO LOW", value: "price-desc" },
                  { label: "TOP CUSTOMER RATED", value: "rating" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-neutral-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? "STYLE" : "STYLES"} FOUND
            </span>

            {/* Selected Filter Chips */}
            {selectedCategory && !lockedCategory && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-yellow text-brand-ink border-2 border-brand-ink font-display text-xs font-bold uppercase shadow-neo-sm">
                Category: {selectedCategory}
                <button
                  type="button"
                  onClick={() => handleCategoryChange(selectedCategory)}
                  aria-label="Remove category filter"
                  className="hover:text-brand-pink cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </span>
            )}

            {selectedGender && !lockedGender && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-yellow text-brand-ink border-2 border-brand-ink font-display text-xs font-bold uppercase shadow-neo-sm">
                Division: {selectedGender}
                <button
                  type="button"
                  onClick={() => handleGenderChange(selectedGender)}
                  aria-label="Remove gender filter"
                  className="hover:text-brand-pink cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </span>
            )}

            {selectedSize && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-yellow text-brand-ink border-2 border-brand-ink font-display text-xs font-bold uppercase shadow-neo-sm">
                Size: {selectedSize}
                <button
                  type="button"
                  onClick={() => handleSizeChange(selectedSize)}
                  aria-label="Remove size filter"
                  className="hover:text-brand-pink cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </span>
            )}

            {selectedColor && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-yellow text-brand-ink border-2 border-brand-ink font-display text-xs font-bold uppercase shadow-neo-sm">
                Color: {selectedColor}
                <button
                  type="button"
                  onClick={() => handleColorChange(selectedColor)}
                  aria-label="Remove color filter"
                  className="hover:text-brand-pink cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-yellow text-brand-ink border-2 border-brand-ink font-display text-xs font-bold uppercase shadow-neo-sm">
                In Stock Only
                <button
                  type="button"
                  onClick={handleInStockToggle}
                  aria-label="Remove in-stock filter"
                  className="hover:text-brand-pink cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </span>
            )}

            {onSaleOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-yellow text-brand-ink border-2 border-brand-ink font-display text-xs font-bold uppercase shadow-neo-sm">
                On Sale
                <button
                  type="button"
                  onClick={handleOnSaleToggle}
                  aria-label="Remove sale filter"
                  className="hover:text-brand-pink cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </span>
            )}

            {priceMax < 6000 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-yellow text-brand-ink border-2 border-brand-ink font-display text-xs font-bold uppercase shadow-neo-sm">
                Max ₹{priceMax}
                <button
                  type="button"
                  onClick={() => handlePriceChange(6000)}
                  aria-label="Remove max price filter"
                  className="hover:text-brand-pink cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearAll}
              className="font-display text-xs font-bold uppercase text-brand-pink hover:underline tracking-wider cursor-pointer"
            >
              Clear All ({[
                !lockedCategory && selectedCategory,
                !lockedGender && selectedGender,
                selectedSize,
                selectedColor,
                inStockOnly,
                onSaleOnly,
                priceMax < 6000,
              ].filter(Boolean).length})
            </button>
          )}
        </div>
      </div>

      {/* Main Catalog Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-28 bg-brand-cream border-3 border-brand-ink p-5 shadow-neo">
          <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-brand-ink">
            <h2 className="font-display font-extrabold text-sm uppercase tracking-wider text-brand-ink flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 stroke-[2.5]" />
              FILTERS
            </h2>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs font-display font-bold text-neutral-500 hover:text-brand-pink uppercase cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {renderFilterControls()}
        </aside>

        {/* Product Grid & Pagination Area */}
        <div className="lg:col-span-9 space-y-8">
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pt-8 border-t-2 border-brand-ink flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyState
              title="NO GARMENTS MATCH THIS SELECTION"
              description="Try relaxing your filters, widening your price range, or clearing size selections to view other garments in our catalog."
              action={
                <Button variant="primary" onClick={handleClearAll}>
                  RESET ALL ACTIVE FILTERS
                </Button>
              }
            />
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        placement="right"
      >
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 stroke-[2.5]" />
            FILTER EDITS
          </DrawerTitle>
        </DrawerHeader>

        <DrawerBody>{renderFilterControls()}</DrawerBody>

        <DrawerFooter>
          <Button
            variant="primary"
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-full justify-center"
          >
            VIEW {filteredProducts.length} PRODUCTS
          </Button>
        </DrawerFooter>
      </Drawer>
    </div>
  );
}
