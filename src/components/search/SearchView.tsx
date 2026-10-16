"use client";

import React, { useState, useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Search as SearchIcon, X, Sparkles, Tag } from "lucide-react";

const SUGGESTED_SEARCHES = [
  "Kurta",
  "Nehru Jacket",
  "Chanderi",
  "Overshirt",
  "Denim",
  "Festive",
  "Trousers",
  "Angrakha",
];

export function SearchView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(urlQuery);
  const [, startTransition] = useTransition();

  // Derive results directly from urlQuery without cascading renders in useEffect
  const results = useMemo(() => {
    return urlQuery.trim() ? searchProducts(urlQuery) : [];
  }, [urlQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    const params = new URLSearchParams(searchParams.toString());
    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      router.push(`/search?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setQuery("");
    startTransition(() => {
      router.push("/search");
    });
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Header & Search Bar */}
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        <div className="space-y-2">
          <Badge variant="pink" shape="square" className="text-xs">
            ARCHIVE DISCOVERY
          </Badge>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
            SEARCH VASTRAMAY
          </h1>
          <p className="font-body text-sm sm:text-base text-neutral-600">
            Search our curated catalog by garment style, handloom weave, collection edit, or specific aesthetic tags.
          </p>
        </div>

        {/* Input Bar Form */}
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <div className="relative flex items-center">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-ink">
              <SearchIcon className="w-5 h-5 stroke-[2.5]" />
            </span>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH BY SILHOUETTE, TEXTILE, OR COLOR (E.G. MANDARIN, SILK, YELLOW)..."
              className="w-full pl-12 pr-28 py-4 bg-brand-white border-3 border-brand-ink font-display text-sm sm:text-base font-bold uppercase tracking-wide text-brand-ink placeholder:text-neutral-400 placeholder:normal-case outline-none shadow-neo focus:shadow-neo-md transition-all"
            />

            <div className="absolute right-2 flex items-center gap-1.5">
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear search input"
                  className="p-2 text-neutral-500 hover:text-brand-ink transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}

              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
              >
                FIND
              </Button>
            </div>
          </div>
        </form>

        {/* Suggested keywords */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs font-mono font-bold text-neutral-500 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            POPULAR EDITS:
          </span>
          {SUGGESTED_SEARCHES.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handleSelectSuggestion(term)}
              className="px-2.5 py-1 text-xs font-display font-bold uppercase bg-brand-white border-2 border-brand-ink hover:bg-brand-yellow hover:shadow-neo-sm transition-all cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Area */}
      <div className="pt-6 border-t-2 border-brand-ink">
        {urlQuery.trim() ? (
          results.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs sm:text-sm font-bold text-neutral-600">
                  FOUND {results.length} {results.length === 1 ? "RESULT" : "RESULTS"} FOR &ldquo;{urlQuery}&rdquo;
                </span>

                <button
                  type="button"
                  onClick={handleClear}
                  className="font-display text-xs font-bold uppercase text-brand-pink hover:underline cursor-pointer"
                >
                  Clear Search
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              title={`NO RESULTS FOUND FOR "${urlQuery}"`}
              description="We couldn't locate any garments matching your exact search. Check your spelling or browse our suggested keywords above."
              action={
                <Button variant="primary" onClick={handleClear}>
                  CLEAR SEARCH & BROWSE ALL EDITS
                </Button>
              }
            />
          )
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 mx-auto bg-brand-yellow border-2 border-brand-ink shadow-neo-sm flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-brand-ink stroke-[2.2]" />
            </div>
            <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-brand-ink">
              EXPLORE OUR ARCHIVES
            </h3>
            <p className="font-body text-sm text-neutral-600 max-w-md mx-auto">
              Type keywords above or click any popular edit tag to explore our current collections.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
