'use client';

import { Profile } from '@/lib/definitions';
import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Truncate } from '@/components/ui/truncate';

type BioCardProps = React.HTMLAttributes<HTMLDivElement> & {
  bio: Profile['user_id']['bio'];
};

export default function BioCard({ className, bio, ...props }: BioCardProps) {
  const t = useTranslations('Home');

  return (
    <Card
      className={cn('flex-1 grow space-y-3 p-4 md:p-6', className)}
      {...props}
    >
      <Label>{t('M21')}</Label>

      <Truncate text={bio ?? t('M109')} />
    </Card>
  );
}
