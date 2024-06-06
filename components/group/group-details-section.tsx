'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import Image from 'next/image';
import { ImagePlus } from 'lucide-react';
import { Group } from '@/lib/definitions';

type GroupDetailsSectionProps = React.HTMLAttributes<HTMLDivElement> & {
  data: Group;
};

export default function GroupDetailsSection({
  className,
  data,
}: GroupDetailsSectionProps) {
  const t = useTranslations('Home');

  return (
    <Card
      className={cn(
        'space-y-3 rounded-lg border bg-neutral-50 p-3 md:p-4 lg:p-6',
        className,
      )}
    >
      <div className="relative flex aspect-[24/9] w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-600">
        {data.image_group && data.image_group[0] ? (
          <Image
            src={data.image_group[0]}
            alt={data.name}
            fill
            className="absolute inset-0 size-full"
          />
        ) : (
          <ImagePlus size={48} />
        )}
      </div>
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 md:text-2xl lg:text-3xl">
          {data.name}
        </h2>

        <p className="text-sm lg:text-base">
          {t('M143', {
            totalMembers: 1,
          })}
        </p>
      </div>
    </Card>
  );
}
