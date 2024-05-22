import { Loader2Icon } from 'lucide-react';
import React from 'react';

export function Spinner({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div className={className}>
      <Loader2Icon className="animate-spin text-neutral-600 dark:text-neutral-200" />
    </div>
  );
}
