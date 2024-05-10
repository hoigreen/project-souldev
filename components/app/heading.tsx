import { cn } from '@/lib/utils';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Heading({
  children,
  className,
  title,
  subtitle,
  size = 1,
}: {
  children?: React.ReactNode;
  className?: string;
  subtitle?: string;
  title: string;
  size?: 1 | 2 | 3;
}): React.JSX.Element {
  return (
    <div className={twMerge(className, subtitle && 'space-y-2')}>
      <div className="flex items-baseline gap-2">
        <h1
          className={cn(
            'min-w-0 break-words text-lg font-bold md:text-xl lg:text-2xl',
            size === 2 && 'text-xl md:text-2xl lg:text-3xl',
            size === 3 && 'text-2xl md:text-3xl lg:text-4xl',
          )}
        >
          {title}
        </h1>
        {children}
      </div>

      {subtitle ? <p className="text-sm text-gray-500">{subtitle}</p> : null}
    </div>
  );
}
