'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import { UserBasic } from '@/lib/definitions';
import ListPeoples from '../peoples/list-peoples';

type RequestJoinGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  data: UserBasic[];
};

export default function RequestJoinGroup({
  className,
  data,
}: RequestJoinGroupProps) {
  const t = useTranslations('Home');

  const handleAccept = (userId: string) => {
    console.log('accept', userId);
  };

  return (
    <ListPeoples
      className={cn('md:grid-cols-1', className)}
      data={data}
      title={t('M104')}
      handleAction={handleAccept}
    />
  );
}
