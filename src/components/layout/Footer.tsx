"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, RefreshCw, Truck, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-brand-ink text-brand-white border-t-3 sm:border-t-4 border-brand-ink">
      {/* Brand Value Props Strip */}
      <div className="border-b-2 border-neutral-800 bg-neutral-900 py-6">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-brand-ink">
            <div className="flex items-center gap-3 p-3 bg-brand-cream border-2 border-brand-ink shadow-[3px_3px_0px_#FFE14A]">
              <Truck className="w-6 h-6 shrink-0 text-brand-ink stroke-[2.2]" />
              <div>
                <p className="font-display font-bold text-xs uppercase">Express Shipping</p>
                <p className="font-body text-[11px] text-neutral-600">Pan-India delivery in 2-4 days</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-brand-pink border-2 border-brand-ink shadow-[3px_3px_0px_#FFFFFF]">
              <RefreshCw className="w-6 h-6 shrink-0 text-brand-ink stroke-[2.2]" />
              <div>
                <p className="font-display font-bold text-xs uppercase">7-Day Exchanges</p>
                <p className="font-body text-[11px] text-neutral-800">Hassle-free doorstep pickup</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-brand-yellow border-2 border-brand-ink shadow-[3px_3px_0px_#FF5C8A]">
              <ShieldCheck className="w-6 h-6 shrink-0 text-brand-ink stroke-[2.2]" />
              <div>
                <p className="font-display font-bold text-xs uppercase">Pure Handcraft</p>
                <p className="font-body text-[11px] text-neutral-800">100% authentic fabrics</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-brand-blue text-brand-white border-2 border-brand-ink shadow-[3px_3px_0px_#FFE14A]">
              <Sparkles className="w-6 h-6 shrink-0 text-brand-white stroke-[2.2]" />
              <div>
                <p className="font-display font-bold text-xs uppercase text-brand-white">Neo Aesthetics</p>
                <p className="font-body text-[11px] text-blue-100">Tailored with raw attitude</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Links */}
      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand Manifesto & Newsletter */}
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-block px-3 py-1 bg-brand-pink text-brand-ink font-display font-extrabold text-xl uppercase border-2 border-brand-white shadow-[3px_3px_0px_#FFE14A]">
                {siteConfig.name}
              </div>
              <p className="font-body text-sm text-neutral-300 max-w-sm leading-relaxed">
                {siteConfig.description}
              </p>

              {/* Newsletter Form Shell */}
              <div className="pt-2">
                <p className="font-display font-bold text-xs uppercase text-brand-yellow tracking-wider mb-2">
                  JOIN THE INSIDER DROP LIST
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col sm:flex-row gap-2 max-w-md"
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    aria-label="Email address for newsletter"
                    className="flex-1 px-3 py-2 bg-neutral-900 border-2 border-neutral-700 text-brand-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow focus:outline-none"
                  />
                  <Button variant="secondary" size="sm" type="submit">
                    SUBSCRIBE
                  </Button>
                </form>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-brand-yellow mb-4 border-b border-neutral-800 pb-1">
                SHOP
              </h4>
              <ul className="space-y-2 text-sm">
                {siteConfig.footerNav.shop.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-neutral-400 hover:text-brand-pink transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-brand-yellow mb-4 border-b border-neutral-800 pb-1">
                CUSTOMER CARE
              </h4>
              <ul className="space-y-2 text-sm">
                {siteConfig.footerNav.customerService.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-neutral-400 hover:text-brand-pink transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About & Legal */}
            <div>
              <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-brand-yellow mb-4 border-b border-neutral-800 pb-1">
                ABOUT & LEGAL
              </h4>
              <ul className="space-y-2 text-sm">
                {siteConfig.footerNav.about.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-neutral-400 hover:text-brand-pink transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {siteConfig.footerNav.legal.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-neutral-400 hover:text-brand-pink transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
            <p>© 2026 VASTRAMAY APPAREL PVT. LTD. ALL RIGHTS RESERVED.</p>
            <p className="flex items-center gap-2">
              <span>DESIGNED WITH</span>
              <span className="text-brand-pink">♥</span>
              <span>NEO-BRUTALISM ARCHITECTURE</span>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
