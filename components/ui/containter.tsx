import { cn } from '@/lib/utils';
import React from 'react';

export default function Container({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  return (
    <div className={cn('@container container', className)}>{children}</div>
  );
}
