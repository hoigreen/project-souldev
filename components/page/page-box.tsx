'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import Image from 'next/image';
import { ImagePlus } from 'lucide-react';
import Link from 'next/link';
import AvatarUser from '../ui/app/avatar-user';
import { EmphasizedTextBold } from '../ui/emphasize';

type PageBoxProps = React.HTMLAttributes<HTMLDivElement> & {
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
  usersLiked: number;
};

export default function PageBox({
  className,
  classNames,
  pageId,
  avatar,
  name,
  usersLiked,
}: PageBoxProps) {
  const t = useTranslations('Home');

  return (
    <div className={cn('flex w-full items-center gap-2 p-2', className)}>
      <Link href={`/page/${pageId}`}>
        <AvatarUser
          src={avatar!}
          alt={name}
          fallback={name}
          className="size-14"
        />
      </Link>

      <div className="grow space-y-1">
        <Link
          href={`/page/${pageId}`}
          className="block truncate text-sm font-medium text-neutral-800 dark:text-neutral-200 sm:text-base"
        >
          {name}
        </Link>

        <p className="text-xs text-neutral-800 dark:text-neutral-200 md:text-sm">
          {t.rich('M175', {
            emphasize: EmphasizedTextBold,
            count: usersLiked,
          })}
        </p>
      </div>

      <Link
        href={`/page/${pageId}`}
        className={cn(
          'block text-xs text-blue-400 sm:text-sm',
          classNames?.button,
        )}
      >
        {t('M197')}
      </Link>
    </div>
  );
}
