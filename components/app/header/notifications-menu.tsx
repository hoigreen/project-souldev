'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cva, VariantProps } from 'class-variance-authority';
import { BellRing } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import { ErrorStage, ErrorStageType } from '../error-stage';
import {
  NotificationBell,
  NovuProvider,
  PopoverNotificationCenter,
} from '@novu/notification-center';
import { NotificationsCenter } from '@/components/notifications/notifications-center';
import { NOVU_APPLICATION_IDENTIFIER } from '@/lib/notifications';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: NotificationsMenu
 * ------------------------------------------------------------------------------------------------------------------ */

export const notificationsMenuVariants = cva('');

export type NotificationsMenuProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof notificationsMenuVariants>;

export const NotificationsMenu: FC<NotificationsMenuProps> = ({
  className,
  ...props
}) => {
  const t = useTranslations('Notifications');
  const { data: session } = useSession();

  if (!session) return <ErrorStage stage={ErrorStageType.Unauthorized} />;

  const user = session.user;

  console.log(user);

  return (
    <div className={notificationsMenuVariants({ className })} {...props}>
      <NovuProvider
        subscriberId={user._id}
        applicationIdentifier={NOVU_APPLICATION_IDENTIFIER}
        initialFetchingStrategy={{
          fetchNotifications: true,
          fetchUserPreferences: false,
          fetchUnseenCount: false,
        }}
      >
        <NotificationsCenter />
      </NovuProvider>
    </div>
  );
};
