import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import {
  Truck,
  RotateCcw,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export const metadata = {
  title: "Shipping & 7-Day Doorstep Exchanges — Vastramay",
  description:
    "Comprehensive guide to Vastramay shipping timelines, air freight logistics, complimentary delivery thresholds, and 7-day doorstep replacement procedures.",
  alternates: {
    canonical: "/shipping-returns",
  },
};

export default function ShippingReturnsPage() {
  return (
    <div className="w-full py-10 sm:py-16 space-y-12 sm:space-y-16">
      <Container>
        {/* Header */}
        <div className="max-w-3xl space-y-3 pb-8 border-b-2 sm:border-b-3 border-brand-ink">
          <Badge variant="pink" shape="square" className="text-xs">
            LOGISTICS & POLICIES
          </Badge>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
            SHIPPING & RETURNS
          </h1>
          <p className="font-body text-sm sm:text-base text-neutral-600 leading-relaxed">
            Transparent, uncompromised delivery standards and seamless doorstep exchange policies across all Indian postal circles.
          </p>
        </div>

        {/* Demo Disclaimer Banner */}
        <div className="p-4 border-2 sm:border-3 border-brand-ink bg-brand-yellow flex items-start gap-3 shadow-neo">
          <AlertTriangle className="w-5 h-5 text-brand-ink stroke-[2.5] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm font-body text-brand-ink">
            <strong className="font-display uppercase block">
              SAMPLE POLICY SPECIFICATION
            </strong>
            <p>
              This document reflects the operational logistics framework designed for Vastramay storefront demonstration. Actual business commitments and legal terms will be finalized prior to live production operations.
            </p>
          </div>
        </div>

        {/* Shipping Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border-3 border-brand-ink bg-brand-white shadow-neo space-y-3">
            <div className="w-12 h-12 border-2 border-brand-ink bg-brand-yellow flex items-center justify-center shadow-neo-sm">
              <Clock className="w-6 h-6 text-brand-ink" />
            </div>
            <h2 className="font-display font-extrabold text-base uppercase text-brand-ink">
              DISPATCH IN 24H
            </h2>
            <p className="font-body text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Orders confirmed before 2:00 PM IST Monday to Saturday are packaged in heavy-duty weatherproof neo-brutalist packaging and handed to express air logistics partners the same day.
            </p>
          </div>

          <div className="p-6 border-3 border-brand-ink bg-brand-white shadow-neo space-y-3">
            <div className="w-12 h-12 border-2 border-brand-ink bg-brand-pink flex items-center justify-center shadow-neo-sm">
              <Truck className="w-6 h-6 text-brand-ink" />
            </div>
            <h2 className="font-display font-extrabold text-base uppercase text-brand-ink">
              EXPRESS AIR DELIVERY
            </h2>
            <p className="font-body text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Metropolitan areas receive delivery within 2 to 3 business days. Tier-2 and pan-India pin codes are serviced via expedited air routes within 4 to 6 business days.
            </p>
          </div>

          <div className="p-6 border-3 border-brand-ink bg-brand-white shadow-neo space-y-3">
            <div className="w-12 h-12 border-2 border-brand-ink bg-brand-cream flex items-center justify-center shadow-neo-sm">
              <RotateCcw className="w-6 h-6 text-brand-ink" />
            </div>
            <h2 className="font-display font-extrabold text-base uppercase text-brand-ink">
              7-DAY DOORSTEP EXCHANGE
            </h2>
            <p className="font-body text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Wrong fit? We coordinate doorstep reverse pickup directly from your address. The courier picks up the original garment and hands over your replacement in one seamless loop.
            </p>
          </div>
        </div>

        {/* Step-by-Step Exchange Flow */}
        <div className="space-y-6 pt-6">
          <h2 className="font-display font-extrabold text-2xl uppercase tracking-tight text-brand-ink pb-3 border-b-2 border-brand-ink">
            THE 3-STEP DOORSTEP EXCHANGE PROCESS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 border-2 border-brand-ink bg-brand-cream shadow-neo-sm space-y-2">
              <div className="font-mono text-xs font-bold text-brand-pink">STEP 01</div>
              <h3 className="font-display font-extrabold text-base uppercase text-brand-ink">
                Initiate Request
              </h3>
              <p className="font-body text-xs text-neutral-700 leading-relaxed">
                Contact our customer desk at care@vastramay.demo within 7 days of receiving your package. Specify your order ID and the desired replacement size or style.
              </p>
            </div>

            <div className="p-5 border-2 border-brand-ink bg-brand-cream shadow-neo-sm space-y-2">
              <div className="font-mono text-xs font-bold text-brand-pink">STEP 02</div>
              <h3 className="font-display font-extrabold text-base uppercase text-brand-ink">
                Doorstep Reverse Pickup
              </h3>
              <p className="font-body text-xs text-neutral-700 leading-relaxed">
                Our logistics representative arrives at your address to collect the garment. Ensure original security seals and tags are attached.
              </p>
            </div>

            <div className="p-5 border-2 border-brand-ink bg-brand-cream shadow-neo-sm space-y-2">
              <div className="font-mono text-xs font-bold text-brand-pink">STEP 03</div>
              <h3 className="font-display font-extrabold text-base uppercase text-brand-ink">
                Immediate Dispatch
              </h3>
              <p className="font-body text-xs text-neutral-700 leading-relaxed">
                Your replacement piece is dispatched with priority courier priority immediately upon inspection, with fresh tracking details sent to your phone.
              </p>
            </div>
          </div>
        </div>

        {/* Conditions and Exclusions */}
        <div className="p-6 border-3 border-brand-ink bg-brand-white shadow-neo space-y-4">
          <h2 className="font-display font-extrabold text-lg uppercase text-brand-ink pb-2 border-b-2 border-brand-ink">
            EXCHANGE CONDITIONS & FABRIC CRITERIA
          </h2>

          <ul className="space-y-2 font-body text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Garments must be in pristine unworn condition with zero perfume, deodorant, or makeup marks.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>All original neo-brutalist cardboard hangtags and barcode security clips must remain securely attached.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Bespoke custom-altered silhouettes or garments purchased during final clearance archive sales are non-exchangeable.</span>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
