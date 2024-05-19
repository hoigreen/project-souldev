import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Spinner } from '../app/spinner';

export function Loading({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  const t = useTranslations('Home');

  return (
    <div
      className={cn('flex items-center justify-center gap-3 py-3', className)}
    >
      <Spinner />
      <span className="block text-sm italic">{t('M18')}</span>
    </div>
  );
}
