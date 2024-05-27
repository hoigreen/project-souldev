import { getRecommendPeoples } from '@/lib/actions/profile';
import { ListPeoplesWithPaginationResponse } from '@/lib/definitions';
import type { InfiniteData } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useInfiniteQueryPeoples({
  initialData,
}: {
  initialData?: InfiniteData<ListPeoplesWithPaginationResponse, number>;
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
      const response = await getRecommendPeoples({ page: pageParam });

      if (!response) {
        throw new Error('No response');
      }

      return response;
    },
    queryKey: ['infinite-get-posts', initialData],
  });

  return query;
}
