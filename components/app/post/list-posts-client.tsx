'use client';

import { PostsResponse, SearchParams } from '@/lib/definitions';
import React, { useEffect, useMemo } from 'react';
import PostCard from './post-card';
import useInfiniteQueryPosts from '@/hooks/use-infinity-query-posts';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Spinner } from '../spinner';

type ListPostsClientProps = React.HTMLAttributes<HTMLDivElement> & {
  currentUserId: string;
  searchParams: SearchParams;
  data: PostsResponse;
};

export default function ListPostsClient({
  currentUserId,
  className,
  // searchParams,
  data,
}: ListPostsClientProps) {
  const { ref, inView } = useInView();
  const t = useTranslations('Home');

  const {
    data: postsResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQueryPosts({
    initialData: {
      pages: [data],
      pageParams: [1],
    },
  });

  const loadMoreContent = useMemo(() => {
    if (isFetchingNextPage) {
      return t('M3');
    } else if (hasNextPage) {
      return t('M4');
    }

    return t('M5');
  }, [t, isFetchingNextPage, hasNextPage]);

  const posts = useMemo(
    () => postsResponse?.pages.map((page) => page.items).flat() ?? [],
    [postsResponse?.pages],
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className={cn('mt-9 flex flex-col gap-10', className)}>
      {posts.map((item) => (
        <PostCard
          key={item._id}
          reactions={[]}
          id={item._id}
          currentUserId={currentUserId}
          content={item.content}
          author={item.user_id}
          page={null}
          createdAt={item.createdAt}
          comments={[]}
        />
      ))}

      <div
        ref={ref}
        className="flex items-center justify-center gap-3 py-3 "
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage && <Spinner />}
        <span className="block text-sm italic">{loadMoreContent}</span>
      </div>
    </div>
  );
}