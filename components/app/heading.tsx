import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Heading({
  children,
  className,
  title,
  subtitle,
}: {
  children?: React.ReactNode;
  className?: string;
  subtitle?: string;
  title: string;
}): React.JSX.Element {
  return (
    <div className={twMerge(className, subtitle && 'space-y-2')}>
      <div className="flex items-baseline gap-2">
        <h1 className="min-w-0 break-words text-lg font-bold md:text-xl lg:text-2xl">
          {title}
        </h1>
        {children}
      </div>

      {subtitle ? <p className="text-sm text-gray-500">{subtitle}</p> : null}
    </div>
  );
}
