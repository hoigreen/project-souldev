import { cn } from '@/lib/utils';
import { clsx } from 'clsx';
import { HTMLAttributes } from 'react';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: SectionContainer
 * ------------------------------------------------------------------------------------------------------------------ */

export interface SectionContainerProps extends HTMLAttributes<HTMLDivElement> {
  errors?: Array<any>;
  noPadding?: boolean;
}

export function SectionContainer({
  children,
  className,
  noPadding = false,
  ...props
}: SectionContainerProps) {
  return (
    <div
      {...props}
      className={clsx(
        !noPadding && 'p-4 lg:p-7.5',
        'rounded-3xl bg-white dark:bg-black',
        className,
      )}
    >
      {children}
    </div>
  );
}
