'use client';

import { useNotifications, useSocket } from '@novu/notification-center';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { BellRing } from 'lucide-react';
import { Button } from '../ui/button';
import { NotificationsList } from './notifications-list';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

export function NotificationsCenter(): React.JSX.Element {
  const t = useTranslations('Home');
  const [isOpen, setIsOpen] = useState(false);
  const { unseenCount, markAllNotificationsAsSeen } = useNotifications();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('notification_received', () => {
      toast.success(t('M114'));
    });

    return () => {
      socket?.off('notification_received');
    };
  }, [socket, t]);

  const handleMarkALlAsSeen = () => {
    markAllNotificationsAsSeen();

    toast.success(t('M113'));
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerTrigger>
        <div className="data-state-open:bg-neutral-300 relative flex items-center p-1 transition">
          <BellRing size={20} className="inset-0 m-auto rotate-12" />

          <div
            className={cn(
              'absolute top-0 size-4 rounded-full bg-red-500 text-xs font-bold text-white',
              unseenCount === 0 && 'hidden',
            )}
          >
            {unseenCount && unseenCount}
          </div>
        </div>
      </DrawerTrigger>

      <DrawerContent className="ml-auto h-screen w-[96%] border-none md:w-full md:max-w-[40rem]">
        <DrawerHeader className="flex items-baseline justify-between border-b p-2 md:p-4">
          <DrawerTitle className="text-sm md:text-base lg:text-lg">
            {t('M110')}
          </DrawerTitle>
          <Button
            onClick={handleMarkALlAsSeen}
            variant="ghost"
            className="p-1 md:p-2"
          >
            <span className="text-xs font-normal md:text-sm">{t('M111')}</span>
          </Button>
        </DrawerHeader>

        <div className="overflow-auto px-1.5 pt-2 md:p-4">
          <NotificationsList onClose={setIsOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
