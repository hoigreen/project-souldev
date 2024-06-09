'use client';

import { Heading } from '@/components/app/heading';
import { EmphasizedTextBold } from '@/components/ui/emphasize';
import { cn } from '@/lib/utils';
import { ImagePlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { useWatch } from 'react-hook-form';

type GroupEditorPreviewProps = React.HTMLAttributes<HTMLDivElement>;

export function PagePreview({ className }: GroupEditorPreviewProps) {
  const t = useTranslations('Home');
  const pagePreview = useWatch();

  const preview = {
    name: pagePreview.name,
    image: pagePreview.image,
    email: pagePreview.email,
    phone: pagePreview.phone,
    website: pagePreview.website,
    address: pagePreview.address,
    description: pagePreview.description,
  };

  return (
    <div className={cn('min-h-full space-y-6', className)}>
      <Heading title={t('M189')} size={1} />
      <div className="space-y-3 rounded-lg border bg-neutral-50 p-3 dark:bg-neutral-800 md:p-4 lg:p-6">
        <div className="space-y-3 rounded-lg border bg-white p-2 dark:bg-black md:p-3 lg:p-4">
          <div className="relative flex aspect-[24/9] w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-700">
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

          <div className="flex flex-col items-center gap-3 md:gap-4">
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

            <div className="flex items-center justify-center gap-3">
              <p className="text-center text-sm md:text-base">
                {t.rich('M190', {
                  emphasize: EmphasizedTextBold,
                  count: 1,
                })}
              </p>

              <p className="text-center text-sm md:text-base">
                {t.rich('M191', {
                  emphasize: EmphasizedTextBold,
                  count: 1,
                })}
              </p>
            </div>

            <div className="flex cursor-pointer items-center gap-2 hover:opacity-90">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'size-12 rounded-full border bg-neutral-100 dark:bg-neutral-700',
                    index !== 0 && '-ml-5',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
