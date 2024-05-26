import { useTruncate } from '@/hooks/use-truncate';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React, { HTMLAttributes } from 'react';
import { Typography } from './typography';

export interface TruncateProps extends HTMLAttributes<HTMLDivElement> {
  isHtml?: boolean;
  maxLength?: number;
  text: string;
}

export function Truncate({
  className,
  text,
  isHtml = false,
  maxLength = 200,
  ...props
}: TruncateProps): React.JSX.Element {
  const t = useTranslations('Home');
  const { isTruncated, truncatedText, hasTruncated, toggleTruncated } =
    useTruncate(text, maxLength);

  return (
    <div className={cn(className)} {...props}>
      {isHtml ? (
        <Typography content={isTruncated ? truncatedText : text} />
      ) : (
        <div>{isTruncated ? truncatedText : text}</div>
      )}
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
