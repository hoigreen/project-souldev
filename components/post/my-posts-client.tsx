'use client';

import React from 'react';
import { MyPostsResponse } from '@/lib/definitions';
import PostCard from './post-card';
import { cn } from '@/lib/utils';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';

type MyPostsClientProps = React.HTMLAttributes<HTMLDivElement> & {
  data: MyPostsResponse;
  currentUserId: string;
};

export default function MyPostsClient({
  className,
  currentUserId,
  data,
}: MyPostsClientProps) {
  if (data.data.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  return (
    <div
      className={cn(
        'mx-auto mt-9 flex w-full max-w-3xl flex-col gap-10',
        className,
      )}
    >
      {data.data.map((item, index) => (
        <PostCard
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
