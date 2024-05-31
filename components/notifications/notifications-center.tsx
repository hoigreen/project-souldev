import { useNotifications } from '@novu/notification-center';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
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

export function NotificationsCenter(): React.JSX.Element {
  const t = useTranslations('Home');
  const [isOpen, setIsOpen] = useState(false);
  const { unseenCount, markAllNotificationsAsSeen } = useNotifications();

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerTrigger>
        <div className="data-state-open:bg-neutral-300 relative flex size-10 items-center gap-4 rounded-full border-neutral-300 transition hover:bg-neutral-300">
          <BellRing size={20} className="m-auto rotate-12" />
          {/* {unseenCount && (
            <div className="absolute right-2 top-2 size-4 rounded-full bg-red-500" />
          )} */}
        </div>
      </DrawerTrigger>

      <DrawerContent className="ml-auto h-screen w-4/5 border-none md:w-full md:max-w-[40rem]">
        <DrawerHeader className="flex items-baseline justify-between">
          <DrawerTitle>{t('M110')}</DrawerTitle>
          <Button onSelect={markAllNotificationsAsSeen} variant="ghost">
            {t('M111')}
          </Button>
        </DrawerHeader>

        <div className="p-4">
          <NotificationsList onClose={setIsOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
