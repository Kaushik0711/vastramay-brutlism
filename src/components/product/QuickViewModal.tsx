"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useShopping } from "@/context/ShoppingContext";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "@/components/product/PriceTag";
import { findMatchingVariant } from "@/lib/shopping";
import type { Product } from "@/types";
import {
  ShoppingBag,
  Heart,
  Plus,
  Minus,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickViewContentProps {
  product: Product;
  onClose: () => void;
}

function QuickViewContent({ product, onClose }: QuickViewContentProps) {
  const { addToCart, isInWishlist, toggleWishlist } = useShopping();

  const availableColors = Array.from(
    new Map(
      product.variants?.map((v) => [
        v.colorName,
        { name: v.colorName, hex: v.colorHex },
      ])
    ).values()
  );

  const [selectedColor, setSelectedColor] = useState<string>(
    availableColors[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const availableSizes = Array.from(
    new Set(
      product.variants
        ?.filter((v) => !selectedColor || v.colorName === selectedColor)
        .map((v) => v.size)
    )
  );

  const currentVariant = findMatchingVariant(
    product,
    selectedSize,
    selectedColor
  );

  const maxStock = currentVariant ? currentVariant.stock : 10;
  const isOutOfStock = currentVariant
    ? !currentVariant.inStock || currentVariant.stock === 0
    : false;

  const images = product.images?.length
    ? product.images
    : [
        {
          src: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
          alt: product.title,
        },
      ];

  const wishlisted = isInWishlist(product.id);

  const handleAdd = () => {
    if (!selectedSize && availableSizes.length > 0) {
      setSizeError(true);
      return;
    }

    const success = addToCart(
      {
        productId: product.id,
        variantId: currentVariant?.id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice,
        size: selectedSize || availableSizes[0] || "Standard",
        colorName: selectedColor || "Default",
        colorHex: currentVariant?.colorHex,
        imageSrc: images[0]?.src || "",
        quantity,
        maxStock,
      },
      { openDrawer: true }
    );

    if (success) {
      onClose();
    }
  };

  return (
    <>
      <ModalBody className="p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
          {/* Left Column: Image & Thumbnails */}
          <div className="sm:col-span-5 space-y-2">
            <div className="relative aspect-[3/4] w-full border-2 border-brand-ink bg-brand-cream overflow-hidden shadow-neo-sm">
              <Image
                src={images[selectedImageIndex]?.src || images[0].src}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                className="object-cover object-top"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={cn(
                      "relative w-12 h-16 border-2 border-brand-ink shrink-0 overflow-hidden cursor-pointer",
                      selectedImageIndex === idx
                        ? "border-brand-pink shadow-neo-sm"
                        : "opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={`View ${idx + 1}`}
                      fill
                      sizes="48px"
                      className="object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Variants & Controls */}
          <div className="sm:col-span-7 space-y-4">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">
                {product.gender} · {product.category}
              </span>
              <h3 className="font-display font-extrabold text-base sm:text-lg uppercase text-brand-ink leading-snug">
                {product.title}
              </h3>
              <div className="pt-1">
                <PriceTag
                  price={product.price}
                  originalPrice={product.originalPrice}
                  currency={product.currency}
                  size="md"
                />
              </div>
            </div>

            {/* Color Swatches */}
            {availableColors.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-display font-bold uppercase">
                  <span className="text-neutral-600">Color:</span>
                  <span className="text-brand-ink">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {availableColors.map((col) => {
                    const isSelected = selectedColor === col.name;
                    return (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() => setSelectedColor(col.name)}
                        className={cn(
                          "flex items-center gap-1.5 px-2.5 py-1 text-xs font-display font-bold border-2 transition-all cursor-pointer",
                          isSelected
                            ? "bg-brand-ink text-brand-white border-brand-ink shadow-neo-sm"
                            : "bg-brand-white text-brand-ink border-brand-ink hover:bg-brand-cream"
                        )}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-brand-ink"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Buttons */}
            {availableSizes.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-display font-bold uppercase">
                  <span className="text-neutral-600">Size:</span>
                  {selectedSize ? (
                    <span className="text-brand-ink bg-brand-yellow px-1 border border-brand-ink">
                      {selectedSize}
                    </span>
                  ) : (
                    <span className="text-brand-pink text-[11px]">Required</span>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {availableSizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setSelectedSize(size);
                          setSizeError(false);
                        }}
                        className={cn(
                          "py-2 border-2 border-brand-ink font-display text-xs font-extrabold uppercase transition-all cursor-pointer text-center",
                          isSelected
                            ? "bg-brand-pink text-brand-ink shadow-neo-sm translate-x-[-1px] translate-y-[-1px]"
                            : "bg-brand-white text-brand-ink hover:bg-brand-yellow"
                        )}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {sizeError && (
                  <p className="flex items-center gap-1 text-[11px] font-display font-bold text-red-600">
                    <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                    Please choose a size to proceed
                  </p>
                )}
              </div>
            )}

            {/* Quantity & Stock */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-display font-bold uppercase text-neutral-600">
                  Qty:
                </span>
                <div className="flex items-center border-2 border-brand-ink bg-brand-white shadow-neo-sm">
                  <button
                    type="button"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 hover:bg-brand-cream disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="w-3 h-3 stroke-[2.5]" />
                  </button>
                  <span className="px-3 font-mono font-bold text-xs">{quantity}</span>
                  <button
                    type="button"
                    disabled={quantity >= maxStock}
                    onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                    className="p-1 hover:bg-brand-cream disabled:opacity-30 cursor-pointer"
                  >
                    <Plus className="w-3 h-3 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              <div>
                {isOutOfStock ? (
                  <Badge variant="dark" shape="square" className="text-[10px]">
                    SOLD OUT
                  </Badge>
                ) : maxStock <= 5 ? (
                  <Badge variant="pink" shape="square" className="text-[10px]">
                    ONLY {maxStock} LEFT
                  </Badge>
                ) : (
                  <Badge variant="yellow" shape="square" className="text-[10px]">
                    IN STOCK
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </ModalBody>

      <ModalFooter className="border-t-2 border-brand-ink p-4 sm:p-5 flex gap-2">
        <Button
          variant="primary"
          size="md"
          disabled={isOutOfStock}
          onClick={handleAdd}
          className="flex-1 justify-center text-xs sm:text-sm"
          leadingIcon={<ShoppingBag className="w-4 h-4 stroke-[2.5]" />}
        >
          {isOutOfStock ? "SOLD OUT" : "ADD TO SHOPPING BAG"}
        </Button>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "p-3 border-2 border-brand-ink shadow-neo-sm transition-all cursor-pointer",
            wishlisted
              ? "bg-brand-pink text-brand-ink"
              : "bg-brand-white text-brand-ink hover:bg-brand-yellow"
          )}
        >
          <Heart className={cn("w-4 h-4 stroke-[2.5]", wishlisted && "fill-brand-ink")} />
        </button>
      </ModalFooter>
    </>
  );
}

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView } = useShopping();

  if (!quickViewProduct) return null;

  return (
    <Modal
      isOpen={Boolean(quickViewProduct)}
      onClose={closeQuickView}
      size="lg"
    >
      <ModalHeader className="border-b-2 border-brand-ink">
        <ModalTitle className="flex items-center justify-between w-full pr-6">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-sm sm:text-base uppercase tracking-tight text-brand-ink">
              QUICK EDIT SELECTOR
            </span>
          </div>
          <Link
            href={`/product/${quickViewProduct.slug}`}
            onClick={closeQuickView}
            className="flex items-center gap-1 font-display text-xs font-bold uppercase text-brand-pink hover:underline"
          >
            <span>Full Details</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </ModalTitle>
      </ModalHeader>

      {/* Remount content on product ID change to avoid cascading renders in useEffect */}
      <QuickViewContent
        key={quickViewProduct.id}
        product={quickViewProduct}
        onClose={closeQuickView}
      />
    </Modal>
  );
}
