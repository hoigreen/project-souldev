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
        'bg-neutral item-center relative flex w-full cursor-pointer rounded-xl p-2 text-sm',
        {
          'bg-neutral-200': !seen || isHovered,
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
          <div className="space-y-2">
            <p className="font-bold text-neutral-800">{title}</p>
            <Typography content={description} />
          </div>
        </div>
      </div>

      <div className="whitespace-nowrap text-xs text-neutral-600">
        {calculateTime(createdAt)}
      </div>

      {!seen && (
        <div className="absolute inset-y-0 right-4 z-[5] flex items-center transition">
          <div className="h-3 w-3 rounded-full bg-blue-400" />
        </div>
      )}

      {!seen && isHovered && (
        <div className="absolute inset-y-0 right-4 z-10 flex items-center transition">
          <Popover>
            <PopoverTrigger>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-800">
                <More variant="TwoTone" />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div
                className="cursor-pointer px-5 py-3 hover:bg-neutral-200"
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
