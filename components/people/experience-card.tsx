'use client';

import { Profile } from '@/lib/definitions';
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Truncate } from '@/components/ui/truncate';

type ExperienceCardProps = React.HTMLAttributes<HTMLDivElement> & {
  experience: Profile['experience'];
};

export default function ExperienceCard({
  className,
  experience,
  ...props
}: ExperienceCardProps) {
  const t = useTranslations('Home');

  return (
    <Card className={cn('space-y-3 p-4 md:p-6', className)} {...props}>
      <Label>{t('M89')}</Label>

      <div className="space-y-2">
        {experience.length === 0 ? (
          <p className="text-sm">{t('M119')}</p>
        ) : (
          experience.map((item, index) => (
            <div key={index} className="space-y-3 rounded-md border p-2">
              <div className="flex justify-between gap-2">
                <div className="grow space-y-1 truncate group-hover:text-primary">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <span className="text-sm text-neutral-600 dark:text-neutral-300">
                    {item.company}
                  </span>
                </div>

                <p className="text-xs italic text-neutral-500 md:text-sm">
                  {item.from} - {item.to}
                </p>
              </div>

              {item.description && <Truncate text={item.description} />}
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
