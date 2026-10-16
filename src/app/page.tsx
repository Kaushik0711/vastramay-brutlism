import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CategoryNav } from "@/components/shop/CategoryNav";
import { ProductCard } from "@/components/product/ProductCard";
import { sampleProducts } from "@/data/products";
import {
  ArrowRight,
  Layers,
  Palette,
  CheckCircle2,
  Code2,
} from "lucide-react";

export default function Home() {
  const showcaseProduct = sampleProducts[0];

  return (
    <div className="w-full pb-20 space-y-12 sm:space-y-16">
      {/* Hero Foundation Banner */}
      <section className="relative w-full border-b-3 sm:border-b-4 border-brand-ink bg-brand-cream pt-10 sm:pt-16 pb-12 sm:pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Mission & Typography Demo */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="pink" shape="square" className="text-xs">
                  PHASE 1 COMPLETE
                </Badge>
                <Badge variant="yellow" shape="square" className="text-xs">
                  FOUNDATION & ARCHITECTURE
                </Badge>
                <Badge variant="dark" shape="square" className="text-xs">
                  NEXT.JS 16 · TURBOPACK
                </Badge>
              </div>

              <div className="space-y-2">
                <p className="font-editorial italic text-2xl sm:text-3xl text-neutral-800 tracking-wide">
                  Contemporary Indian Craft · Architectural Cuts
                </p>
                <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase text-brand-ink tracking-tight leading-[0.95]">
                  WEAR THE <span className="bg-brand-yellow px-2 border-2 border-brand-ink shadow-neo-sm inline-block rotate-[-1deg]">ATTITUDE.</span>
                </h1>
              </div>

              <p className="font-body text-base sm:text-lg text-neutral-700 max-w-xl leading-relaxed">
                Welcome to <strong className="text-brand-ink">Vastramay</strong> — an unapologetic clothing label bridging the richness of heritage Indian textiles with hard-hitting modern streetwear and neo-brutalist aesthetics.
              </p>

              {/* Action Buttons showcasing micro-interactions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5 stroke-[2.5]" />}
                >
                  EXPLORE ARCHITECTURE
                </Button>
                <Button variant="outline" size="lg">
                  DESIGN SYSTEM
                </Button>
                <Button variant="secondary" size="lg">
                  VIEW DOCS
                </Button>
              </div>

              {/* Architecture Spec Pills */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  Tailwind CSS v4
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  SCSS Modules
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  Zero-Blur Shadows
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  Triple-Font System
                </span>
              </div>
            </div>

            {/* Right Column: Neo-Brutalist Component Foundation Card */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Decorative Offset Backdrops */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-brand-yellow border-3 border-brand-ink translate-x-3 translate-y-3"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-brand-pink border-3 border-brand-ink translate-x-1.5 translate-y-1.5"
                />

                {/* Primary Feature Card */}
                <Card
                  thick
                  className="relative p-6 sm:p-8 bg-brand-white border-3 border-brand-ink"
                >
                  <div className="flex items-center justify-between pb-4 border-b-2 border-brand-ink">
                    <span className="font-display font-extrabold text-xs uppercase tracking-wider text-neutral-500">
                      DESIGN SYSTEM SPEC
                    </span>
                    <Badge variant="blue" shape="pill">
                      v1.0.0
                    </Badge>
                  </div>

                  <div className="space-y-4 my-6">
                    <div className="space-y-1">
                      <p className="font-display font-extrabold text-lg uppercase text-brand-ink">
                        TRIPLE TYPOGRAPHY ENGINE
                      </p>
                      <div className="grid grid-cols-1 gap-2 pt-1">
                        <div className="p-2.5 bg-brand-cream border-2 border-brand-ink text-xs">
                          <span className="font-display font-bold uppercase block text-neutral-900">
                            Syne Display (Headings & Badges)
                          </span>
                          <span className="font-display font-extrabold text-sm text-brand-ink">
                            BOLD ARCHITECTURAL IMPACT
                          </span>
                        </div>

                        <div className="p-2.5 bg-brand-cream border-2 border-brand-ink text-xs">
                          <span className="font-body font-bold uppercase block text-neutral-900">
                            Plus Jakarta Sans (Body & Controls)
                          </span>
                          <span className="font-body text-xs text-neutral-700">
                            Optimal legibility, crisp rendering, responsive scaling.
                          </span>
                        </div>

                        <div className="p-2.5 bg-brand-cream border-2 border-brand-ink text-xs">
                          <span className="font-editorial font-bold uppercase block text-neutral-900">
                            Playfair Display (Fashion Highlights)
                          </span>
                          <span className="font-editorial italic text-sm text-neutral-900">
                            &quot;High craft meets electric rebellion.&quot;
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Color Swatches */}
                    <div>
                      <p className="font-display font-extrabold text-xs uppercase text-neutral-700 mb-2">
                        AUTHENTIC NEO-BRUTALIST PALETTE
                      </p>
                      <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-[9px] font-bold">
                        <div className="p-2 bg-[#F7F1E5] border-2 border-brand-ink text-brand-ink">
                          CREAM
                        </div>
                        <div className="p-2 bg-[#FF5C8A] border-2 border-brand-ink text-brand-ink">
                          PINK
                        </div>
                        <div className="p-2 bg-[#FFE14A] border-2 border-brand-ink text-brand-ink">
                          YELLOW
                        </div>
                        <div className="p-2 bg-[#4867F5] border-2 border-brand-ink text-brand-white">
                          BLUE
                        </div>
                        <div className="p-2 bg-[#171717] border-2 border-brand-ink text-brand-white">
                          INK
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-brand-ink flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-600">ZERO BLUR SHADOWS</span>
                    <span className="font-bold text-brand-ink">4px / 6px / 8px / 12px</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Category Pill Navigation Foundation Preview */}
      <section>
        <Container>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase text-neutral-500 font-bold">
                  CATALOG TAXONOMY
                </p>
                <h2 className="font-display font-extrabold text-2xl uppercase text-brand-ink">
                  PLANNED APPAREL EDITS
                </h2>
              </div>
              <Badge variant="yellow" shape="square">
                PHASE 2 READY
              </Badge>
            </div>

            <CategoryNav />
          </div>
        </Container>
      </section>

      {/* Architecture Deliverables Grid */}
      <section>
        <Container>
          <div className="border-3 border-brand-ink bg-brand-white p-6 sm:p-10 shadow-neo-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-brand-ink">
              <div>
                <span className="font-mono text-xs font-bold text-brand-pink uppercase">
                  FOUNDATION CHECKLIST
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl uppercase text-brand-ink mt-0.5">
                  PHASE 1 IMPLEMENTED MODULES
                </h2>
              </div>
              <Link href="/docs">
                <Button variant="dark" size="sm">
                  BROWSE ALL DOCUMENTATION
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {/* Box 1 */}
              <div className="p-5 bg-brand-cream border-2 border-brand-ink shadow-neo-sm space-y-3">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-pink border-2 border-brand-ink shadow-neo-sm">
                  <Palette className="w-5 h-5 text-brand-ink" />
                </div>
                <h3 className="font-display font-extrabold text-lg uppercase text-brand-ink">
                  Design Tokens
                </h3>
                <p className="font-body text-xs text-neutral-700 leading-relaxed">
                  Centralized CSS custom properties in <code className="bg-brand-white px-1 border border-brand-ink font-mono">_tokens.scss</code> mapped into Tailwind CSS v4 <code className="bg-brand-white px-1 border border-brand-ink font-mono">@theme</code>.
                </p>
                <ul className="text-xs space-y-1 font-mono text-neutral-700 pt-2 border-t border-neutral-300">
                  <li>✔ Warm Cream (#F7F1E5)</li>
                  <li>✔ Hot Pink (#FF5C8A)</li>
                  <li>✔ Electric Yellow (#FFE14A)</li>
                  <li>✔ Cobalt Blue (#4867F5)</li>
                </ul>
              </div>

              {/* Box 2 */}
              <div className="p-5 bg-brand-cream border-2 border-brand-ink shadow-neo-sm space-y-3">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-yellow border-2 border-brand-ink shadow-neo-sm">
                  <Layers className="w-5 h-5 text-brand-ink" />
                </div>
                <h3 className="font-display font-extrabold text-lg uppercase text-brand-ink">
                  Component Primitives
                </h3>
                <p className="font-body text-xs text-neutral-700 leading-relaxed">
                  Reusable neo-brutalist buttons, badges, cards, containers, announcement tickers, price tags, and responsive navigation.
                </p>
                <ul className="text-xs space-y-1 font-mono text-neutral-700 pt-2 border-t border-neutral-300">
                  <li>✔ Button (6 variants, push-down)</li>
                  <li>✔ Badge (6 colorways, 3 shapes)</li>
                  <li>✔ Card (Thick, hard-shadowed)</li>
                  <li>✔ PriceTag with discount badges</li>
                </ul>
              </div>

              {/* Box 3 */}
              <div className="p-5 bg-brand-cream border-2 border-brand-ink shadow-neo-sm space-y-3">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-blue border-2 border-brand-ink shadow-neo-sm text-brand-white">
                  <Code2 className="w-5 h-5 text-brand-white" />
                </div>
                <h3 className="font-display font-extrabold text-lg uppercase text-brand-ink">
                  Application Shell
                </h3>
                <p className="font-body text-xs text-neutral-700 leading-relaxed">
                  Next.js App Router root layout, branded loading state, 404 handler, error boundaries, SEO metadata, and strict TypeScript types.
                </p>
                <ul className="text-xs space-y-1 font-mono text-neutral-700 pt-2 border-t border-neutral-300">
                  <li>✔ loading.tsx & not-found.tsx</li>
                  <li>✔ error.tsx & global-error.tsx</li>
                  <li>✔ TypeScript strict types</li>
                  <li>✔ SCSS Modules + Turbopack</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Product Card Foundation Preview */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-yellow border-3 border-brand-ink p-6 sm:p-10 shadow-neo-lg">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="pink" shape="square">
                COMPONENT PREVIEW
              </Badge>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase text-brand-ink leading-tight">
                PRODUCT CARD ARCHITECTURE
              </h2>
              <p className="font-body text-sm text-neutral-800 leading-relaxed max-w-lg">
                Engineered with high-contrast borders, aspect ratio image containment, floating discount and status badges, and interactive hover elevation ready for Phase 2 catalog listing.
              </p>
              <div className="pt-2">
                <Link href="/shop/men">
                  <Button variant="dark" size="md">
                    VIEW PRODUCT DATA MODEL
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 max-w-sm mx-auto w-full">
              <ProductCard product={showcaseProduct} priority />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
