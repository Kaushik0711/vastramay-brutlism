"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useShopping } from "@/context/ShoppingContext";
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { fadeSlideUpVariants } from "@/lib/motion";

export function CartDrawer() {
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
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    isHydrated,
  } = useShopping();

  return (
    <Drawer
      isOpen={isCartDrawerOpen}
      onClose={closeCartDrawer}
      placement="right"
    >
      <DrawerHeader className="border-b-3 border-brand-ink bg-brand-cream">
        <DrawerTitle className="flex items-center justify-between w-full pr-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-ink stroke-[2.5]" />
            <span className="font-display font-extrabold text-base sm:text-lg uppercase tracking-tight text-brand-ink">
              YOUR SHOPPING BAG
            </span>
          </div>
          {isHydrated && cartCount > 0 && (
            <Badge variant="pink" shape="square" className="text-xs font-mono font-bold">
              {cartCount} {cartCount === 1 ? "PIECE" : "PIECES"}
            </Badge>
          )}
        </DrawerTitle>
      </DrawerHeader>

      <DrawerBody className="p-4 sm:p-5 space-y-4">
        {/* Free Shipping Progress Strip */}
        {isHydrated && cart.length > 0 && (
          <div className="p-3 border-2 border-brand-ink bg-brand-yellow shadow-neo-sm space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-display font-bold uppercase text-brand-ink">
              <Truck className="w-4 h-4 stroke-[2.5] shrink-0" />
              {amountToFreeShipping === 0 ? (
                <span>🎉 YOU HAVE UNLOCKED FREE EXPRESS SHIPPING!</span>
              ) : (
                <span>
                  ADD {formatCurrency(amountToFreeShipping)} MORE FOR FREE EXPRESS SHIPPING
                </span>
              )}
            </div>

            {/* Mini Progress Bar */}
            <div className="w-full h-2 bg-brand-white border border-brand-ink overflow-hidden">
              <div
                className="h-full bg-brand-pink transition-all duration-300"
                style={{
                  width: `${Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Cart Items List */}
        {isHydrated && cart.length > 0 ? (
          <div className="space-y-3 divide-y-2 divide-brand-ink">
            <AnimatePresence initial={false}>
              {cart.map((item) => {
                const lineTotal = item.price * item.quantity;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    variants={fadeSlideUpVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                    transition={{ duration: 0.16 }}
                    className="pt-3 first:pt-0 flex gap-3 sm:gap-4 items-start"
                  >
                    {/* Thumbnail */}
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCartDrawer}
                      className="relative w-16 h-20 sm:w-20 sm:h-24 border-2 border-brand-ink bg-brand-cream overflow-hidden shrink-0 hover:border-brand-pink transition-colors"
                    >
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 space-y-1 min-w-0">
                      <h4 className="font-display font-bold text-xs sm:text-sm uppercase text-brand-ink line-clamp-1 hover:text-brand-pink transition-colors">
                        <Link href={`/product/${item.slug}`} onClick={closeCartDrawer}>
                          {item.title}
                        </Link>
                      </h4>

                      {/* Variant tags */}
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-neutral-600 flex-wrap">
                        <span className="px-1.5 py-0.2 bg-brand-cream border border-brand-ink font-bold">
                          Size: {item.size}
                        </span>
                        <span className="px-1.5 py-0.2 bg-brand-cream border border-brand-ink font-bold">
                          {item.colorName}
                        </span>
                      </div>

                      {/* Unit & Line Price */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1 text-xs">
                          <span className="font-mono font-bold text-brand-ink">
                            {formatCurrency(item.price)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="font-mono text-[10px] text-neutral-400 line-through">
                              {formatCurrency(item.originalPrice)}
                            </span>
                          )}
                        </div>

                        <span className="font-display font-extrabold text-xs sm:text-sm text-brand-ink">
                          {formatCurrency(lineTotal)}
                        </span>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center border-2 border-brand-ink bg-brand-white shadow-neo-sm">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-brand-cream transition-colors cursor-pointer"
                            aria-label={`Decrease quantity of ${item.title}`}
                          >
                            <Minus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                          <span className="px-2.5 font-mono font-bold text-xs text-brand-ink">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            disabled={item.quantity >= item.maxStock}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-brand-cream disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            aria-label={`Increase quantity of ${item.title}`}
                          >
                            <Plus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-neutral-500 hover:text-brand-pink transition-colors cursor-pointer"
                          aria-label={`Remove ${item.title} (${item.size}) from bag`}
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 mx-auto bg-brand-yellow border-2 border-brand-ink shadow-neo-sm flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-brand-ink stroke-[2.2]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-base uppercase text-brand-ink">
                YOUR BAG IS EMPTY
              </h3>
              <p className="font-body text-xs text-neutral-600 max-w-xs mx-auto">
                No garments staged for checkout yet. Browse our latest drops to wear the attitude.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={closeCartDrawer}
              className="mt-2"
            >
              CONTINUE BROWSING
            </Button>
          </div>
        )}
      </DrawerBody>

      {/* Drawer Footer with Financial Summary & Actions */}
      {isHydrated && cart.length > 0 && (
        <DrawerFooter className="border-t-3 border-brand-ink bg-brand-cream p-4 sm:p-5 space-y-4">
          <div className="space-y-2 text-xs font-display uppercase w-full">
            <div className="flex justify-between text-neutral-700">
              <span>Subtotal</span>
              <span className="font-mono font-bold text-brand-ink">
                {formatCurrency(subtotal)}
              </span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-brand-pink font-bold">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Coupon ({appliedCoupon})
                </span>
                <span className="font-mono">-{formatCurrency(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-neutral-700">
              <span>Estimated Shipping</span>
              <span className="font-mono font-bold">
                {shippingEstimate === 0 ? (
                  <span className="text-emerald-700 font-extrabold">FREE</span>
                ) : (
                  formatCurrency(shippingEstimate)
                )}
              </span>
            </div>

            <div className="pt-2 border-t-2 border-brand-ink flex justify-between items-center text-sm sm:text-base font-extrabold text-brand-ink">
              <span>Estimated Total</span>
              <span className="font-mono text-base sm:text-lg text-brand-ink">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <div className="space-y-2 w-full pt-1">
            <Link href="/checkout" onClick={closeCartDrawer} className="w-full block">
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center text-xs sm:text-sm py-3"
                rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
              >
                PROCEED TO CHECKOUT
              </Button>
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <Link href="/cart" onClick={closeCartDrawer}>
                <Button variant="outline" size="sm" className="w-full justify-center text-xs">
                  VIEW FULL BAG
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="sm"
                onClick={closeCartDrawer}
                className="w-full justify-center text-xs"
              >
                KEEP SHOPPING
              </Button>
            </div>
          </div>
        </DrawerFooter>
      )}
    </Drawer>
  );
}
