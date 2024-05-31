'use client';

import { useNotifications } from '@novu/notification-center';
import { useTranslations } from 'next-intl';
import { Loading } from '../ui/loading';
import { Button } from '../ui/button';
import { NotificationCard } from './notification-card';
import { Notification } from '@/lib/definitions';
import { NotificationType } from '@/lib/constants';

interface NotificationsListProps {
  onClose?: (value: boolean) => void;
}

export function NotificationsList({ onClose }: NotificationsListProps) {
  const t = useTranslations('Home');
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
        payload: {
          title: item.payload.title,
          description: item.payload.description,
          type: item.payload.type,
        },
        createdAt: item.createdAt,
      }) as Notification,
  );

  const handleClick = (notification: Notification) => {
    !notification.seen && markNotificationAsSeen(notification.id);
    onClose?.(false);
  };

  return (
    <div className="divide-y">
      {!isLoading ? (
        <div className="flex grow flex-col items-center gap-3 overflow-y-auto">
          {isFetching && <Loading />}

          {notifications.length === 0 ? (
            <p className="pt-20 text-center text-lg font-bold">{t('M110')}</p>
          ) : (
            notifications.map((item) => (
              <NotificationCard
                key={item.id}
                id={item.id}
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

      {hasNextPage && <Button onClick={fetchNextPage}>Load more</Button>}
    </div>
  );
}
