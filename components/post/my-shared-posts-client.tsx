'use client';

import React from 'react';
import { Post } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import ShardPostCard from './shared-post-card';

type MySharedPostsClientProps = React.HTMLAttributes<HTMLDivElement> & {
  data: Post[];
  currentUserId: string;
};

export default function MySharedPostsClient({
  className,
  currentUserId,
  data,
  ...props
}: MySharedPostsClientProps) {
  if (data.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  return (
    <div
      className={cn(
        'mx-auto mt-9 flex w-full max-w-3xl flex-col gap-10',
        className,
      )}
      {...props}
    >
      {data.map((item, index) => (
        <ShardPostCard
          key={index}
          likes={item.likes}
          currentUserId={currentUserId}
          id={item._id}
          content={item.content}
          author={item.user_id}
          created={item.created}
          images={item.images}
          shares={item.shares}
        />
      ))}
    </div>
  );
}
