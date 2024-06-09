import { getGroups } from '@/lib/actions/group';
import { GroupsResponse } from '@/lib/definitions';
import type { InfiniteData } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useInfiniteQueryPages({
  initialData,
}: {
  initialData?: InfiniteData<GroupsResponse, number>;
}) {
  const query = useInfiniteQuery({
    queryKey: ['infinite-get-groups', initialData],
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.page === lastPage.totalPage) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    initialData,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await getGroups({ page: pageParam });

      if (!response) {
        throw new Error('No response');
      }

      return response;
    },
  });

  return query;
}
