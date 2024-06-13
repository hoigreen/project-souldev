'use client';

import { cn, getFullName } from '@/lib/utils';
import { BackLink } from '../app/back-link';
import AvatarUser from '../ui/app/avatar-user';
import { HTMLAttributes } from 'react';
import { UserProfile } from '@/lib/definitions';

type ConversationHeaderNewProps = HTMLAttributes<HTMLDivElement> & {
  user: UserProfile;
};

export function ConversationHeaderNew({
  className,
  user,
  ...props
}: ConversationHeaderNewProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex w-full items-center border-b bg-white px-3 py-4 md:justify-center md:py-5',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <BackLink className="md:hidden" />

        <AvatarUser src={user.image} fallback={user.first_name} />

        <div className="text-base font-bold md:text-lg">
          {getFullName(user.first_name, user.last_name)}
        </div>
      </div>
    </div>
  );
}
