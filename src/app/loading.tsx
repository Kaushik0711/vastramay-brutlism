import React from "react";
import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20">
      <Container size="narrow" className="flex flex-col items-center justify-center text-center">
        <div className="relative p-6 bg-brand-white border-3 border-brand-ink shadow-neo-lg flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-ink border-t-brand-pink rounded-none animate-spin" />
          <div className="space-y-1">
            <h2 className="font-display font-extrabold text-lg uppercase tracking-wider text-brand-ink">
              LOADING VASTRAMAY
            </h2>
            <p className="font-mono text-xs text-neutral-600">
              SYNCHRONIZING APPAREL EDITS...
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
