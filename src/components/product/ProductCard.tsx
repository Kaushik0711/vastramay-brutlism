import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "./PriceTag";
import { Button } from "@/components/ui/Button";
import { Eye } from "lucide-react";

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const primaryImage = product.images[0] || {
    src: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    alt: product.title,
  };

  return (
    <Card
      interactive
      className="group flex flex-col h-full bg-brand-white border-2 border-brand-ink shadow-neo hover:shadow-neo-md transition-all"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-cream border-b-2 border-brand-ink">
        <Image
          src={primaryImage.src}
          alt={primaryImage.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <Badge variant="pink" shape="square">
              NEW DROP
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge variant="yellow" shape="square">
              BESTSELLER
            </Badge>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-center bg-brand-white/95 backdrop-blur-sm"
            leftIcon={<Eye className="w-4 h-4" />}
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
            {product.variants.length} SIZES
          </span>
        </div>
      </div>
    </Card>
  );
}
