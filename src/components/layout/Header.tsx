"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Menu, Heart, ShoppingBag, User } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Navigation } from "./Navigation";
import { AnnouncementBar } from "./AnnouncementBar";
import { Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { useShopping } from "@/context/ShoppingContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { motion, AnimatePresence } from "motion/react";
import { badgeBumpVariants } from "@/lib/motion";
import { QuickViewModal } from "@/components/product/QuickViewModal";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, wishlistCount, openCartDrawer, isHydrated } = useShopping();

  return (
    <header className="sticky top-0 z-[200] w-full bg-brand-cream">
      <AnnouncementBar />

      <div className="w-full border-b-2 sm:border-b-3 border-brand-ink bg-brand-cream/95 backdrop-blur-sm">
        <Container>
          <div className="flex h-16 sm:h-20 items-center justify-between gap-3 sm:gap-4">
            {/* Mobile Menu Trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                className="p-2 border-2 border-brand-ink bg-brand-white shadow-neo-sm hover:bg-brand-yellow transition-colors cursor-pointer"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="group flex items-center gap-1.5 sm:gap-2 focus:outline-none"
              >
                <span className="font-display text-xl sm:text-3xl font-extrabold tracking-tighter text-brand-ink uppercase group-hover:text-brand-pink transition-colors">
                  {siteConfig.name}
                </span>
                <span className="inline-block px-1.5 py-0.5 bg-brand-pink text-brand-ink font-display text-[9px] sm:text-[10px] font-extrabold border-2 border-brand-ink shadow-[1px_1px_0px_#171717] rotate-[-3deg]">
                  STUDIO
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <Navigation />
            </div>

            {/* Utility / Action Triggers */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Search Link */}
              <Link
                href="/search"
                aria-label="Search clothing"
                className="flex items-center justify-center p-2 sm:p-2.5 bg-brand-white border-2 border-brand-ink shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-brand-ink stroke-[2.2]" />
              </Link>

              {/* Wishlist Link with Live Badge */}
              <Link
                href="/wishlist"
                aria-label={`View your wishlist (${wishlistCount} items)`}
                className="relative flex items-center justify-center p-2 sm:p-2.5 bg-brand-white border-2 border-brand-ink shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-brand-ink stroke-[2.2]" />
                <AnimatePresence mode="popLayout">
                  {isHydrated && wishlistCount > 0 && (
                    <motion.span
                      key={wishlistCount}
                      variants={badgeBumpVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-brand-yellow text-brand-ink font-display font-extrabold text-[9px] border-2 border-brand-ink rounded-full shadow-[1px_1px_0px_#171717]"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Account / Support Link */}
              <Link
                href="/contact"
                aria-label="Customer account and care"
                className="hidden sm:flex items-center justify-center p-2.5 bg-brand-white border-2 border-brand-ink shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <User className="w-5 h-5 text-brand-ink stroke-[2.2]" />
              </Link>

              {/* Cart Drawer Trigger with Live Badge */}
              <button
                type="button"
                onClick={openCartDrawer}
                aria-label={`Open shopping bag (${cartCount} items)`}
                className="relative flex items-center justify-center p-2 sm:p-2.5 bg-brand-white border-2 border-brand-ink shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-brand-ink stroke-[2.2]" />
                <AnimatePresence mode="popLayout">
                  {isHydrated && cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      variants={badgeBumpVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-brand-pink text-brand-ink font-display font-extrabold text-[9px] border-2 border-brand-ink rounded-full shadow-[1px_1px_0px_#171717]"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer Navigation (Using reusable Drawer component) */}
      <Drawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        placement="left"
      >
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <span className="font-display font-extrabold text-2xl uppercase tracking-tighter text-brand-ink">
              {siteConfig.name}
            </span>
            <span className="px-1.5 py-0.5 bg-brand-yellow text-brand-ink font-display text-[9px] font-extrabold border border-brand-ink">
              EDITS
            </span>
          </DrawerTitle>
        </DrawerHeader>

        <DrawerBody className="space-y-3">
          <nav className="flex flex-col gap-2.5">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 bg-brand-white border-2 border-brand-ink font-display font-bold text-base uppercase shadow-neo-sm hover:bg-brand-pink transition-colors"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-brand-yellow border-2 border-brand-ink text-xs font-extrabold">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t-2 border-brand-ink space-y-2">
            <p className="font-display font-bold text-xs uppercase text-neutral-500 tracking-wider">
              QUICK SHOPPING LINKS
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-display font-bold uppercase">
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-brand-cream border-2 border-brand-ink text-center hover:bg-brand-yellow"
              >
                Wishlist
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-brand-cream border-2 border-brand-ink text-center hover:bg-brand-pink"
              >
                Shopping Bag
              </Link>
              <Link
                href="/shipping-returns"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-brand-cream border-2 border-brand-ink text-center hover:bg-brand-yellow"
              >
                Shipping Policy
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-brand-cream border-2 border-brand-ink text-center hover:bg-brand-pink"
              >
                Contact Care
              </Link>
            </div>
          </div>
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="dark"
            fullWidth
            onClick={() => setMobileMenuOpen(false)}
          >
            CLOSE MENU
          </Button>
        </DrawerFooter>
      </Drawer>

      {/* Mini Cart Slide-over Drawer */}
      <CartDrawer />

      {/* Global Quick View & Variant Selector Modal */}
      <QuickViewModal />
    </header>
  );
}
