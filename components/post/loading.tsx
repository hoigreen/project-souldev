import { Card } from '@/components/ui/card';
import { Skeleton, TextSkeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ArchiveMinus, Clock } from 'iconsax-react';
import { map, range } from 'lodash';
import React from 'react';
import { Button } from '../ui/button';

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

export function PostCardLoading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-xl bg-white px-3 py-4 shadow-lg dark:bg-black max-xl:border md:p-7',
        className,
      )}
    >
      <div className="flex size-full grow flex-col gap-3">
        <div className="flex w-full justify-between">
          <div className="flex items-start gap-2">
            <Skeleton className="aspect-square size-12 cursor-pointer rounded-full border" />

            <div className="space-y-1">
              <div className="space-y-2">
                <TextSkeleton text="xl" className="w-24" />
                <div className="flex items-center gap-1">
                  <Clock className="size-3" variant="TwoTone" />
                  <TextSkeleton text="sm" className="w-20" />
                </div>
              </div>
            </div>
          </div>

          <ArchiveMinus size={24} variant="TwoTone" />
        </div>

        <div className="h-full min-h-max grow">
          <TextSkeleton text="lg" className="w-full" />
          <TextSkeleton text="lg" className="w-full" />
          <TextSkeleton text="lg" className="w-full" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="mt-3 flex items-center justify-between">
          <div className="flex cursor-pointer items-center gap-2 hover:opacity-90">
            {range(2).map((like, index) => (
              <Skeleton
                key={like}
                className={cn('size-6', index !== 0 && '-ml-5')}
              />
            ))}

            <Skeleton className="mt-1 h-5 w-20" />
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <TextSkeleton className="h-5 w-8" />
            <TextSkeleton className="h-5 w-8" />
          </div>
        </div>

        <div className="flex divide-x border-t border-neutral-200 dark:border-neutral-700">
          {range(3).map((action) => (
            <Button
              key={action}
              variant="ghost"
              className="grow gap-2 rounded-none bg-transparent px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-600"
            >
              <Skeleton className="size-5 text-foreground" />
              <Skeleton className="h-5 w-20" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ListPostsClientLoading({
  className,
  count = 4,
}: {
  className?: string;
  count?: number;
}) {
  return (
    <div className={cn('mt-9 flex flex-col gap-10', className)}>
      <TextSkeleton text="2xl" className="w-24" />

      {range(count).map((item) => (
        <PostCardLoading key={item} />
      ))}
    </div>
  );
}
