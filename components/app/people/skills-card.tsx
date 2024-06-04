'use client';

import { Profile } from '@/lib/definitions';
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

type SkillsCardProps = React.HTMLAttributes<HTMLDivElement> & {
  skills: Profile['skills'];
};

export default function SkillCard({
  className,
  skills,
  ...props
}: SkillsCardProps) {
  const t = useTranslations('Home');

  return (
    <Card
      className={cn('flex-1 grow space-y-3 p-4 md:p-6', className)}
      {...props}
    >
      <Label>{t('M67')}</Label>

      <div className="flex flex-wrap items-center gap-2">
        {skills.length === 0 ? (
          <p className="text-sm">{t('M122')}</p>
        ) : (
          skills.map((skill, index) => (
            <span
              key={index}
              className="rounded-lg border bg-neutral-100 px-3 py-1 text-sm"
            >
              {skill}
            </span>
          ))
        )}
      </div>
    </Card>
  );
}
