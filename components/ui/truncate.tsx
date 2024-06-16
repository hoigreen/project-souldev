import { useTruncate } from '@/hooks/use-truncate';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React, { HTMLAttributes } from 'react';
import { Typography } from './typography';
interface TruncateProps extends HTMLAttributes<HTMLDivElement> {
  maxLength?: number;
  text: string;
}

export function Truncate({
  className,
  text,
  maxLength = 200,
  ...props
}: TruncateProps): React.JSX.Element {
  const t = useTranslations('Home');
  const { isTruncated, truncatedText, hasTruncated, toggleTruncated } =
    useTruncate(text, maxLength);

  return (
    <div className={cn(className)} {...props}>
      <Typography content={isTruncated ? truncatedText : text} />

      {hasTruncated && (
        <span
          className="cursor-pointer text-sm font-medium"
          onClick={toggleTruncated}
        >
          {isTruncated ? t('M54') : t('M55')}
        </span>
      )}
    </div>
  );
}
