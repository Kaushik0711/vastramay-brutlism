"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "./PriceTag";
import { Button } from "@/components/ui/Button";
import { Eye, Heart, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useShopping } from "@/context/ShoppingContext";

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
  isWishlisted?: boolean;
  onWishlistToggle?: (productId: string) => void;
  onQuickView?: (product: Product) => void;
  className?: string;
}

export function ProductCard({
  product,
  priority = false,
  isWishlisted: propWishlisted,
  onWishlistToggle,
  onQuickView,
  className,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const { isInWishlist, toggleWishlist, openQuickView, isHydrated } = useShopping();

  // Use centralized wishlist state when available, with prop fallback
  const isItemWishlisted = isHydrated
    ? isInWishlist(product.id)
    : propWishlisted ?? false;

  const primaryImage = product.images?.[0] || {
    src: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    alt: product.title,
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    onWishlistToggle?.(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      openQuickView(product);
    }
  };

  const isOutOfStock = product.variants && product.variants.every((v) => !v.inStock || v.stock === 0);

  return (
    <Card
      interactive
      className={cn(
        "group flex flex-col h-full bg-brand-white border-2 border-brand-ink shadow-neo hover:shadow-neo-md transition-all",
        className
      )}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-cream border-b-2 border-brand-ink">
        {!imgError ? (
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            onError={() => setImgError(true)}
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full bg-neutral-200 text-neutral-500 gap-2 p-4 text-center">
            <ImageOff className="w-8 h-8" />
            <span className="font-mono text-xs">Image unavailable</span>
          </div>
        )}

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNewArrival && (
            <Badge variant="pink" shape="square" size="sm">
              NEW DROP
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge variant="yellow" shape="square" size="sm">
              BESTSELLER
            </Badge>
          )}
          {isOutOfStock && (
            <Badge variant="dark" shape="square" size="sm">
              SOLD OUT
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          type="button"
          onClick={handleWishlist}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.12 }}
          aria-label={isItemWishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          className={cn(
            "absolute top-3 right-3 z-10 p-2 border-2 border-brand-ink shadow-neo-sm transition-colors duration-150 cursor-pointer rounded-[2px]",
            isItemWishlisted
              ? "bg-brand-pink text-brand-ink"
              : "bg-brand-white text-brand-ink hover:bg-brand-yellow"
          )}
        >
          <Heart
            className={cn("w-4 h-4 stroke-[2.2] transition-transform duration-150", isItemWishlisted && "fill-brand-ink scale-110")}
          />
        </motion.button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={handleQuickView}
            className="w-full justify-center bg-brand-white/95 backdrop-blur-sm"
            leadingIcon={<Eye className="w-4 h-4" />}
          >
            QUICK VIEW
          </Button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-4 justify-between gap-3">
        <div>
          <span className="font-display text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
            {product.gender} · {product.category}
          </span>
          <h3 className="font-display font-bold text-sm sm:text-base text-brand-ink mt-0.5 line-clamp-1 group-hover:text-brand-pink transition-colors">
            <Link href={`/product/${product.slug}`} className="hover:underline">
              {product.title}
            </Link>
          </h3>
          {product.tagline && (
            <p className="font-body text-xs text-neutral-600 line-clamp-1 mt-0.5">
              {product.tagline}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
          <PriceTag
            price={product.price}
            originalPrice={product.originalPrice}
            currency={product.currency}
            size="md"
          />

          <span className="text-[11px] font-mono font-bold text-neutral-500">
            {product.variants?.length || 0} SIZES
          </span>
        </div>
      </div>
    </Card>
  );
}
