'use client';

import { Profile } from '@/lib/definitions';
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Truncate } from '@/components/ui/truncate';

type EducationCardProps = React.HTMLAttributes<HTMLDivElement> & {
  education: Profile['education'];
};

export default function EducationCard({
  className,
  education,
  ...props
}: EducationCardProps) {
  const t = useTranslations('Home');

  return (
    <Card className={cn('space-y-3 p-4 md:p-6', className)} {...props}>
      <Label>{t('M79')}</Label>

      <div className="space-y-2">
        {education.length === 0 ? (
          <p className="text-sm">{t('M118')}</p>
        ) : (
          education.map((edu, index) => (
            <div key={index} className="space-y-3 rounded-md border p-2">
              <div className="flex justify-between gap-2">
                <div className="grow space-y-1 truncate group-hover:text-primary">
                  <h3 className="text-lg font-semibold">{edu.school}</h3>
                  <span className="text-sm text-neutral-600 dark:text-neutral-300">
                    {edu.degree}
                  </span>
                </div>

                <p className="text-xs italic text-neutral-500 md:text-sm">
                  {edu.from} - {edu.to}
                </p>
              </div>

              {edu.description && <Truncate text={edu.description} />}
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
