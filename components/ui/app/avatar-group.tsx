import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { getFirstInitials } from '@/lib/string';

export default function AvatarGroup({
  className,
  groupName,
  groupImage,
}: {
  className?: string;
  groupName: string;
  groupImage?: string;
}): React.JSX.Element {
  return groupImage ? (
    <Image
      alt={groupName}
      className={cn('absolute rounded object-fill', className)}
      fill
      src={groupImage}
    />
  ) : (
    <div className="flex size-12 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700">
      <p className="text-lg font-semibold text-neutral-500 dark:text-neutral-400">
        {getFirstInitials(groupName)}
      </p>
    </div>
  );
}
