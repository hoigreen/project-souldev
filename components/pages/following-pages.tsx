'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { ErrorStage, ErrorStageType } from '../app/error-stage';
import { Page } from '@/lib/definitions';
import PageCard from '../page/page-card';
import { useSession } from 'next-auth/react';

type FollowingPagesProps = React.HTMLAttributes<HTMLDivElement> & {
  pages: Page[];
};

export default function FollowingPages({
  className,
  pages,
}: FollowingPagesProps) {
  const { data: session } = useSession();

  if (!session) {
    return <ErrorStage stage={ErrorStageType.Unauthorized} />;
  }

  if (pages.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  return (
    <div className={cn('grid gap-2 xs:grid-cols-2 md:grid-cols-3', className)}>
      {pages.map((item) => {
        const isLiked = item.likes
          .map((like) => like.user_id._id)
          .includes(session.user._id);
        const isFollowing = item.followers
          .map((follower) => follower.user_id._id)
          .includes(session.user._id);

        return (
          <PageCard
            isLiked={isLiked}
            isFollowing={isFollowing}
            key={item._id}
            avatar={item.image_page[0] ?? null}
            pageId={item._id}
            name={item.name}
            description={item.description}
            usersLiked={item.likes.length}
            usersFollowing={item.followers.length}
          />
        );
      })}
    </div>
  );
}
