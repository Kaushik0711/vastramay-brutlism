"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { PriceTag } from "@/components/product/PriceTag";
import { useShopping } from "@/context/ShoppingContext";
import { getProductById } from "@/lib/products";
import type { Product } from "@/types";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const {
    wishlist,
    wishlistCount,
    removeFromWishlist,
    clearWishlist,
    openQuickView,
    isHydrated,
  } = useShopping();

  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  // Resolve product objects from wishlist IDs
  const wishlistProducts = useMemo(() => {
    return wishlist
      .map((id) => getProductById(id))
      .filter((p): p is Product => Boolean(p));
  }, [wishlist]);

  const handleMoveToBag = (product: Product) => {
    // Open variant selection modal so customer explicitly chooses size/color
    openQuickView(product);
  };

  return (
    <div className="w-full py-8 sm:py-12">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 sm:border-b-3 border-brand-ink">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-brand-pink fill-brand-pink" />
                <Badge variant="pink" shape="square" className="text-xs">
                  SAVED EDITS
                </Badge>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
                YOUR WISHLIST
              </h1>
              <p className="font-body text-sm text-neutral-600">
                Garments you&apos;ve curated for future drops. Synchronized across your browser sessions.
              </p>
            </div>

            {isHydrated && wishlistProducts.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-neutral-500">
                  {wishlistCount} {wishlistCount === 1 ? "PIECE" : "PIECES"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsClearConfirmOpen(true)}
                  leadingIcon={<Trash2 className="w-3.5 h-3.5" />}
                >
                  CLEAR WISHLIST
                </Button>
              </div>
            )}
          </div>

          {/* Items Grid or Empty State */}
          {isHydrated && wishlistProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col border-2 sm:border-3 border-brand-ink bg-brand-white shadow-neo hover:shadow-neo-md transition-all group"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[3/4] w-full border-b-2 border-brand-ink bg-brand-cream overflow-hidden">
                    <Image
                      src={
                        item.images?.[0]?.src ||
                        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Delete icon */}
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(item.id)}
                      aria-label={`Remove ${item.title} from wishlist`}
                      className="absolute top-3 right-3 p-2 bg-brand-white border-2 border-brand-ink shadow-neo-sm hover:bg-brand-pink text-brand-ink transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-4 flex flex-col justify-between flex-1 gap-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">
                        {item.gender} · {item.category}
                      </span>
                      <h3 className="font-display font-bold text-base uppercase text-brand-ink line-clamp-1 group-hover:text-brand-pink transition-colors">
                        <Link href={`/product/${item.slug}`} className="hover:underline">
                          {item.title}
                        </Link>
                      </h3>
                      <PriceTag
                        price={item.price}
                        originalPrice={item.originalPrice}
                        currency={item.currency}
                        size="md"
                      />
                    </div>

                    <div className="pt-2 border-t border-neutral-200 flex items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleMoveToBag(item)}
                        className="flex-1 justify-center text-xs"
                        leadingIcon={<ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />}
                      >
                        SELECT & MOVE TO BAG
                      </Button>
                      <Link href={`/product/${item.slug}`}>
                        <Button variant="outline" size="sm" className="text-xs">
                          VIEW
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Heart className="w-8 h-8 text-brand-ink stroke-[2.2]" />}
              title="YOUR WISHLIST IS CURRENTLY EMPTY"
              description="Explore our latest architectural drops and curate your favorite silhouettes for when you're ready to wear the attitude."
              action={
                <Link href="/shop">
                  <Button
                    variant="primary"
                    rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                  >
                    EXPLORE NEW DROPS
                  </Button>
                </Link>
              }
            />
          )}
        </div>
      </Container>

      {/* Clear Wishlist Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isClearConfirmOpen}
        onClose={() => setIsClearConfirmOpen(false)}
        onConfirm={() => {
          clearWishlist();
          setIsClearConfirmOpen(false);
        }}
        title="CLEAR YOUR ENTIRE WISHLIST?"
        description="Are you sure you want to remove all saved garments from your wishlist? This cannot be undone."
        confirmLabel="YES, CLEAR WISHLIST"
        cancelLabel="KEEP ITEMS"
        isDestructive={true}
      />
    </div>
  );
}
