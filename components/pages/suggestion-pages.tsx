'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { ErrorStage, ErrorStageType } from '../app/error-stage';
import useInfiniteQueryPages from '@/hooks/use-infinity-query-pages';
import PageCard from '../page/page-card';

type SuggestionPagesProps = React.HTMLAttributes<HTMLDivElement>;

export default function SuggestionPages({ className }: SuggestionPagesProps) {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isLoading, refetch } = useInfiniteQueryPages({});

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const pages = useMemo(
    () => data?.pages.map((page) => page.items).flat() ?? [],
    [data?.pages],
  );

  const sanitizedData = useMemo(() => pages.filter((item) => item), [pages]);

  if (isLoading) return <div>Loading...</div>;

  if (sanitizedData.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="grid gap-2 xs:grid-cols-2 md:grid-cols-3">
        {sanitizedData.map((item) => (
          <PageCard
            key={item._id}
            avatar={item.image_page[0] ?? null}
            pageId={item._id}
            name={item.name}
            description={item.description}
            usersLiked={item.likes.length}
            usersFollowing={item.followers.length}
            onSuccessfulLike={refetch}
          />
        ))}
      </div>

      <div ref={ref} onClick={() => fetchNextPage()} />
    </div>
  );
}
