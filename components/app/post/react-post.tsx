'use client';

import React from 'react';
import { usePathname } from '@/navigation';
import Image from 'next/image';
import { Heart } from 'iconsax-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { likePost } from '@/lib/actions/posts';

const ReactPost = ({
  postId,
  isLike = false,
}: {
  postId: string;
  isLike?: boolean;
  isComment?: boolean;
  userId?: string | null;
}): React.JSX.Element => {
  const t = useTranslations('Home');

  const handleClick = async () => {
    await likePost({ postId });
  };

  return (
    <div
      className="flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 hover:bg-neutral-100 dark:bg-neutral-600"
      onClick={handleClick}
    >
      <Heart
        variant={isLike ? 'Bold' : 'TwoTone'}
        size={20}
        className={cn(
          'cursor-pointer hover:opacity-85',
          isLike && 'text-red-500',
        )}
      />

      <p className={cn('text-sm font-medium', isLike && 'text-red-500')}>
        {t('M9')}
      </p>
    </div>
  );
};

export default ReactPost;
