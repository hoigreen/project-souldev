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
import AvatarUser from '../ui/app/avatar-user';

interface NotificationCardProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  image?: string;
  title: string;
  description: string;
  type: NotificationType;
  createdAt: string;
  seen?: boolean;
  markAsRead: (id: string) => void;
}

export function NotificationCard({
  id,
  image,
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
        'bg-neutral item-center relative flex w-full cursor-pointer items-center rounded-lg border px-3 py-2 text-xs md:p-4 md:text-sm',
        {
          'bg-neutral-50': !seen || isHovered,
        },
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grow" onClick={onClick}>
        <div className="flex items-center gap-2 md:gap-3">
          {image ? (
            <AvatarUser
              src={image}
              fallback={image}
              alt="notification"
              className="size-8 md:size-10"
            />
          ) : (
            <InfoCircle
              variant="Bold"
              className={cn(
                'size-8 md:size-10',
                type === NotificationType.Success
                  ? 'text-green-500'
                  : 'text-red-500',
              )}
            />
          )}

          <div className="flex grow flex-col">
            <p className="whitespace-normal text-sm leading-none text-neutral-800 md:text-base">
              {title}
            </p>
            <Typography content={description} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div className="whitespace-nowrap text-[8px] font-light italic text-neutral-600 sm:text-xs md:text-sm">
          {calculateTime(createdAt)}
        </div>

        {!seen && <div className="size-2 rounded-full bg-blue-600 md:size-3" />}
      </div>

      {!seen && isHovered && (
        <div className="absolute inset-y-0 right-4 z-10 flex items-center transition">
          <Popover>
            <PopoverTrigger className="flex size-5 items-center justify-center rounded-full border bg-white dark:bg-black md:size-10">
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
