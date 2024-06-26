import { PostsResponse } from '@/lib/definitions';
import { Params, Query } from '@/lib/url-builder';
import type { InfiniteData } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useInfiniteQueryPosts({
  params,
  initialData,
  queryFunction,
}: {
  params?: Params;
  initialData?: InfiniteData<PostsResponse, number>;
  queryFunction: ({
    params,
    query,
  }: {
    params?: Params;
    query?: Query;
  }) => Promise<PostsResponse>;
}) {
  const query = useInfiniteQuery({
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.page === lastPage.totalPage) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    initialData,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await queryFunction({
        params,
        query: { page: pageParam },
      });

      if (!response) {
        throw new Error('No response');
      }

      return response;
    },
    queryKey: ['infinite-get-posts', initialData],
  });

  return query;
}
