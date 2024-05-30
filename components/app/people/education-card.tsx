'use client';

import { Profile } from '@/lib/definitions';
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

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
        {education.map((edu, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold">{edu.degree}</h3>
            <p className="text-sm text-neutral-500">{edu.school}</p>
            <p className="text-sm text-neutral-500">
              {edu.from} - {edu.to}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
