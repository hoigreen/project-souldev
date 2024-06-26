'use client';

import React from 'react';
import { useRouter } from '@/navigation';
import { Heart } from 'iconsax-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { likePost, unlikePost } from '@/lib/actions/post';
import { Button } from '@/components/ui/button';
import { Spinner } from '../app/spinner';

export default function ReactPost({
  postId,
  isLike = false,
  onReactedSuccess,
  totalLikes,
  isInPost = false,
}: {
  postId: string;
  isLike?: boolean;
  onReactedSuccess?: () => void;
  totalLikes?: number;
  isInPost?: boolean;
}) {
  const [isLiked, setIsLiked] = React.useState(isLike);
  const t = useTranslations('Home');
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const handleClick = async () => {
    if (isLike) {
      await unlikePost({ postId });
    } else {
      await likePost({ postId });
    }

    startTransition(() => {
      setIsLiked(!isLiked);
      router.refresh();
      onReactedSuccess && onReactedSuccess();
    });
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        isInPost
          ? 'gap-1 rounded-lg bg-neutral-100 px-2 py-1 dark:bg-neutral-600'
          : 'grow gap-2 rounded-none bg-transparent px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-600',
      )}
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? (
        <Spinner size={20} />
      ) : (
        <Heart
          variant={isLiked ? 'Bold' : 'TwoTone'}
          size={20}
          className={cn(
            'cursor-pointer hover:opacity-85',
            isLiked && 'text-red-500',
          )}
        />
      )}
      <p className="text-xs font-medium md:text-sm">
        {isInPost ? totalLikes ?? 0 : t('M9')}
      </p>
    </Button>
  );
}
