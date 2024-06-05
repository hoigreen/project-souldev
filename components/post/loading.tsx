import { Card } from '@/components/ui/card';
import { Skeleton, TextSkeleton } from '@/components/ui/skeleton';
import React from 'react';

export function ProfileCardLoadingSkeleton() {
  return (
    <Card className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col-reverse gap-4 md:flex-row md:items-start md:justify-between md:gap-0">
        <div className="flex gap-3 md:gap-4 lg:gap-6">
          <div className="relative">
            <Skeleton className="size-28 rounded-full md:size-36" />
          </div>

          <div className="space-y-3">
            <TextSkeleton text="2xl" />
            <TextSkeleton />
            <TextSkeleton />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 md:gap-4">
          <Skeleton className="h-12 min-w-24" />
          <Skeleton className="h-12 min-w-24" />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-6 md:flex-row md:justify-between md:gap-0">
        <TextSkeleton />

        <div className="flex items-center gap-4 md:gap-6">
          <TextSkeleton />
          <TextSkeleton />
          <TextSkeleton />
          <TextSkeleton />
        </div>
      </div>
    </Card>
  );
}
