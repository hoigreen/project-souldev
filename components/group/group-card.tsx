'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ImagePlus } from 'lucide-react';
import Link from 'next/link';

type GroupCardProps = React.HTMLAttributes<HTMLDivElement> & {
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
  onClick?: () => void;
};

export default function GroupCard({
  className,
  classNames,
  groupId,
  avatar,
  name,
  totalMembers,
  title,
  onClick,
}: GroupCardProps) {
  const t = useTranslations('Home');

  return (
    <Card className={cn('flex w-full flex-col gap-4 p-4 md:p-6', className)}>
      <div className="grow">
        <Link
          href={`/group/${groupId}`}
          className="relative block aspect-video size-full overflow-hidden rounded-lg border object-contain"
        >
          {avatar ? (
            <Image src={avatar} alt={name} fill className="" />
          ) : (
            <div className="flex size-full items-center justify-center overflow-hidden rounded-lg">
              <ImagePlus size={24} className="text-background" />
            </div>
          )}
        </Link>
      </div>

      <div className="space-y-2">
        <Link
          href={`/group/${groupId}`}
          className="h-16 truncate whitespace-normal text-sm font-medium sm:text-base md:text-lg"
        >
          {name}
        </Link>

        <p className="text-xs md:text-sm">{t('M143', { totalMembers })}</p>
      </div>

      <Button
        className={cn('w-full text-xs sm:text-sm', classNames?.button)}
        onClick={onClick}
      >
        {title ?? t('M127')}
      </Button>
    </Card>
  );
}
