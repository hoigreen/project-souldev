import { getPages } from '@/lib/actions/page';
import { Page, PaginationsResponse } from '@/lib/definitions';
import type { InfiniteData } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useInfiniteQueryPages({
  initialData,
}: {
  initialData?: InfiniteData<PaginationsResponse<Page[]>, number>;
}) {
  const query = useInfiniteQuery({
    queryKey: ['infinite-get-pages', initialData],
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.page === lastPage.totalPage) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    initialData,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await getPages({ page: pageParam });

      if (!response) {
        throw new Error('No response');
      }

      return response;
    },
  });

  return query;
}
