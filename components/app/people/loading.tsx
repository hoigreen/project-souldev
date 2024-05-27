import { Card } from '@/components/ui/card';
import { Skeleton, TextSkeleton } from '@/components/ui/skeleton';
import React from 'react';

export function RecommendPeoplesLoadingSkeleton() {
  return Array.from({ length: 5 }).map((item, index) => (
    <div
      key={index}
      className="flex flex-[0_0_40%] flex-col items-center gap-8 overflow-hidden rounded-lg border px-2 py-3 sm:flex-[0_0_33%] md:flex-[0_0_30%] lg:flex-[0_0_25%]"
    >
      <Skeleton className="size-28 rounded-full" />

      <div className="flex w-full flex-col items-center gap-3">
        <Skeleton className="h-10 w-24" />

        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  ));
}
