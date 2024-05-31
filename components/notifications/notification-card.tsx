'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useTranslations } from 'next-intl';
import React, { HTMLAttributes, useState } from 'react';
import { InfoCircle, More } from 'iconsax-react';
import { Typography } from '../ui/typography';
import { calculateTime, cn } from '@/lib/utils';
import { NotificationType } from '@/lib/constants';

interface NotificationCardProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  description: string;
  type: NotificationType;
  createdAt: string;
  seen?: boolean;
  markAsRead: (id: string) => void;
}

export function NotificationCard({
  id,
  title,
  description,
  type = NotificationType.Success,
  seen,
  createdAt,
  markAsRead,
  onClick,
}: NotificationCardProps): React.JSX.Element {
  const t = useTranslations('Home');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={id}
      className={cn(
        'bg-neutral item-center relative flex w-full cursor-pointer items-center rounded-lg border p-3 text-sm md:p-4',
        {
          'bg-neutral-50': !seen || isHovered,
        },
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grow" onClick={onClick}>
        <div className="flex items-center gap-3">
          <InfoCircle
            variant="Bold"
            size={28}
            className={cn(
              type === NotificationType.Success
                ? 'text-green-500'
                : 'text-red-500',
            )}
          />

          <div className="flex grow flex-col">
            <p className="text-base font-medium text-neutral-800">{title}</p>
            <Typography content={description} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div className="whitespace-nowrap text-xs font-light italic text-neutral-600">
          {calculateTime(createdAt)}
        </div>

        {!seen && <div className="size-3 rounded-full bg-blue-600" />}
      </div>

      {!seen && isHovered && (
        <div className="absolute inset-y-0 right-4 z-10 flex items-center transition">
          <Popover>
            <PopoverTrigger className="flex size-10 items-center justify-center rounded-full border bg-white dark:bg-black">
              <More variant="TwoTone" />
            </PopoverTrigger>
            <PopoverContent align="end" className="max-w-40">
              <div
                className="cursor-pointer text-xs"
                onClick={() => {
                  markAsRead(id);
                }}
              >
                {t('M112')}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
