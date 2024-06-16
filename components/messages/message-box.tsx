'use client';

import { Locale, Message } from '@/lib/definitions';
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import AvatarUser from '../ui/app/avatar-user';
import { calculateTime, cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

const messageBoxVariants = cva(
  'flex max-w-full items-end gap-2 overflow-x-hidden px-6 py-4',
  {
    variants: {
      isOwn: {
        true: 'justify-end',
      },
    },
    defaultVariants: {
      isOwn: false,
    },
  },
);

const messageBoxAvatarVariants = cva('', {
  variants: {
    isOwn: {
      true: 'order-2',
    },
  },
  defaultVariants: {
    isOwn: false,
  },
});

const messageBoxBodyVariants = cva('flex flex-col gap-2', {
  variants: {
    isOwn: {
      true: 'max-w-[calc(100%-5rem)] items-end',
      false: 'max-w-[calc(100%-5rem-2.75rem)]',
    },
  },
  defaultVariants: {
    isOwn: false,
  },
});

const messageBoxMessageVariants = cva('w-fit max-w-full pb-1', {
  variants: {
    isOwn: {
      true: 'ml-24',
      false: 'mr-24',
    },
  },
  defaultVariants: {
    isOwn: false,
  },
});

export type MessageBoxProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof messageBoxVariants> & {
    data: Message;
  };

export function MessageBox({
  className,
  data,
  isOwn,
  ...props
}: MessageBoxProps) {
  const locale = useLocale();

  return (
    <div {...props} className={messageBoxVariants({ className, isOwn })}>
      {!isOwn && (
        <div className={messageBoxAvatarVariants({ isOwn })}>
          <AvatarUser src={data.from.image} fallback={data.from.first_name} />
        </div>
      )}

      <div className={messageBoxBodyVariants({ isOwn })}>
        <div className={messageBoxMessageVariants({ isOwn })}>
          <div className="text-xs font-light italic">
            {calculateTime(data.date, locale as Locale)}
          </div>

          <div className="w-full overflow-hidden rounded-lg text-sm shadow-md md:text-base">
            <div
              className={cn(
                'flex flex-col whitespace-pre-line break-words p-3',
                isOwn
                  ? 'bg-neutral-200/60 dark:bg-zinc-600 dark:bg-opacity-60'
                  : ' bg-white dark:bg-purple-800',
              )}
            >
              {data.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
