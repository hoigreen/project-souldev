import { cn } from '@/lib/utils';
import React from 'react';
import { Skeleton, TextSkeleton } from '../ui/skeleton';
import { range } from 'lodash';

export function GroupBoxListLoading({ className }: { className?: string }) {
  return range(4).map((item) => (
    <div
      key={item}
      className={cn('flex w-full items-center gap-2 p-2', className)}
    >
      <Skeleton className="aspect-square size-14 rounded-lg" />

      <div className="grow space-y-1">
        <TextSkeleton text="base" />
        <TextSkeleton text="sm" />
      </div>

      <Skeleton className="h-10 w-24" />
    </div>
  ));
}
