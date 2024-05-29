import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import React from 'react';

export function RecommendPeoplesLoadingSkeleton({
  className,
}: {
  className?: string;
}) {
  return Array.from({ length: 5 }).map((_, index) => (
    <div
      key={index}
      className={cn(
        'flex max-w-52 flex-[0_0_54%] select-none flex-col items-center gap-8 overflow-hidden rounded-lg border px-2 py-3 sm:flex-[0_0_33%] md:flex-[0_0_30%] lg:flex-[0_0_25%]',
        className,
      )}
    >
      <Skeleton className="size-20 rounded-full sm:size-28" />

      <div className="flex w-full flex-col items-center gap-3">
        <Skeleton className="h-10 w-24" />

        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  ));
}

export function ListPeoplesLoading({ className }: { className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 gap-2 md:grid-cols-2', className)}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          className="flex items-center gap-3 rounded-lg border p-3"
        >
          <Skeleton className="size-16 rounded-full" />

          <div className="flex grow items-center justify-between gap-2">
            <div className="grow">
              <Skeleton className="h-12 w-36" />
            </div>

            <Skeleton className="h-12 w-24" />
          </div>
        </Card>
      ))}
    </div>
  );
}
