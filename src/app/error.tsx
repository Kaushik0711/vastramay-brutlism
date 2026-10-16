"use client";

import React, { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 bg-brand-cream">
      <Container size="narrow">
        <div className="p-8 sm:p-12 bg-brand-white border-3 sm:border-4 border-brand-ink shadow-neo-xl text-center flex flex-col items-center">
          <div className="inline-flex p-3 bg-brand-pink border-2 border-brand-ink shadow-neo-sm mb-4">
            <AlertTriangle className="w-8 h-8 text-brand-ink stroke-[2.5]" />
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-ink uppercase">
            SOMETHING WENT WRONG
          </h1>

          <p className="font-body text-sm text-neutral-600 max-w-md mt-2 mb-6">
            An unexpected error occurred while processing this apparel view. Our engineers have been alerted.
          </p>

          {error.digest && (
            <p className="font-mono text-xs text-neutral-500 bg-neutral-100 p-2 border border-neutral-300 mb-6">
              Error Digest: {error.digest}
            </p>
          )}

          <Button
            variant="secondary"
            size="md"
            onClick={() => reset()}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            TRY AGAIN
          </Button>
        </div>
      </Container>
    </div>
  );
}
