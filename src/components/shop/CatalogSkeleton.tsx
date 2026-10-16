import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export function CatalogSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      <div className="space-y-3 pb-6 border-b-2 border-brand-ink">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="hidden lg:block lg:col-span-3 border-3 border-brand-ink p-5 bg-brand-cream space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>

        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border-2 border-brand-ink bg-brand-white p-4 space-y-3">
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
