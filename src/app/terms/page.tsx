import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Terms of Service (Draft) — Vastramay",
  description:
    "Starter terms of service draft for the Vastramay storefront governing website access, intellectual property, garment purchases, and dispute resolution.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="w-full py-10 sm:py-16 space-y-10">
      <Container>
        {/* Header */}
        <div className="max-w-3xl space-y-3 pb-8 border-b-2 sm:border-b-3 border-brand-ink">
          <Badge variant="yellow" shape="square" className="text-xs">
            LEGAL SPECIFICATION DRAFT
          </Badge>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
            TERMS OF SERVICE
          </h1>
          <p className="font-body text-sm text-neutral-600">
            Last Updated: October 2026 · Architectural Version 3.0
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="p-4 border-2 sm:border-3 border-brand-ink bg-brand-pink flex items-start gap-3 shadow-neo max-w-4xl">
          <AlertTriangle className="w-5 h-5 text-brand-ink stroke-[2.5] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm font-body text-brand-ink">
            <strong className="font-display uppercase block">
              STARTER TEMPLATE NOTICE
            </strong>
            <p>
              These Terms of Service are starter placeholders prepared for the architectural storefront demonstration of Vastramay. Formal commercial operations require comprehensive legal verification according to Indian contract law and the Information Technology Act.
            </p>
          </div>
        </div>

        {/* Terms Body */}
        <div className="max-w-4xl space-y-8 font-body text-sm text-neutral-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-lg uppercase text-brand-ink pb-1 border-b border-brand-ink">
              1. ACCEPTANCE OF TERMS
            </h2>
            <p>
              By accessing, browsing, or utilizing the Vastramay website and digital storefront, you agree to be bound by these Terms of Service. If you do not consent to all conditions outlined herein, you must refrain from using the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-lg uppercase text-brand-ink pb-1 border-b border-brand-ink">
              2. INTELLECTUAL PROPERTY & DESIGN INTEGRITY
            </h2>
            <p>
              All silhouettes, pattern geometry, editorial photography, typography layouts, design tokens, graphics, and neo-brutalist digital assets are the intellectual property of Vastramay. Unauthorized reproduction, commercial scraping, or derivative exploitation is strictly prohibited without prior written license.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-lg uppercase text-brand-ink pb-1 border-b border-brand-ink">
              3. PRODUCT AVAILABILITY & HANDLOOM VARIATIONS
            </h2>
            <p>
              Because our garments utilize authentic artisanal handloom weaves, subtle irregularities in slub texture, weave density, and yarn coloration are inherent characteristics of handmade craftsmanship and are celebrated rather than treated as manufacturing defects.
            </p>
            <p>
              We reserve the right to limit order quantities per customer and withdraw items from seasonal drops without prior liability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-lg uppercase text-brand-ink pb-1 border-b border-brand-ink">
              4. PRICING & TRANSACTION DISPUTES
            </h2>
            <p>
              All prices listed on the storefront are denominated in Indian Rupees (INR) and inclusive of applicable Goods and Services Tax (GST). Any legal disputes arising under these terms shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra, India.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
