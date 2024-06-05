'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

type GroupCardProps = React.HTMLAttributes<HTMLDivElement> & {
  groupId: string;
  avatar?: string | null;
  name: string;
  totalMembers: number;
  onClick?: () => void;
};

export default function GroupCard({
  className,
  avatar,
  name,
  totalMembers,
  onClick,
}: GroupCardProps) {
  const t = useTranslations('Home');

  return (
    <Card className={cn('flex w-full flex-col gap-4 p-4 md:p-6', className)}>
      <div className="grow">
        <div className="relative aspect-video size-full overflow-hidden rounded-lg border object-contain">
          {avatar ? (
            <Image src={avatar} alt={name} fill className="" />
          ) : (
            <div className="flex size-full items-center justify-center overflow-hidden rounded-lg">
              <Users size={24} className="text-background" />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="h-16 truncate whitespace-normal text-sm font-medium sm:text-base md:text-lg">
          {name}
        </h3>

        <p className="text-xs md:text-sm">{t('M143', { totalMembers })}</p>
      </div>

      <Button className="w-full text-xs sm:text-sm" onClick={onClick}>
        {t('M127')}
      </Button>
    </Card>
  );
}
