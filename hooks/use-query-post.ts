import { getPostById } from '@/lib/actions/posts';
import { useQuery } from '@tanstack/react-query';

export default function useQueryPost({ postId }: { postId: string }) {
  const query = useQuery({
    queryKey: ['query-get-post', postId],
    queryFn: async () => await getPostById({ postId }),
  });

  return query;
}
