"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_SECTIONS = [
  {
    category: "orders",
    title: "Orders & Shipping",
    items: [
      {
        id: "orders-1",
        title: "HOW LONG DOES EXPRESS AIR DELIVERY TAKE?",
        content:
          "All orders placed before 2:00 PM IST are processed and dispatched on the same business day from our central studio. Metropolitan deliveries (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata) typically arrive within 2 to 3 business days. Tier-2 and regional destinations across Pan-India take 4 to 6 business days.",
      },
      {
        id: "orders-2",
        title: "HOW DO I QUALIFY FOR COMPLIMENTARY FREE SHIPPING?",
        content:
          "All orders totaling ₹1,999 or more automatically qualify for complimentary express air shipping across India. For orders under ₹1,999, a flat standard logistics fee of ₹199 is calculated at checkout.",
      },
      {
        id: "orders-3",
        title: "HOW DO I TRACK MY DISPATCHED SHIPMENT?",
        content:
          "Once your garments are packed and handed over to our verified air freight partners (Blue Dart / Delhivery / Bluedart Air), you will receive an SMS and email notification containing your live AWB tracking number and real-time transit updates.",
      },
    ],
  },
  {
    category: "sizing",
    title: "Sizing & Fit",
    items: [
      {
        id: "sizing-1",
        title: "WHAT IS THE INTENDED FIT OF VASTRAMAY SILHOUETTES?",
        content:
          "Our designs follow architectural neo-brutalism aesthetics. Many of our garments feature deliberate ease, dropped shoulders, and structured volume. If you prefer a tailored runway drape, select your exact measurement from our Size Guide. If you prefer a dramatic oversized streetwear silhouette, select one size up.",
      },
      {
        id: "sizing-2",
        title: "DO YOU OFFER DOORSTEP SIZE EXCHANGES?",
        content:
          "Yes. If the size you ordered doesn't feel right, you can initiate a doorstep size exchange within 7 days of delivery. Our courier partner will deliver the new size and collect the previous one in a single coordinated visit.",
      },
    ],
  },
  {
    category: "returns",
    title: "Returns & Exchanges",
    items: [
      {
        id: "returns-1",
        title: "WHAT IS YOUR 7-DAY EXCHANGE POLICY?",
        content:
          "We offer a 7-day doorstep replacement or store credit exchange window from the date of physical delivery. Garments must be unwashed, unworn, and retain all original neo-brutalist studio tags and security seals intact.",
      },
      {
        id: "returns-2",
        title: "HOW DOES REVERSE PICKUP WORK?",
        content:
          "Once you initiate an exchange through our customer desk, our logistics partner will arrange a doorstep reverse pickup from your registered delivery address within 24 to 48 hours.",
      },
    ],
  },
  {
    category: "fabrics",
    title: "Handloom Care & Fabrics",
    items: [
      {
        id: "fabrics-1",
        title: "ARE ALL FABRICS NATURAL HANDLOOMS?",
        content:
          "Yes. Vastramay strictly uses natural long-staple slub cottons, hand-woven linens, pure silk-cotton jacquards, and Chanderi weaves sourced directly from artisanal clusters. We do not use cheap polyester syntheses or fast-fashion synthetic blends.",
      },
      {
        id: "fabrics-2",
        title: "HOW SHOULD I WASH STRUCTURED JACQUARDS AND KURTAS?",
        content:
          "We advise professional dry cleaning for heavy jacquards and silk blends to preserve their crisp architectural structure and rich dye depth. Pure cotton kurtas can be cold machine-washed on a gentle cycle, dried in the shade, and pressed with a warm iron on reverse.",
      },
    ],
  },
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const displayedSections =
    activeTab === "all"
      ? FAQ_SECTIONS
      : FAQ_SECTIONS.filter((s) => s.category === activeTab);

  return (
    <div className="w-full py-10 sm:py-16 space-y-12">
      <Container>
        {/* Header */}
        <div className="max-w-3xl space-y-3 pb-8 border-b-2 sm:border-b-3 border-brand-ink">
          <Badge variant="yellow" shape="square" className="text-xs">
            KNOWLEDGE BASE
          </Badge>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="font-body text-sm sm:text-base text-neutral-600 leading-relaxed">
            Everything you need to know about our handloom construction, sizing standards, pan-India express dispatches, and doorstep exchanges.
          </p>
        </div>

        {/* Filter Category Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-4 py-2 border-2 border-brand-ink font-display text-xs sm:text-sm font-bold uppercase transition-all shadow-neo-sm cursor-pointer",
              activeTab === "all"
                ? "bg-brand-pink text-brand-ink translate-x-[-1px] translate-y-[-1px] shadow-neo"
                : "bg-brand-white text-brand-ink hover:bg-brand-cream"
            )}
          >
            All Questions
          </button>
          {FAQ_SECTIONS.map((sec) => (
            <button
              key={sec.category}
              type="button"
              onClick={() => setActiveTab(sec.category)}
              className={cn(
                "px-4 py-2 border-2 border-brand-ink font-display text-xs sm:text-sm font-bold uppercase transition-all shadow-neo-sm cursor-pointer",
                activeTab === sec.category
                  ? "bg-brand-yellow text-brand-ink translate-x-[-1px] translate-y-[-1px] shadow-neo"
                  : "bg-brand-white text-brand-ink hover:bg-brand-cream"
              )}
            >
              {sec.title}
            </button>
          ))}
        </div>

        {/* Accordions by category */}
        <div className="space-y-10 max-w-4xl pt-4">
          {displayedSections.map((sec) => (
            <div key={sec.category} className="space-y-4">
              <h2 className="font-display font-extrabold text-xl uppercase tracking-tight text-brand-ink pb-2 border-b-2 border-brand-ink flex items-center gap-2">
                <span className="w-3 h-3 bg-brand-pink border border-brand-ink inline-block" />
                {sec.title}
              </h2>

              <Accordion
                type="multiple"
                defaultExpanded={[sec.items[0]?.id]}
                items={sec.items}
              />
            </div>
          ))}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-16 p-8 border-3 sm:border-4 border-brand-ink bg-brand-yellow shadow-neo-lg max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-brand-ink">
              STILL HAVE QUESTIONS ABOUT A SPECIFIC GARMENT?
            </h3>
            <p className="font-body text-sm text-neutral-800 font-medium">
              Our studio team can provide exact fabric swatches and customized measurement guidance.
            </p>
          </div>
          <Link href="/contact" className="shrink-0">
            <Button
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
            >
              TALK TO STUDIO
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
