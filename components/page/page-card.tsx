'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ImagePlus } from 'lucide-react';
import Link from 'next/link';
import { CloseCircle, Dislike, Like1, TickCircle } from 'iconsax-react';
import { EmphasizedTextBold } from '../ui/emphasize';

type PageCardProps = React.HTMLAttributes<HTMLDivElement> & {
  classNames?: {
    card?: string;
    avatar?: string;
    description?: string;
    name?: string;
    totalMembers?: string;
    button?: string;
  };
  avatar?: string | null;
  pageId: string;
  name: string;
  description?: string;
  usersLiked: number;
  usersFollowing: number;
  isLiked?: boolean;
  isFollowing?: boolean;
};

export default function PageCard({
  className,
  classNames,
  pageId,
  avatar,
  name,
  usersLiked,
  usersFollowing,
  description,
  title,
  isLiked,
  isFollowing,
}: PageCardProps) {
  const t = useTranslations('Home');

  return (
    <Card className={cn('flex w-full flex-col gap-2 p-3 md:p-6', className)}>
      <div className="grow">
        <Link
          href={`/page/${pageId}`}
          className="relative block aspect-[16/10] size-full overflow-hidden rounded-lg border object-contain"
        >
          {avatar ? (
            <Image src={avatar} alt={name} fill />
          ) : (
            <div className="flex size-full items-center justify-center overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-800">
              <ImagePlus size={24} />
            </div>
          )}
        </Link>
      </div>

      <div className="space-y-1">
        <Link
          href={`/page/${pageId}`}
          className="h-16 truncate whitespace-normal text-base font-bold sm:text-lg md:text-xl"
        >
          {name}
        </Link>

        {description && (
          <p className="truncate whitespace-normal text-xs font-light italic md:text-sm">
            {description}
          </p>
        )}

        <p className="text-sm md:text-base">
          {t.rich('M175', {
            emphasize: EmphasizedTextBold,
            count: usersLiked,
          })}
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
        <Button
          className={cn(
            'flex w-full grow items-center gap-1 text-center text-xs sm:text-sm md:w-1/2',
            classNames?.button,
          )}
          variant={isLiked ? 'outline' : 'default'}
        >
          {isLiked ? (
            <>
              <Dislike variant="Bold" size={16} />
              {t('M173')}
            </>
          ) : (
            <>
              <Like1 variant="Bold" size={16} />
              {t('M174')}
            </>
          )}
        </Button>

        <Button
          className={cn(
            'flex w-full grow items-center gap-1 text-center text-xs sm:text-sm md:w-1/2',
            classNames?.button,
          )}
          variant="outline"
        >
          {isFollowing ? (
            <>
              <CloseCircle variant="Bulk" size={16} />
              {t('M24')}
            </>
          ) : (
            <>
              <TickCircle variant="Bold" size={16} />
              {t('M52')}
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
