'use client';

import { useNotifications } from '@novu/notification-center';
import { useTranslations } from 'next-intl';
import { Loading } from '../ui/loading';
import { Button } from '../ui/button';
import { NotificationCard } from './notification-card';
import { Notification } from '@/lib/definitions';
import { NotificationType } from '@/lib/constants';
import { useMemo } from 'react';
import { useRouter } from '@/navigation';

interface NotificationsListProps {
  onClose?: (value: boolean) => void;
}

export function NotificationsList({ onClose }: NotificationsListProps) {
  const t = useTranslations('Home');
  const router = useRouter();
  const {
    notifications: novuNotifications,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    markNotificationAsSeen,
  } = useNotifications();

  const notifications = (novuNotifications || []).map(
    (item) =>
      ({
        id: item._id as string,
        seen: item.seen,
        createdAt: item.createdAt,
        payload: {
          image: item.payload.image,
          title: item.payload.title,
          description: item.payload.description,
          type: item.payload.type,
          url: item.payload.url,
        },
      }) as Notification,
  );

  const notificationsFlatted = useMemo(
    () => notifications.filter((item) => item.payload.title),
    [notifications],
  );

  const handleClick = (notification: Notification) => {
    !notification.seen && markNotificationAsSeen(notification.id);
    router.push((notification.payload.url as string) ?? '/');
    onClose?.(false);
  };

  return (
    <div className="space-y-2">
      {!isLoading ? (
        <div className="flex grow flex-col items-center gap-3">
          {isFetching && <Loading />}

          {notificationsFlatted.length === 0 ? (
            <p className="pt-20 text-center text-base font-medium md:text-lg">
              {t('M116')}
            </p>
          ) : (
            notificationsFlatted.map((item) => (
              <NotificationCard
                key={item.id}
                id={item.id}
                image={(item.payload.image as string) || undefined}
                title={item.payload.title as string}
                description={item.payload.description as string}
                type={item.payload.type as NotificationType}
                createdAt={item.createdAt}
                seen={item.seen}
                markAsRead={markNotificationAsSeen}
                onClick={() => handleClick(item)}
              />
            ))
          )}
        </div>
      ) : (
        <Loading />
      )}

      {hasNextPage && (
        <>
          <hr />
          <div className="flex w-full justify-center">
            <Button className="mx-auto" variant="link" onClick={fetchNextPage}>
              {t('M115')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
