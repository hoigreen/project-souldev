'use client';

import { useSession } from 'next-auth/react';
import { FC, HTMLAttributes } from 'react';
import { ErrorStage, ErrorStageType } from '../error-stage';
import { NovuProvider } from '@novu/notification-center';
import { NotificationsCenter } from '@/components/notifications/notifications-center';
import { cn } from '@/lib/utils';
import { NOVU_APPLICATION_IDENTIFIER } from '@/lib/constants';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: NotificationsMenu
 * ------------------------------------------------------------------------------------------------------------------ */

export type NotificationsMenuProps = HTMLAttributes<HTMLDivElement>;

export const NotificationsMenu: FC<NotificationsMenuProps> = ({
  className,
  ...props
}) => {
  const { data: session } = useSession();

  if (!session) return <ErrorStage stage={ErrorStageType.Unauthorized} />;

  const user = session.user;

  return (
    <div className={cn(className)} {...props}>
      <NovuProvider
        subscriberId={user._id}
        applicationIdentifier={NOVU_APPLICATION_IDENTIFIER}
        initialFetchingStrategy={{
          fetchUnseenCount: true,
          fetchNotifications: true,
          fetchUserPreferences: false,
        }}
      >
        <NotificationsCenter />
      </NovuProvider>
    </div>
  );
};
