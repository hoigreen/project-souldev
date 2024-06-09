'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { ErrorStage, ErrorStageType } from '../app/error-stage';
import { Page } from '@/lib/definitions';
import PageCard from '../page/page-card';
import { useSession } from 'next-auth/react';

type MyPagesProps = React.HTMLAttributes<HTMLDivElement> & {
  pages: Page[];
};

export default function MyPages({ className, pages }: MyPagesProps) {
  const { data: session } = useSession();

  if (!session) {
    return <ErrorStage stage={ErrorStageType.Unauthorized} />;
  }

  if (pages.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  return (
    <div className={cn('grid gap-2 xs:grid-cols-2 md:grid-cols-3', className)}>
      {pages.map((item) => (
        <PageCard
          key={item._id}
          isMyPage
          avatar={item.image_page[0] ?? null}
          pageId={item._id}
          name={item.name}
          description={item.description}
          usersLiked={item.likes.length}
          usersFollowing={item.followers.length}
        />
      ))}
    </div>
  );
}
