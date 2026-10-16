import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Compass, Scissors, Layers } from "lucide-react";

export const metadata = {
  title: "About Vastramay — The Neo-Brutalist Fashion Collective",
  description:
    "Learn about Vastramay's mission to bridge India's master handlooms with uncompromising industrial neo-brutalism and architectural streetwear.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="w-full py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="w-full">
        <Container>
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="pink" shape="square" className="text-xs">
                BRAND MANIFESTO
              </Badge>
              <Badge variant="yellow" shape="square" className="text-xs">
                FOUNDED 2026
              </Badge>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl uppercase tracking-tight text-brand-ink leading-[0.95]">
              WEAR THE ATTITUDE. <br />
              <span className="bg-brand-yellow px-2 border-2 sm:border-3 border-brand-ink shadow-neo inline-block rotate-[-1deg] mt-2">
                REJECT THE MOLD.
              </span>
            </h1>

            <p className="font-editorial italic text-2xl sm:text-3xl text-neutral-800 leading-snug">
              Indian textiles are not museum relics. They are structural armor for the modern world.
            </p>
          </div>
        </Container>
      </section>

      {/* Editorial Story Grid */}
      <section className="w-full">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Frame */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-brand-pink border-3 border-brand-ink translate-x-3 translate-y-3"
                />
                <div className="relative border-3 sm:border-4 border-brand-ink bg-brand-white p-4 shadow-neo-lg">
                  <div className="relative aspect-[3/4] w-full overflow-hidden border-2 border-brand-ink bg-neutral-200">
                    <Image
                      src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80"
                      alt="Vastramay studio craftsmanship"
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <span className="font-mono text-xs uppercase font-extrabold text-brand-ink">
                      STUDIO ARCHIVE · TEXTILE RESEARCH &apos;26
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-brand-ink">
                THE NEO-BRUTALIST TENSION
              </h2>

              <div className="space-y-4 font-body text-base text-neutral-700 leading-relaxed">
                <p>
                  Vastramay was born from an irreconcilable tension between two worlds: the breathtaking organic complexity of Indian heritage handlooms and the raw, unapologetic geometry of architectural neo-brutalism.
                </p>
                <p>
                  For decades, traditional ethnic wear has been relegated to celebratory occasions, laden with delicate adornments that feel disconnected from everyday urban life. Simultaneously, modern streetwear has grown bland, reliant on cheap polyester syntheses and cookie-cutter graphics.
                </p>
                <p>
                  We disrupt both extremes. We take raw, uncompromised slub cottons, heavy silk jacquards, and pure Chanderi textiles, and engineer them into boxy overshirts, double-pleated trousers, and structured Mandarin jackets with industrial metal hardware and sharp-offset silhouettes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 border-2 border-brand-ink bg-brand-cream shadow-neo-sm space-y-1">
                  <span className="font-display font-extrabold text-sm uppercase text-brand-ink block">
                    Zero Synthetic Shortcuts
                  </span>
                  <p className="font-body text-xs text-neutral-600">
                    Natural fibers only: long-staple cottons, raw denims, and woven silks.
                  </p>
                </div>

                <div className="p-4 border-2 border-brand-ink bg-brand-cream shadow-neo-sm space-y-1">
                  <span className="font-display font-extrabold text-sm uppercase text-brand-ink block">
                    Small Batch Drops
                  </span>
                  <p className="font-body text-xs text-neutral-600">
                    Engineered in limited series to eradicate fast-fashion inventory waste.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3 Core Pillars */}
      <section className="w-full border-y-3 sm:border-y-4 border-brand-ink bg-brand-cream py-16">
        <Container>
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <Badge variant="yellow" shape="square" className="text-xs">
                CORE PRINCIPLES
              </Badge>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
                OUR THREE PILLARS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Compass className="w-7 h-7" />,
                  title: "ARCHITECTURAL CUTS",
                  desc: "We treat pattern-making like structural drafting. Sharp drop shoulders, angular plackets, high standing collars, and purposeful volume.",
                },
                {
                  icon: <Scissors className="w-7 h-7" />,
                  title: "MASTER HANDLOOMS",
                  desc: "Direct partnerships with artisan clusters across India, honoring centuries of handloom expertise without sentimental compromise.",
                },
                {
                  icon: <Layers className="w-7 h-7" />,
                  title: "DURABILITY AS A VIRTUE",
                  desc: "Double-needle chain-stitching, reinforced bar-tacks, and heavy 280+ GSM textiles built to endure years of intense daily wear.",
                },
              ].map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 border-3 border-brand-ink bg-brand-white shadow-neo space-y-4 flex flex-col justify-between"
                >
                  <div className="w-12 h-12 border-2 border-brand-ink bg-brand-yellow flex items-center justify-center shadow-neo-sm">
                    {pillar.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-lg uppercase tracking-tight text-brand-ink">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-sm text-neutral-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="pt-2 font-mono text-[10px] uppercase font-bold text-neutral-400">
                    PILLAR 0{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="w-full text-center">
        <Container>
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-brand-ink">
              EXPERIENCE THE ARCHIVE
            </h2>
            <p className="font-body text-sm sm:text-base text-neutral-600">
              Browse our latest releases or contact our studio for styling inquiries.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/shop">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                >
                  EXPLORE ALL EDITS
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  TALK TO STUDIO
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
