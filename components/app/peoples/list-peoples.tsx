'use client';

import AvatarUser from '@/components/ui/app/avatar-user';
import { Card } from '@/components/ui/card';
import { FriendActions, UserBasic } from '@/lib/definitions';
import { cn, getFullName } from '@/lib/utils';
import { Link, useRouter } from '@/navigation';
import React, { useMemo } from 'react';
import RemoveFriendButton from './actions/remove-friend-button';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { acceptFriendRequest, unfollow } from '@/lib/actions/profile';
import toast from 'react-hot-toast';
import { ErrorStage, ErrorStageType } from '../error-stage';

type ListPeoplesProps = React.HTMLAttributes<HTMLDivElement> & {
  data: UserBasic[];
  action?: FriendActions;
};

export default function ListPeoples({
  action,
  className,
  data,
}: ListPeoplesProps) {
  const t = useTranslations('Home');
  const router = useRouter();
  const sanitizedData = useMemo(() => data.filter((item) => item), [data]);

  const handleAccept = async (userId: string) => {
    const response = await acceptFriendRequest(userId);

    if (!response.success) {
      toast.error(t('M15'));

      return;
    }

    toast.success(t('M105'));
    router.refresh();
  };

  const handleUnfollow = async (userId: string) => {
    const response = await unfollow(userId);

    if (!response.success) {
      toast.error(t('M15'));

      return;
    }

    toast.success(t('M107'));
    router.refresh();
  };

  if (!sanitizedData.length) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

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
              className="size-12 md:size-16"
            />
          </Link>

          <div className="flex grow items-center justify-between gap-2">
            <Link href={`/people/${item._id}`} className="grow">
              <p className="text-sm font-medium sm:text-base md:text-lg">
                {getFullName(item.first_name, item.last_name)}
              </p>
            </Link>

            {action && action === FriendActions.Remove && (
              <RemoveFriendButton user={item} />
            )}

            {action && action === FriendActions.Accept && (
              <Button
                className="w-fit text-xs sm:text-sm"
                onClick={() => handleAccept(item._id)}
              >
                {t('M104')}
              </Button>
            )}

            {action && action === FriendActions.UnFollow && (
              <Button
                className="w-fit text-xs sm:text-sm"
                variant="outline"
                onClick={() => handleUnfollow(item._id)}
              >
                {t('M108')}
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
