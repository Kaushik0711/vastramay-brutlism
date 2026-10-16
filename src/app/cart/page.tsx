"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useShopping } from "@/context/ShoppingContext";
import { formatCurrency } from "@/lib/utils";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  CheckCircle2,
  X,
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
    cartCount,
    subtotal,
    appliedCoupon,
    discountAmount,
    shippingEstimate,
    amountToFreeShipping,
    freeShippingThreshold,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    isHydrated,
  } = useShopping();

  const [promoInput, setPromoInput] = useState("");
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    if (res.success) {
      setPromoInput("");
    }
  };

  return (
    <div className="w-full py-8 sm:py-12">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 sm:border-b-3 border-brand-ink">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-ink" />
                <Badge variant="yellow" shape="square" className="text-xs">
                  ORDER STAGING
                </Badge>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
                YOUR SHOPPING BAG
              </h1>
              <p className="font-body text-sm text-neutral-600">
                Review your bespoke garment selections before advancing to dispatch.
              </p>
            </div>

            {isHydrated && cart.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-neutral-500">
                  {cartCount} {cartCount === 1 ? "PIECE" : "PIECES"} IN BAG
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsClearConfirmOpen(true)}
                  leadingIcon={<Trash2 className="w-3.5 h-3.5" />}
                >
                  CLEAR BAG
                </Button>
              </div>
            )}
          </div>

          {/* Cart Content */}
          {isHydrated && cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Items List */}
              <div className="lg:col-span-8 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 border-2 sm:border-3 border-brand-ink bg-brand-white shadow-neo flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {/* Thumbnail */}
                      <Link
                        href={`/product/${item.slug}`}
                        className="relative w-20 h-24 sm:w-24 sm:h-28 border-2 border-brand-ink bg-brand-cream overflow-hidden shrink-0 hover:border-brand-pink transition-colors"
                      >
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          sizes="96px"
                          className="object-cover object-top"
                        />
                      </Link>

                      {/* Info */}
                      <div className="space-y-1">
                        <h3 className="font-display font-bold text-sm sm:text-base uppercase text-brand-ink hover:text-brand-pink transition-colors">
                          <Link href={`/product/${item.slug}`}>{item.title}</Link>
                        </h3>

                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-600">
                          <span className="bg-brand-cream px-1.5 py-0.5 border border-brand-ink font-bold">
                            Size: <strong>{item.size}</strong>
                          </span>
                          <span className="bg-brand-cream px-1.5 py-0.5 border border-brand-ink font-bold">
                            Color: <strong>{item.colorName}</strong>
                          </span>
                        </div>

                        <div className="pt-1 flex items-center gap-2">
                          <span className="font-display font-extrabold text-sm sm:text-base text-brand-ink">
                            {formatCurrency(item.price)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="font-body text-xs text-neutral-500 line-through">
                              {formatCurrency(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls & Delete */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-200">
                      <div className="flex items-center border-2 border-brand-ink bg-brand-white shadow-neo-sm">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-brand-cream transition-colors cursor-pointer"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                        <span className="px-3 font-mono font-bold text-xs">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          disabled={item.quantity >= item.maxStock}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-brand-cream disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title} (${item.size}) from bag`}
                        className="p-2 border-2 border-brand-ink bg-brand-white shadow-neo-sm hover:bg-brand-pink text-brand-ink transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 stroke-[2.2]" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Free shipping banner */}
                <div className="p-4 border-2 border-brand-ink bg-brand-yellow flex flex-col gap-2 shadow-neo-sm">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 stroke-[2.5] text-brand-ink shrink-0" />
                    <p className="font-display text-xs sm:text-sm font-bold uppercase text-brand-ink">
                      {amountToFreeShipping === 0
                        ? "CONGRATULATIONS: YOU HAVE UNLOCKED FREE EXPRESS SHIPPING!"
                        : `ADD ${formatCurrency(amountToFreeShipping)} MORE TO UNLOCK FREE EXPRESS AIR SHIPPING!`}
                    </p>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2.5 bg-brand-white border border-brand-ink overflow-hidden">
                    <div
                      className="h-full bg-brand-pink transition-all duration-300"
                      style={{
                        width: `${Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary Box */}
              <div className="lg:col-span-4 space-y-6">
                <div className="border-3 sm:border-4 border-brand-ink bg-brand-cream p-6 shadow-neo-lg space-y-6">
                  <h2 className="font-display font-extrabold text-lg uppercase tracking-tight text-brand-ink pb-3 border-b-2 border-brand-ink">
                    ORDER SUMMARY
                  </h2>

                  <div className="space-y-3 font-display text-xs sm:text-sm uppercase">
                    <div className="flex justify-between items-center text-neutral-700">
                      <span>Bag Subtotal</span>
                      <span className="font-mono font-bold text-brand-ink">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-neutral-700">
                      <span>Estimated Shipping</span>
                      <span className="font-mono font-bold">
                        {shippingEstimate === 0 ? (
                          <span className="text-emerald-700 font-extrabold">FREE</span>
                        ) : (
                          formatCurrency(shippingEstimate)
                        )}
                      </span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between items-center text-brand-pink font-extrabold">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5" />
                          Coupon ({appliedCoupon})
                        </span>
                        <span className="font-mono">-{formatCurrency(discountAmount)}</span>
                      </div>
                    )}

                    <div className="pt-3 border-t-2 border-brand-ink flex justify-between items-center text-base sm:text-lg font-extrabold text-brand-ink">
                      <span>Estimated Total</span>
                      <span className="font-mono text-xl sm:text-2xl text-brand-ink">
                        {formatCurrency(total)}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 normal-case block">
                      Includes all GST & Indian central textile tariffs
                    </span>
                  </div>

                  {/* Promo Form / Applied coupon chip */}
                  <div className="pt-2 border-t border-neutral-300">
                    {appliedCoupon ? (
                      <div className="p-3 bg-brand-white border-2 border-brand-ink flex items-center justify-between shadow-neo-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                          <div>
                            <span className="font-display text-xs font-bold uppercase text-brand-ink block">
                              Code {appliedCoupon} Active
                            </span>
                            <span className="font-mono text-[10px] text-neutral-500">
                              Saving {formatCurrency(discountAmount)}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeCoupon}
                          className="p-1 hover:bg-neutral-100 border border-brand-ink text-neutral-600 hover:text-brand-pink transition-colors cursor-pointer"
                          aria-label="Remove coupon"
                        >
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="space-y-2">
                        <label
                          htmlFor="cart-promo-code"
                          className="font-display text-xs font-bold uppercase text-neutral-700 flex items-center gap-1.5"
                        >
                          <Tag className="w-3.5 h-3.5" />
                          Promo or Voucher Code
                        </label>
                        <div className="flex gap-2">
                          <input
                            id="cart-promo-code"
                            type="text"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            placeholder="TRY CODE BOLD15"
                            className="flex-1 p-2.5 bg-brand-white border-2 border-brand-ink font-display text-xs font-bold uppercase tracking-wider outline-none shadow-neo-sm focus:shadow-neo"
                          />
                          <Button type="submit" variant="outline" size="sm">
                            APPLY
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Checkout CTA */}
                  <div className="pt-2">
                    <Link href="/checkout" className="w-full block">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full justify-center py-4 text-sm sm:text-base"
                        rightIcon={<ArrowRight className="w-5 h-5 stroke-[2.5]" />}
                      >
                        PROCEED TO CHECKOUT
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Assurance pills */}
                <div className="space-y-2 font-mono text-xs text-neutral-700 p-4 border-2 border-brand-ink bg-brand-white shadow-neo-sm">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-ink stroke-[2.5]" />
                    <span>256-bit encrypted checkout session</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-brand-ink stroke-[2.5]" />
                    <span>7-day doorstep replacement guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={<ShoppingBag className="w-8 h-8 text-brand-ink stroke-[2.2]" />}
              title="YOUR SHOPPING BAG IS CURRENTLY EMPTY"
              description="You haven't added any garments to your bag yet. Explore our latest architectural releases and add pieces that fit your attitude."
              action={
                <Link href="/shop">
                  <Button
                    variant="primary"
                    rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                  >
                    START BROWSING EDITS
                  </Button>
                </Link>
              }
            />
          )}
        </div>
      </Container>

      {/* Clear Bag Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isClearConfirmOpen}
        onClose={() => setIsClearConfirmOpen(false)}
        onConfirm={() => {
          clearCart();
          setIsClearConfirmOpen(false);
        }}
        title="CLEAR YOUR SHOPPING BAG?"
        description="Are you sure you want to remove all staged garments from your bag? This action cannot be undone."
        confirmLabel="YES, CLEAR BAG"
        cancelLabel="KEEP GARMENTS"
        isDestructive={true}
      />
    </div>
  );
}
