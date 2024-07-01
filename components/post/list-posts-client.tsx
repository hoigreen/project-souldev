'use client';

import { PostsResponse } from '@/lib/definitions';
import React, { useEffect, useMemo } from 'react';
import PostCard from './post-card';
import useInfiniteQueryPosts from '@/hooks/use-infinity-query-posts';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Params, Query } from '@/lib/url-builder';
import { Heading } from '../app/heading';
import { PostCardLoading } from './loading';

type ListPostsClientProps = React.HTMLAttributes<HTMLDivElement> & {
  params?: Params;
  data: PostsResponse;
  currentUserId: string;
  queryFunction: ({
    params,
    query,
  }: {
    params?: Params;
    query?: Query;
  }) => Promise<PostsResponse>;
};

export default function ListPostsClient({
  className,
  currentUserId,
  data,
  params,
  queryFunction,
}: ListPostsClientProps) {
  const { ref, inView } = useInView();
  const t = useTranslations('Home');

  const {
    data: postsResponse,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQueryPosts({
    params,
    initialData: {
      pages: [data],
      pageParams: [1],
    },
    queryFunction,
  });

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
      <Heading title={t('M154')} size={1} />

      {posts.map((item, index) => (
        <PostCard
          key={index}
          page={item.page_id}
          group={item.group_id}
          id={item._id}
          author={item.user_id}
          created={item.created}
          countComments={item.commentsCount}
          currentUserId={currentUserId}
          {...item}
        />
      ))}

      <div ref={ref} onClick={() => fetchNextPage()}>
        {isFetchingNextPage && <PostCardLoading />}
      </div>
    </div>
  );
}
