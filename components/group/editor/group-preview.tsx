'use client';

import { Heading } from '@/components/app/heading';
import { Group } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { ImagePlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { useWatch } from 'react-hook-form';

type GroupEditorPreviewProps = React.HTMLAttributes<HTMLDivElement> & {
  initialData?: Group;
};

export function GroupEditorPreview({
  className,
  initialData,
}: GroupEditorPreviewProps) {
  const t = useTranslations('Home');
  const groupPreview = useWatch();

  const preview = {
    name: groupPreview.name,
    image: groupPreview.image,
  };

  return (
    <div className={cn('min-h-full space-y-6', className)}>
      <Heading title={t('M151')} size={1} />
      <div className="space-y-3 rounded-lg border bg-neutral-50 p-3 md:p-4 lg:p-6">
        <div className="relative flex aspect-[24/9] w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-600">
          {preview.image ? (
            <Image
              src={preview.image}
              alt={preview.name}
              fill
              className="absolute inset-0 size-full"
            />
          ) : (
            <ImagePlus size={48} />
          )}
        </div>
        <div className="space-y-3">
          <h2
            className={cn(
              'text-lg font-bold md:text-lg lg:text-2xl',
              preview.name
                ? 'text-neutral-900 dark:text-neutral-100'
                : 'text-neutral-500 dark:text-neutral-400',
            )}
          >
            {preview.name || t('M146')}
          </h2>

          <p className="text-sm">
            {t('M143', {
              totalMembers: initialData?.members?.length ?? 1,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
