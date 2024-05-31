'use client';

import { useRouter } from '@/navigation';
import { useNotifications } from '@novu/notification-center';
import { useTranslations } from 'next-intl';
import { Loading } from '../ui/loading';
import { Button } from '../ui/button';
import { Notification } from '@/lib/notifications';
import { NotificationCard } from './notification-card';

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

  console.log(novuNotifications);

  const notifications = (novuNotifications || []).map(
    (item) =>
      ({
        id: item._id as string,
        content: item.content as string,
        seen: item.seen,
        payload: {
          title: item.payload.title,
          description: item.payload.description,
          type: item.payload.type,
          senderName: item.payload.senderName,
        },
        createdAt: item.createdAt,
        templateIdentifier: item.templateIdentifier,
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
            <div className="flex flex-col space-y-4 pt-20 text-center">
              <p className="text-lg font-bold">{t('T_0943')}</p>
              <span className="text-sm text-neutral-600">{t('M3')}</span>
            </div>
          ) : (
            notifications.map((item) => (
              <NotificationCard
                key={item.id}
                id={item.id}
                content={item.content}
                seen={item.seen}
                title={item?.payload?.title as string}
                createdAt={item.createdAt}
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
