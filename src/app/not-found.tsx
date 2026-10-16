import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 bg-brand-cream">
      <Container size="narrow">
        <div className="p-8 sm:p-12 bg-brand-white border-3 sm:border-4 border-brand-ink shadow-neo-xl text-center flex flex-col items-center">
          <div className="inline-flex p-3 bg-brand-yellow border-2 border-brand-ink shadow-neo-sm mb-4">
            <Compass className="w-8 h-8 text-brand-ink stroke-[2.5]" />
          </div>

          <span className="font-display font-extrabold text-6xl sm:text-8xl text-brand-pink tracking-tighter">
            404
          </span>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-ink uppercase mt-2">
            PAGE NOT FOUND
          </h1>

          <p className="font-body text-sm sm:text-base text-neutral-600 max-w-md mt-3 mb-8">
            The edit or garment you are looking for has been archived, shifted, or does not exist in our catalog.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/">
              <Button
                variant="primary"
                size="md"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                RETURN HOME
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" size="md">
                EXPLORE CATALOG
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
