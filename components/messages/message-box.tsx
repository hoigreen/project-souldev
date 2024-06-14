import { Message } from '@/lib/definitions';
import { Link } from '@/navigation';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import { HTMLAttributes, useMemo } from 'react';
import { Avatar } from '../ui/avatar';
import AvatarUser from '../ui/app/avatar-user';
import { calculateTime, cn, getFullName } from '@/lib/utils';

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

const messageBoxMessageVariants = cva('w-fit max-w-full', {
  variants: {
    isOwn: {
      true: 'ml-20',
      false: 'mr-20',
    },
  },
  defaultVariants: {
    isOwn: false,
  },
});

export type MessageBoxProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof messageBoxVariants> & {
    data: Message;
    isLast?: boolean;
  };

export function MessageBox({
  className,
  data,
  isOwn,
  isLast: _isLast,
  ...props
}: MessageBoxProps) {
  return (
    <div {...props} className={messageBoxVariants({ className, isOwn })}>
      {!isOwn && (
        <div className={messageBoxAvatarVariants({ isOwn })}>
          <AvatarUser src={data.from.image} fallback={data.from.first_name} />
        </div>
      )}

      <div className={messageBoxBodyVariants({ isOwn })}>
        <div className={messageBoxMessageVariants({ isOwn })}>
          <div className="mb-1 flex w-full items-center justify-between gap-1">
            {!isOwn && (
              <div className="text-sm font-bold text-neutral-800">
                {getFullName(data.from.first_name, data.from.last_name)}
              </div>
            )}

            <div className="text-sm font-normal text-neutral-600">
              {calculateTime(data.date)}
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-2xl bg-transparent text-base">
            <div
              className={cn(
                'flex flex-col whitespace-pre-line break-words p-3',
                isOwn
                  ? 'text-base-4 bg-neutral-100'
                  : ' bg-white text-neutral-800',
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
