'use client';

import React from 'react';
import { usePathname } from '@/navigation';
import Image from 'next/image';
import { Heart } from 'iconsax-react';
import { cn } from '@/lib/utils';

const ReactPost = ({
  postId,
  currentUserId,
  isLike = false,
  isComment = false,
  userId = null,
}: {
  postId: string;
  currentUserId: string;
  isLike?: boolean;
  isComment?: boolean;
  userId?: string | null;
}): React.JSX.Element => {
  const pathname = usePathname();

  // const handleClick = async () => {
  //   await addReactToThread({
  //     threadId,
  //     userId: currentUserId,
  //     path: pathname,
  //   });
  // };

  return (
    <Heart
      variant={isLike ? 'Bold' : 'TwoTone'}
      size={20}
      className={cn(
        'cursor-pointer hover:opacity-85',
        isLike && 'text-red-500',
      )}
    />
  );
};

export default ReactPost;
