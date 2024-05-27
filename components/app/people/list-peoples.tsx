'use client';

import AvatarUser from '@/components/ui/app/avatar-user';
import { Card } from '@/components/ui/card';
import { FriendActions, UserBasic } from '@/lib/definitions';
import { cn, getFullName } from '@/lib/utils';
import { Link } from '@/navigation';
import React, { useMemo } from 'react';
import RemoveFriendButton from './actions/remove-friend-button';

type ListPeoplesProps = React.HTMLAttributes<HTMLDivElement> & {
  data: UserBasic[];
  action?: FriendActions;
};

export default function ListPeoples({
  action,
  className,
  data,
}: ListPeoplesProps) {
  const sanitizedData = useMemo(() => data.filter((item) => item), [data]);

  return (
    <div className={cn('grid grid-cols-1 gap-2 md:grid-cols-2', className)}>
      {sanitizedData.map((item, index) => (
        <Card
          key={index}
          className="flex items-center gap-3 rounded-lg border p-3"
        >
          <Link href={`/people/${item._id}`} className="block">
            <AvatarUser
              src={item.image}
              fallback={item.first_name}
              className="size-16"
            />
          </Link>

          <div className="flex grow items-center justify-between gap-2">
            <Link href={`/people/${item._id}`} className="grow">
              <p className="h-12 text-base font-medium md:text-lg">
                {getFullName(item.first_name, item.last_name)}
              </p>
            </Link>

            {action && action === FriendActions.Remove && (
              <RemoveFriendButton user={item} />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
