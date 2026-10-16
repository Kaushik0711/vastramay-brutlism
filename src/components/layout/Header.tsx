"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Navigation } from "./Navigation";
import { AnnouncementBar } from "./AnnouncementBar";
import { CartBadge } from "@/components/cart/CartBadge";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[200] w-full bg-brand-cream">
      <AnnouncementBar />

      <div className="w-full border-b-2 sm:border-b-3 border-brand-ink bg-brand-cream/95 backdrop-blur-sm">
        <Container>
          <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                className="p-2 border-2 border-brand-ink bg-brand-white shadow-neo-sm hover:bg-brand-yellow transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 stroke-[2.5]" />
                ) : (
                  <Menu className="w-6 h-6 stroke-[2.5]" />
                )}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="group flex items-center gap-2 focus:outline-none"
              >
                <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tighter text-brand-ink uppercase group-hover:text-brand-pink transition-colors">
                  {siteConfig.name}
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 bg-brand-pink text-brand-ink font-display text-[10px] font-extrabold border-2 border-brand-ink shadow-[1px_1px_0px_#171717] rotate-[-3deg]">
                  STUDIO
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <Navigation />
            </div>

            {/* Utility / Action Triggers */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                aria-label="Search clothing"
                className="flex items-center justify-center p-2.5 bg-brand-white border-2 border-brand-ink shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <Search className="w-5 h-5 text-brand-ink stroke-[2.2]" />
              </button>

              <CartBadge count={0} />
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="lg:hidden border-b-3 border-brand-ink bg-brand-yellow p-6 shadow-neo-md"
        >
          <nav className="flex flex-col gap-3">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 bg-brand-white border-2 border-brand-ink font-display font-bold text-lg uppercase shadow-neo-sm hover:bg-brand-pink transition-colors"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-brand-pink border-2 border-brand-ink text-xs font-extrabold">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
