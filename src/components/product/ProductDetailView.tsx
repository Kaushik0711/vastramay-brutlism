"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PriceTag } from "@/components/product/PriceTag";
import { ProductCard } from "@/components/product/ProductCard";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "@/components/ui/Modal";
import { Accordion } from "@/components/ui/Accordion";
import { toast } from "@/components/ui/toast";
import { useShopping } from "@/context/ShoppingContext";
import { motion, AnimatePresence } from "motion/react";
import { imageCrossFadeVariants, fadeSlideUpVariants } from "@/lib/motion";
import {
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
  Check,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Variant selection states
  const availableColors = Array.from(
    new Map(
      product.variants?.map((v) => [v.colorName, { name: v.colorName, hex: v.colorHex }])
    ).values()
  );

  const [selectedColor, setSelectedColor] = useState<string>(
    availableColors[0]?.name || ""
  );

  const availableSizes = Array.from(
    new Set(
      product.variants
        ?.filter((v) => !selectedColor || v.colorName === selectedColor)
        .map((v) => v.size)
    )
  );

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const { addToCart, isInWishlist, toggleWishlist, isHydrated } = useShopping();
  const isWishlisted = isHydrated ? isInWishlist(product.id) : false;

  // Selected variant stock resolution
  const currentVariant = product.variants?.find(
    (v) =>
      (!selectedColor || v.colorName === selectedColor) &&
      (!selectedSize || v.size === selectedSize)
  );

  const maxStock = currentVariant ? currentVariant.stock : 10;
  const isOutOfStock = currentVariant ? !currentVariant.inStock || currentVariant.stock === 0 : false;

  const images = product.images && product.images.length > 0
    ? product.images
    : [
        {
          src: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
          alt: product.title,
        },
      ];

  const handleAddToCart = () => {
    if (!selectedSize && availableSizes.length > 0) {
      setSizeError(true);
      toast.error("Please select a size", {
        description: "Choose your preferred fit (S, M, L, XL) before adding to bag.",
      });
      return;
    }

    setSizeError(false);

    addToCart(
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
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
  };

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.category, href: `/category/${product.category}` },
          { label: product.title },
        ]}
      />

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails list */}
          {images.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[580px] shrink-0 pb-2 sm:pb-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={cn(
                    "relative w-16 h-20 sm:w-20 sm:h-24 border-2 border-brand-ink bg-brand-cream overflow-hidden transition-all cursor-pointer shrink-0",
                    selectedImageIndex === idx
                      ? "border-brand-pink shadow-neo-sm translate-x-[-1px] translate-y-[-1px]"
                      : "opacity-70 hover:opacity-100 hover:border-brand-ink"
                  )}
                  aria-label={`View thumbnail ${idx + 1}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt || `${product.title} view ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Primary Main Image Frame */}
          <div className="relative flex-1 aspect-[3/4] w-full border-3 sm:border-4 border-brand-ink bg-brand-cream overflow-hidden shadow-neo-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImageIndex}
                variants={imageCrossFadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full h-full"
              >
                <Image
                  src={images[selectedImageIndex]?.src || images[0].src}
                  alt={images[selectedImageIndex]?.alt || product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.isNewArrival && (
                <Badge variant="pink" shape="square" size="md">
                  NEW DROP
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge variant="yellow" shape="square" size="md">
                  BESTSELLER
                </Badge>
              )}
              {product.collection && (
                <Badge variant="dark" shape="square" size="sm">
                  {product.collection}
                </Badge>
              )}
            </div>

            {/* Floating Wishlist Button */}
            <button
              type="button"
              onClick={handleToggleWishlist}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={cn(
                "absolute top-4 right-4 z-10 p-3 border-2 border-brand-ink shadow-neo transition-all cursor-pointer",
                isWishlisted
                  ? "bg-brand-pink text-brand-ink"
                  : "bg-brand-white text-brand-ink hover:bg-brand-yellow"
              )}
            >
              <Heart
                className={cn(
                  "w-5 h-5 stroke-[2.2]",
                  isWishlisted && "fill-brand-ink"
                )}
              />
            </button>
          </div>
        </div>

        {/* Right: Product Details & Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 pb-5 border-b-2 border-brand-ink">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase font-extrabold text-neutral-500 tracking-wider">
                {product.gender} · {product.category}
              </span>
              {product.rating && (
                <span className="flex items-center gap-1 text-xs font-mono font-bold bg-brand-yellow px-1.5 py-0.5 border border-brand-ink">
                  <Star className="w-3.5 h-3.5 fill-brand-ink text-brand-ink" />
                  {product.rating} ({product.reviewsCount} demo reviews)
                </span>
              )}
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-brand-ink leading-tight">
              {product.title}
            </h1>

            {product.tagline && (
              <p className="font-editorial italic text-base sm:text-lg text-neutral-700">
                {product.tagline}
              </p>
            )}

            <div className="pt-2">
              <PriceTag
                price={product.price}
                originalPrice={product.originalPrice}
                currency={product.currency}
                size="lg"
              />
            </div>
          </div>

          {/* Description */}
          <div className="font-body text-sm sm:text-base text-neutral-700 leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Color Selection */}
          {availableColors.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between items-center text-xs font-display font-bold uppercase">
                <span className="text-neutral-600">Selected Color:</span>
                <span className="text-brand-ink font-extrabold">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {availableColors.map((col) => {
                  const isSelected = selectedColor === col.name;
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => setSelectedColor(col.name)}
                      title={col.name}
                      className={cn(
                        "relative flex items-center gap-2 px-3 py-1.5 border-2 border-brand-ink text-xs font-display font-bold transition-all cursor-pointer",
                        isSelected
                          ? "bg-brand-ink text-brand-white shadow-neo-sm translate-x-[-1px] translate-y-[-1px]"
                          : "bg-brand-white text-brand-ink hover:bg-brand-cream"
                      )}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-brand-ink shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {availableSizes.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-display font-bold uppercase text-neutral-600">
                    Select Size:
                  </span>
                  {selectedSize && (
                    <span className="text-xs font-display font-extrabold text-brand-ink bg-brand-yellow px-1.5 py-0.2 border border-brand-ink">
                      {selectedSize}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-xs font-display font-bold uppercase text-brand-pink hover:underline cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5 stroke-[2.5]" />
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
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
                        "py-3 border-2 border-brand-ink font-display text-sm font-extrabold uppercase transition-all cursor-pointer text-center",
                        isSelected
                          ? "bg-brand-pink text-brand-ink shadow-neo translate-x-[-2px] translate-y-[-2px]"
                          : "bg-brand-white text-brand-ink hover:bg-brand-yellow hover:translate-x-[-1px] hover:translate-y-[-1px]"
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {sizeError && (
                  <motion.p
                    variants={fadeSlideUpVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-center gap-1.5 text-xs font-display font-bold text-red-600 pt-1"
                  >
                    <AlertCircle className="w-4 h-4 stroke-[2.5]" />
                    Please select a size to continue
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Quantity & Stock Status */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-display font-bold uppercase text-neutral-600">
                Quantity:
              </span>
              <div className="flex items-center border-2 border-brand-ink bg-brand-white shadow-neo-sm">
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-brand-cream disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <span className="px-4 font-mono font-bold text-sm text-brand-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={quantity >= maxStock}
                  onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                  className="p-2 hover:bg-brand-cream disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Stock indicator badge */}
            <div>
              {isOutOfStock ? (
                <Badge variant="dark" shape="square">
                  SOLD OUT
                </Badge>
              ) : maxStock <= 5 ? (
                <Badge variant="pink" shape="square">
                  ONLY {maxStock} LEFT IN STOCK
                </Badge>
              ) : (
                <Badge variant="yellow" shape="square">
                  READY TO DISPATCH
                </Badge>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 space-y-3">
            <Button
              variant="primary"
              size="lg"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className="w-full justify-center text-sm sm:text-base py-4"
              leadingIcon={<ShoppingBag className="w-5 h-5 stroke-[2.5]" />}
            >
              {isOutOfStock ? "CURRENTLY UNAVAILABLE" : "ADD TO SHOPPING BAG"}
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={handleToggleWishlist}
              className="w-full justify-center"
              leadingIcon={<Heart className={cn("w-4 h-4 stroke-[2.5]", isWishlisted && "fill-brand-pink text-brand-pink")} />}
            >
              {isWishlisted ? "REMOVE FROM WISHLIST" : "SAVE TO WISHLIST"}
            </Button>
          </div>

          {/* Trust Guarantees */}
          <div className="p-4 border-2 border-brand-ink bg-brand-cream space-y-2 font-mono text-xs text-neutral-800">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-ink stroke-[2.5]" />
              <span>Complimentary express delivery on orders over ₹1,999</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-brand-ink stroke-[2.5]" />
              <span>7-day doorstep exchange and reverse pickup across India</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-ink stroke-[2.5]" />
              <span>Zero-synthetic genuine handloom cotton & silk textiles</span>
            </div>
          </div>

          {/* Accordion: Craft, Care, Shipping */}
          <div className="pt-4 border-t-2 border-brand-ink">
            <Accordion
              type="single"
              defaultExpanded={["craft"]}
              items={[
                {
                  id: "craft",
                  title: "FABRIC & ARTISANAL CRAFT",
                  content: (
                    <div className="space-y-2">
                      <p>
                        <strong>Material:</strong> {product.fabric || "100% Heritage Handloom Cotton"}
                      </p>
                      <p>
                        Woven on traditional shuttle looms in artisanal weaving clusters. Each garment exhibits minor organic variations in slub texture and weave density, celebrating authentic handmade character.
                      </p>
                    </div>
                  ),
                },
                {
                  id: "care",
                  title: "WASH & MAINTENANCE",
                  content: (
                    <ul className="list-disc list-inside space-y-1">
                      {product.careInstructions?.map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      )) || (
                        <>
                          <li>Dry clean recommended for first wash</li>
                          <li>Cold machine wash on gentle cycle</li>
                          <li>Warm iron on reverse side</li>
                        </>
                      )}
                    </ul>
                  ),
                },
                {
                  id: "shipping",
                  title: "PAN-INDIA SHIPPING & RETURNS",
                  content: (
                    <div className="space-y-2">
                      <p>
                        Orders placed before 2 PM IST are dispatched on the same day via express air couriers. Metropolitan delivery takes 2 to 3 business days; rest of India within 4 to 6 business days.
                      </p>
                      <p>
                        We offer a 7-day doorstep replacement or size exchange policy. Reverse courier pickups are arranged directly from your shipping address.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Related Garments Section */}
      {relatedProducts.length > 0 && (
        <section className="w-full pt-12 border-t-3 sm:border-t-4 border-brand-ink space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-pink">
                STYLE WITH IT
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-brand-ink">
                RELATED ARCHIVE PIECES
              </h2>
            </div>
            <Link href="/shop">
              <Button variant="outline" size="sm">
                VIEW ALL GARMENTS
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      <Modal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        size="lg"
      >
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            <Ruler className="w-5 h-5 stroke-[2.5]" />
            VASTRAMAY GARMENT MEASUREMENT GUIDE
          </ModalTitle>
        </ModalHeader>

        <ModalBody className="space-y-4">
          <p className="text-xs sm:text-sm text-neutral-600 font-body">
            All measurements are provided in inches and correspond to standard body measurements. Our silhouettes feature architectural, relaxed draping with deliberate ease.
          </p>

          <div className="overflow-x-auto border-2 border-brand-ink">
            <table className="w-full text-left font-display text-xs uppercase border-collapse">
              <thead>
                <tr className="bg-brand-yellow border-b-2 border-brand-ink text-brand-ink">
                  <th className="p-3 border-r-2 border-brand-ink">SIZE</th>
                  <th className="p-3 border-r-2 border-brand-ink">CHEST (IN)</th>
                  <th className="p-3 border-r-2 border-brand-ink">WAIST (IN)</th>
                  <th className="p-3 border-r-2 border-brand-ink">SHOULDER (IN)</th>
                  <th className="p-3">LENGTH (IN)</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-brand-ink bg-brand-white">
                <tr>
                  <td className="p-3 font-extrabold border-r-2 border-brand-ink bg-neutral-50">S</td>
                  <td className="p-3 border-r-2 border-brand-ink">38 - 40</td>
                  <td className="p-3 border-r-2 border-brand-ink">30 - 32</td>
                  <td className="p-3 border-r-2 border-brand-ink">17.5</td>
                  <td className="p-3">40</td>
                </tr>
                <tr>
                  <td className="p-3 font-extrabold border-r-2 border-brand-ink bg-neutral-50">M</td>
                  <td className="p-3 border-r-2 border-brand-ink">41 - 43</td>
                  <td className="p-3 border-r-2 border-brand-ink">33 - 35</td>
                  <td className="p-3 border-r-2 border-brand-ink">18.5</td>
                  <td className="p-3">41</td>
                </tr>
                <tr>
                  <td className="p-3 font-extrabold border-r-2 border-brand-ink bg-neutral-50">L</td>
                  <td className="p-3 border-r-2 border-brand-ink">44 - 46</td>
                  <td className="p-3 border-r-2 border-brand-ink">36 - 38</td>
                  <td className="p-3 border-r-2 border-brand-ink">19.5</td>
                  <td className="p-3">42</td>
                </tr>
                <tr>
                  <td className="p-3 font-extrabold border-r-2 border-brand-ink bg-neutral-50">XL</td>
                  <td className="p-3 border-r-2 border-brand-ink">47 - 49</td>
                  <td className="p-3 border-r-2 border-brand-ink">39 - 41</td>
                  <td className="p-3 border-r-2 border-brand-ink">20.5</td>
                  <td className="p-3">43</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-brand-cream border-2 border-brand-ink text-xs font-mono text-neutral-800">
            <strong>Pro Tip:</strong> For an oversized, runway neo-brutalist fit, select one size up from your regular measurement.
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="primary"
            onClick={() => setIsSizeGuideOpen(false)}
            className="w-full justify-center"
          >
            GOT IT, CLOSE GUIDE
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
