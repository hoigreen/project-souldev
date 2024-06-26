'use client';

import React from 'react';
import { Post } from '@/lib/definitions';
import PostCard from './post-card';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { Label } from '@/components/ui/label';

type PeoplesPostProps = React.HTMLAttributes<HTMLDivElement> & {
  posts: Post[];
  currentUserId: string;
};

export default function PeoplesPost({
  className,
  currentUserId,
  posts,
}: PeoplesPostProps) {
  const t = useTranslations('Home');

  return (
    <Card className={cn('space-y-6 p-4 md:p-6', className)}>
      <div className="flex items-center justify-between">
        <Label>{t('M120')}</Label>
        <span className="text-xs md:text-sm">
          {t('M121', {
            count: posts.length,
          })}
        </span>
      </div>

      <div
        className={cn(
          'grid w-full gap-4',
          posts.length <= 1 && 'lg:grid-cols-1',
        )}
      >
        {posts.length === 0 ? (
          <ErrorStage
            stage={ErrorStageType.ResourceNotFound}
            title={t('M2')}
            description={t('M208')}
          />
        ) : (
          posts.map((item) => (
            <PostCard
              key={item._id}
              className="mx-auto w-full max-w-2xl border"
              group={item.group_id}
              page={item.page_id}
              currentUserId={currentUserId}
              id={item._id}
              author={item.user_id}
              countComments={item.commentsCount}
              {...item}
            />
          ))
        )}
      </div>
    </Card>
  );
}
