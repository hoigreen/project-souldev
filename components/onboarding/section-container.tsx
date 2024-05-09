import { cn } from '@/lib/utils';
import { clsx } from 'clsx';
import { HTMLAttributes } from 'react';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: SectionContainer
 * ------------------------------------------------------------------------------------------------------------------ */

export interface SectionContainerProps extends HTMLAttributes<HTMLDivElement> {
  errors?: Array<any>;
  gridClassName?: string;
  noPadding?: boolean;
}

export function SectionContainer({
  children,
  className,
  gridClassName = 'grid-cols-1 lg:grid-cols-[400px_1fr]',
  noPadding = false,
  ...props
}: SectionContainerProps) {
  return (
    <div {...props} className={cn('container', className)}>
      <div
        className={clsx(
          !noPadding && 'p-4 lg:p-7.5',
          'rounded-3xl bg-white dark:bg-black',
        )}
      >
        <div className={clsx(gridClassName, 'grid items-start gap-6')}>
          {children}
        </div>
      </div>
    </div>
  );
}
