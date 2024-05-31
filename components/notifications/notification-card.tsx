import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cx } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import { HTMLAttributes, useState } from 'react';
import { InfoCircle, More } from 'iconsax-react';
import { Typography } from '../ui/typography';
import { calculateTime } from '@/lib/utils';

interface NotificationCardProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  createdAt: string;
  id: string;
  markAsRead: (id: string) => void;
  seen?: boolean;
  title: string;
}

export function NotificationCard({
  id,
  seen,
  title,
  content,
  createdAt,
  markAsRead,
  onClick,
}: NotificationCardProps) {
  const t = useTranslations('Index');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={id}
      className={cx(
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
          <InfoCircle variant="Bold" size={28} className="text-green-500" />
          <div className="space-y-2">
            <p className="font-bold text-neutral-800">{title}</p>
            <Typography content={content as string} />
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
                {t('T_0522')}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
