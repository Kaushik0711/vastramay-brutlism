import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Privacy Policy (Draft) — Vastramay",
  description:
    "Starter privacy policy draft for Vastramay e-commerce platform outlining customer data principles, cookie policies, and regulatory compliance considerations.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full py-10 sm:py-16 space-y-10">
      <Container>
        {/* Header */}
        <div className="max-w-3xl space-y-3 pb-8 border-b-2 sm:border-b-3 border-brand-ink">
          <Badge variant="pink" shape="square" className="text-xs">
            LEGAL SPECIFICATION DRAFT
          </Badge>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
            PRIVACY POLICY
          </h1>
          <p className="font-body text-sm text-neutral-600">
            Last Updated: October 2026 · Architectural Version 3.0
          </p>
        </div>

        {/* Prominent Legal Disclaimer Banner */}
        <div className="p-4 border-2 sm:border-3 border-brand-ink bg-brand-yellow flex items-start gap-3 shadow-neo max-w-4xl">
          <AlertTriangle className="w-5 h-5 text-brand-ink stroke-[2.5] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm font-body text-brand-ink">
            <strong className="font-display uppercase block">
              STARTER DRAFT NOTICE — NOT LEGAL COUNSEL
            </strong>
            <p>
              This document serves as an architectural template draft for the Vastramay storefront demonstration. Before commercial operations or collecting customer PII at scale, this policy must undergo legal audit for compliance with India&apos;s Digital Personal Data Protection Act (DPDP Act 2023) and applicable global privacy mandates.
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <div className="max-w-4xl space-y-8 font-body text-sm text-neutral-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-lg uppercase text-brand-ink pb-1 border-b border-brand-ink">
              1. COLLECTION OF INFORMATION
            </h2>
            <p>
              When you browse our storefront, register for product drop notifications, or simulate checkout sessions, we may collect information including your name, email address, contact telephone number, and physical shipping address.
            </p>
            <p>
              Device analytics, IP addresses, browser types, and navigation telemetry may be captured automatically for performance monitoring and user experience optimization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-lg uppercase text-brand-ink pb-1 border-b border-brand-ink">
              2. USE OF CUSTOMER DATA
            </h2>
            <p>We utilize the collected information strictly for legitimate operational purposes:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Facilitating garment order fulfillment, courier transit, and delivery updates.</li>
              <li>Processing customer care inquiries and sizing consultations.</li>
              <li>Transmitting early access drop announcements (only with explicit consent).</li>
              <li>Detecting fraudulent sessions and preventing security abuse.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-lg uppercase text-brand-ink pb-1 border-b border-brand-ink">
              3. DATA SECURITY & THIRD-PARTY SHARING
            </h2>
            <p>
              We implement industry-standard 256-bit encryption for all data in transit. Customer data is never sold, leased, or monetized to commercial third-party advertising brokers. Data is shared exclusively with certified logistics couriers and PCI-DSS compliant payment gateways strictly to fulfill transactions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-lg uppercase text-brand-ink pb-1 border-b border-brand-ink">
              4. YOUR RIGHTS & DATA REQUESTS
            </h2>
            <p>
              Under applicable Indian privacy regulations, you have the right to request access to, correction of, or permanent erasure of your personal records. For inquiries, reach out to our compliance desk at{" "}
              <Link href="/contact" className="font-mono text-brand-pink font-bold underline">
                care@vastramay.demo
              </Link>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
