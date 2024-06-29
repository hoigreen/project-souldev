'use client';

import AvatarUser from '@/components/ui/app/avatar-user';
import { Card } from '@/components/ui/card';
import {
  FriendActions,
  UserBasic,
  ViewDetailsActionPeoples,
} from '@/lib/definitions';
import { cn, getFullName } from '@/lib/utils';
import { Link, useRouter } from '@/navigation';
import React, { ReactNode, useMemo, useTransition } from 'react';
import RemoveFriendButton from './actions/remove-friend-button';
import { Button, buttonVariants } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { acceptFriendRequest, follow, unfollow } from '@/lib/actions/profile';
import toast from 'react-hot-toast';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { SendMessageButton } from '../messages/send-message-button';

type ListPeoplesProps = React.HTMLAttributes<HTMLDivElement> & {
  data: UserBasic[];
  action?: FriendActions;
  handleAction?: (userId: string) => void;
  viewAction?: ViewDetailsActionPeoples;
};

export default function ListPeoples({
  action,
  title,
  handleAction,
  className,
  data,
  viewAction,
}: ListPeoplesProps) {
  const t = useTranslations('Home');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
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

  const handleFollow = async (userId: string) => {
    const response = await follow(userId);

    startTransition(() => {
      if (!response.success) {
        toast.error(t('M15'));

        return;
      }

      toast.success(t('M210'));
      router.refresh();
    });
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

            {viewAction &&
              viewAction === ViewDetailsActionPeoples.viewFriends && (
                <SendMessageButton userId={item._id} />
              )}

            {viewAction &&
              viewAction === ViewDetailsActionPeoples.viewDetail && (
                <Link
                  href={`/people/${item._id}`}
                  className={cn(
                    buttonVariants(),
                    'block w-fit text-xs sm:text-sm',
                  )}
                >
                  {t('M140')}
                </Link>
              )}

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

            {action && action === FriendActions.Follow && (
              <Button
                className="w-fit text-xs sm:text-sm"
                disabled={isPending}
                onClick={() => handleFollow(item._id)}
              >
                {t('M52')}
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

            {handleAction && (
              <Button
                className="w-fit text-xs sm:text-sm"
                variant="outline"
                onClick={() => handleAction(item._id)}
              >
                {title}
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
