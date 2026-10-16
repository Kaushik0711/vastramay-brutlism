import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/product/ProductCard";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";
import {
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
} from "@/lib/products";
import { categories } from "@/data/categories";
import {
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  RotateCcw,
  Scissors,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export const metadata = {
  title: "Vastramay — Neo-Brutalist Men's & Women's Fashion Collective",
  description:
    "Contemporary Indian clothing engineered with architectural silhouettes, heritage handlooms, and unapologetic neo-brutalist construction.",
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(4);
  const newArrivals = getNewArrivals(4);
  const bestSellers = getBestSellers(4);

  // Curated collections
  const topCategories = categories.slice(0, 6);

  return (
    <div className="w-full flex flex-col gap-16 sm:gap-24 pb-20">
      {/* 1. Bold Fashion Hero */}
      <section className="relative w-full border-b-3 sm:border-b-4 border-brand-ink bg-brand-cream overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="pink" shape="square" className="text-xs">
                  DROP 03 · ONLINE NOW
                </Badge>
                <Badge variant="yellow" shape="square" className="text-xs">
                  PAN-INDIA SHIPPING
                </Badge>
                <Badge variant="dark" shape="square" className="text-xs">
                  LIMITED RUNS
                </Badge>
              </div>

              <div className="space-y-3">
                <p className="font-editorial italic text-2xl sm:text-3xl text-neutral-800 tracking-wide">
                  Architectural Cuts · Handloom Heritage
                </p>
                <h1 className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl uppercase text-brand-ink tracking-tight leading-[0.93]">
                  WEAR THE{" "}
                  <span className="bg-brand-yellow px-2 border-2 sm:border-3 border-brand-ink shadow-neo inline-block rotate-[-1.5deg]">
                    ATTITUDE.
                  </span>
                </h1>
              </div>

              <p className="font-body text-base sm:text-lg text-neutral-700 max-w-xl leading-relaxed">
                Vastramay breaks traditional mold. We craft statement clothing
                bridging raw Indian artisanal handlooms with high-voltage
                streetwear cuts and unapologetic neo-brutalist details.
              </p>

              {/* Shopping CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/men">
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5 stroke-[2.5]" />}
                  >
                    SHOP MEN&apos;S
                  </Button>
                </Link>
                <Link href="/women">
                  <Button
                    variant="secondary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5 stroke-[2.5]" />}
                  >
                    SHOP WOMEN&apos;S
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" size="lg">
                    ALL EDITS
                  </Button>
                </Link>
              </div>

              {/* Quality Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-neutral-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink stroke-[2.5]" />
                  100% Handloom Cottons
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink stroke-[2.5]" />
                  Industrial Metal Hardware
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink stroke-[2.5]" />
                  7-Day Doorstep Exchange
                </span>
              </div>
            </div>

            {/* Right Hero Column: Editorial Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background Shadow Offset Box */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-brand-pink border-3 sm:border-4 border-brand-ink translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4"
                />

                {/* Main Image Frame */}
                <div className="relative border-3 sm:border-4 border-brand-ink bg-brand-white p-3 sm:p-4 shadow-neo-lg space-y-3">
                  <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-brand-ink bg-neutral-100">
                    <Image
                      src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"
                      alt="Vastramay Neo-Heritage Edit editorial campaign"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="yellow" shape="square" className="text-xs">
                        EDITORIAL DROP
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-brand-white/95 border-2 border-brand-ink px-2.5 py-1 text-xs font-display font-extrabold uppercase shadow-neo-sm">
                      NEO-HERITAGE EDIT
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono font-bold text-brand-ink pt-1">
                    <span>SERIES: 03-VASTRAMAY</span>
                    <span className="text-brand-pink font-extrabold">AUTUMN / FESTIVE &apos;26</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Trust / Value Proposition Strip */}
      <section className="w-full">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: <Scissors className="w-6 h-6 stroke-[2.2]" />,
                title: "HERITAGE WEAVES",
                desc: "Pure Indian slub cottons & silks",
                bg: "bg-brand-cream",
              },
              {
                icon: <Zap className="w-6 h-6 stroke-[2.2]" />,
                title: "PAN-INDIA EXPRESS",
                desc: "Dispatched within 24 hours",
                bg: "bg-brand-yellow",
              },
              {
                icon: <RotateCcw className="w-6 h-6 stroke-[2.2]" />,
                title: "7-DAY EXCHANGES",
                desc: "Hassle-free doorstep pickup",
                bg: "bg-brand-pink",
              },
              {
                icon: <ShieldCheck className="w-6 h-6 stroke-[2.2]" />,
                title: "ZERO SYNTHETICS",
                desc: "Breathable natural fabrics",
                bg: "bg-brand-white",
              },
            ].map((prop, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-5 border-2 sm:border-3 border-brand-ink shadow-neo flex flex-col gap-2 ${prop.bg}`}
              >
                <div className="w-10 h-10 border-2 border-brand-ink bg-brand-white flex items-center justify-center shadow-neo-sm">
                  {prop.icon}
                </div>
                <h2 className="font-display font-extrabold text-sm sm:text-base uppercase tracking-tight text-brand-ink mt-1">
                  {prop.title}
                </h2>
                <p className="font-body text-xs text-neutral-700 leading-tight">
                  {prop.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Shop By Category */}
      <section className="w-full">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 sm:border-b-3 border-brand-ink mb-8">
            <div className="space-y-1">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-pink">
                CURATED ARCHIVES
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
                SHOP BY CATEGORY
              </h2>
            </div>
            <Link href="/shop">
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
              >
                EXPLORE ALL CATEGORIES
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group flex flex-col border-2 sm:border-3 border-brand-ink bg-brand-white shadow-neo hover:shadow-neo-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden border-b-2 border-brand-ink bg-neutral-200">
                  <Image
                    src={cat.imageSrc || "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80"}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {cat.badge && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="pink" shape="square" className="text-[9px] px-1 py-0">
                        {cat.badge}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-3 flex flex-col gap-1">
                  <h3 className="font-display font-bold text-xs sm:text-sm uppercase text-brand-ink line-clamp-1 group-hover:text-brand-pink transition-colors">
                    {cat.name}
                  </h3>
                  <span className="font-mono text-[10px] text-neutral-500 font-bold">
                    {cat.itemCount} EDITS
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Separate Men's & Women's Collection Split Banners */}
      <section className="w-full">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Men's Collection Banner */}
            <div className="relative border-3 sm:border-4 border-brand-ink bg-brand-yellow p-6 sm:p-8 shadow-neo-lg flex flex-col justify-between min-h-[420px] overflow-hidden group">
              <div className="relative z-10 space-y-4 max-w-sm">
                <Badge variant="dark" shape="square" className="text-xs">
                  MEN&apos;S DIVISION
                </Badge>
                <h3 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink leading-tight">
                  RAW SILHOUETTES & MANDARINS
                </h3>
                <p className="font-body text-sm sm:text-base text-neutral-800 leading-relaxed font-medium">
                  Sharp tailoring, heavy woven jacquards, asymmetric kurtas, and pleated trousers crafted for the fearless modern man.
                </p>
                <div className="pt-2">
                  <Link href="/men">
                    <Button
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                    >
                      EXPLORE MEN&apos;S EDIT
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Editorial Image Overlay */}
              <div className="absolute right-[-10%] bottom-[-10%] w-3/5 h-4/5 border-2 border-brand-ink shadow-neo hidden sm:block rotate-[4deg] group-hover:rotate-[2deg] group-hover:scale-105 transition-all duration-300 overflow-hidden bg-neutral-300">
                <Image
                  src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80"
                  alt="Men's collection editorial preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Women's Collection Banner */}
            <div className="relative border-3 sm:border-4 border-brand-ink bg-brand-pink p-6 sm:p-8 shadow-neo-lg flex flex-col justify-between min-h-[420px] overflow-hidden group">
              <div className="relative z-10 space-y-4 max-w-sm">
                <Badge variant="yellow" shape="square" className="text-xs">
                  WOMEN&apos;S DIVISION
                </Badge>
                <h3 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink leading-tight">
                  ANGRAKHA FLUX & MAXI ROBES
                </h3>
                <p className="font-body text-sm sm:text-base text-neutral-900 leading-relaxed font-medium">
                  Maximalist proportions, pure handloom Chanderi silks, architectural boned tops, and statement festival silhouettes.
                </p>
                <div className="pt-2">
                  <Link href="/women">
                    <Button
                      variant="secondary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                    >
                      EXPLORE WOMEN&apos;S EDIT
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Editorial Image Overlay */}
              <div className="absolute right-[-10%] bottom-[-10%] w-3/5 h-4/5 border-2 border-brand-ink shadow-neo hidden sm:block rotate-[-4deg] group-hover:rotate-[-2deg] group-hover:scale-105 transition-all duration-300 overflow-hidden bg-neutral-300">
                <Image
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
                  alt="Women's collection editorial preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. New Arrivals Section */}
      <section className="w-full">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 sm:border-b-3 border-brand-ink mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-pink stroke-[2.5]" />
                <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-pink">
                  FRESH ARCHIVES
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
                NEW DROPS & ARRIVALS
              </h2>
            </div>
            <Link href="/shop?sort=newest">
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
              >
                VIEW ALL NEW DROPS
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Promotional Editorial Banner */}
      <section className="w-full">
        <Container>
          <div className="relative border-3 sm:border-4 border-brand-ink bg-brand-ink text-brand-cream p-8 sm:p-12 shadow-neo-xl overflow-hidden">
            {/* Background Geometric Grid Accent */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFE14A_1px,transparent_1px)] [background-size:16px_16px]"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="yellow" shape="square" className="text-xs">
                    LIMITED FESTIVE PROMO
                  </Badge>
                  <span className="font-mono text-xs uppercase text-brand-pink font-bold">
                    VALID PAN-INDIA
                  </span>
                </div>

                <h2 className="font-display font-extrabold text-3xl sm:text-5xl xl:text-6xl uppercase tracking-tight text-brand-cream leading-[0.95]">
                  THE MONSOON ARCHITECTURE DROP
                </h2>

                <p className="font-body text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
                  Apply code <strong className="text-brand-yellow font-mono text-lg bg-neutral-800 px-2 py-0.5 border border-brand-yellow">BOLD15</strong> at checkout for a flat 15% discount across all bespoke handloom silhouettes. Limited to the first 500 orders.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-start lg:items-end">
                <Link href="/shop" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full justify-center bg-brand-yellow text-brand-ink"
                    rightIcon={<ArrowRight className="w-5 h-5 stroke-[2.5]" />}
                  >
                    CLAIM WITH CODE BOLD15
                  </Button>
                </Link>
                <span className="font-mono text-[11px] text-neutral-400">
                  ⚡ Free shipping applies automatically over ₹1,999
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Best Sellers Section */}
      <section className="w-full">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 sm:border-b-3 border-brand-ink mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-yellow stroke-[2.5]" />
                <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-yellow">
                  ICONIC SILHOUETTES
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
                VASTRAMAY BEST SELLERS
              </h2>
            </div>
            <Link href="/shop?sort=rating">
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
              >
                VIEW ALL BEST SELLERS
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* 8. Fashion & Brand Story Section */}
      <section className="w-full border-y-3 sm:border-y-4 border-brand-ink bg-brand-cream py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Story Visual Frame */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-brand-ink border-3 border-brand-ink translate-x-3 translate-y-3"
                />
                <div className="relative border-3 border-brand-ink bg-brand-white p-4 shadow-neo">
                  <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-brand-ink bg-neutral-200">
                    <Image
                      src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80"
                      alt="Artisan handloom tailoring craftsmanship"
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <span className="font-editorial italic text-base sm:text-lg text-neutral-800">
                      &ldquo;Fashion is not polite decoration. It is structural armor.&rdquo;
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Editorial Copy */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <Badge variant="pink" shape="square" className="text-xs">
                OUR MANIFESTO
              </Badge>

              <div className="space-y-3">
                <p className="font-editorial italic text-2xl sm:text-3xl text-neutral-800">
                  The Tension Between Ancient Looms & Industrial Streetwear
                </p>
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink leading-tight">
                  REJECT FAST-FASHION BLANDNESS. EMBRACE BRUTALIST ROOTS.
                </h2>
              </div>

              <div className="space-y-4 font-body text-base text-neutral-700 leading-relaxed">
                <p>
                  Vastramay was founded on a simple dissatisfaction with mass-market clothing. Mainstream apparel has traded tactile character and cultural pride for homogenized polyester blends and disposable seasons.
                </p>
                <p>
                  We source our slub cottons, hand-woven linens, and Chanderi silks directly from master artisan clusters across Varanasi, Maheshwar, and Bhagalpur. Then, we cut them with heavy drop shoulders, boxy profiles, double-needle topstitching, and utilitarian metal hardware.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link href="/about">
                  <Button
                    variant="primary"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                  >
                    READ OUR FULL STORY
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="md">
                    CONTACT STUDIO
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 9. Trending / Curated Collection Section (Featured Garments) */}
      <section className="w-full">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 sm:border-b-3 border-brand-ink mb-8">
            <div className="space-y-1">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-pink">
                CURATED SPOTLIGHT
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
                THE NEO-HERITAGE EDIT
              </h2>
            </div>
            <Link href="/category/kurtas">
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
              >
                VIEW FULL EDIT
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* 10. Newsletter Subscription Section */}
      <section className="w-full">
        <Container>
          <div className="relative border-3 sm:border-4 border-brand-ink bg-brand-yellow p-8 sm:p-14 shadow-neo-xl">
            <div className="max-w-2xl space-y-4">
              <Badge variant="dark" shape="square" className="text-xs">
                VASTRAMAY INNER CIRCLE
              </Badge>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink leading-tight">
                NEVER MISS A LIMITED RUN DROP
              </h2>
              <p className="font-body text-sm sm:text-base text-neutral-800 leading-relaxed font-medium">
                Subscribe for private invitations to seasonal drops, secret archive sales, and behind-the-scenes artisan studio documentation. (Demo mode: no spam, instant toast confirmation).
              </p>
              <div className="pt-2">
                <HomeNewsletter />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
