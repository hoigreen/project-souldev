import { getPostById } from '@/lib/actions/post';
import { useQuery } from '@tanstack/react-query';

export default function useQueryPost({ postId }: { postId: string }) {
  const query = useQuery({
    queryKey: ['query-get-post', postId],
    queryFn: async () => await getPostById({ postId }),
    enabled: !!postId,
  });

  return query;
}
