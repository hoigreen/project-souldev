'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import Image from 'next/image';
import { ImagePlus } from 'lucide-react';
import { Link } from '@/navigation';

type GroupBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  classNames?: {
    card?: string;
    avatar?: string;
    name?: string;
    totalMembers?: string;
    button?: string;
  };
  avatar?: string | null;
  groupId: string;
  name: string;
  totalMembers: number;
};

export default function GroupBox({
  className,
  classNames,
  groupId,
  avatar,
  name,
  totalMembers,
  title,
}: GroupBoxProps) {
  const t = useTranslations('Home');

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between gap-2',
        className,
      )}
    >
      <Link
        href={`/group/${groupId}`}
        className="relative block aspect-square size-14 overflow-hidden rounded-lg border object-contain"
      >
        {avatar ? (
          <Image src={avatar} alt={name} fill />
        ) : (
          <div className="flex size-full items-center justify-center overflow-hidden rounded-lg">
            <ImagePlus size={24} className="text-background" />
          </div>
        )}
      </Link>

      <div className="max-w-[calc(100%-7rem)] grow space-y-1">
        <Link
          href={`/group/${groupId}`}
          className="block truncate text-sm font-medium text-neutral-800 dark:text-neutral-200 sm:text-base"
        >
          {name}
        </Link>

        <p className="text-xs text-neutral-800 dark:text-neutral-200 md:text-sm">
          {t('M143', { totalMembers })}
        </p>
      </div>

      <Link
        href={`/group/${groupId}`}
        className={cn(
          'block text-xs text-blue-400 sm:text-sm',
          classNames?.button,
        )}
      >
        {title ?? t('M197')}
      </Link>
    </div>
  );
}
