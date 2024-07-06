import { UserBasic } from '@/lib/definitions';
import { HTMLAttributes } from 'react';
import AvatarUser from '../ui/app/avatar-user';
import { cn } from '@/lib/utils';

export type MessageBoxTypingProps = HTMLAttributes<HTMLDivElement> & {
  data: UserBasic;
};

export function MessageBoxTyping({
  className,
  data,
  ...props
}: MessageBoxTypingProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex max-w-full items-end gap-2 overflow-x-hidden px-6 py-2',
        className,
      )}
    >
      <AvatarUser src={data.image} fallback={data.first_name} />

      <div className="mr-24 w-fit max-w-full overflow-hidden rounded-lg pb-1 text-sm shadow-md md:text-base">
        <div className="flex flex-col whitespace-pre-line break-words bg-white dark:bg-purple-800">
          <div className="flex h-fit items-center justify-center space-x-1 bg-white px-3 py-4 dark:invert">
            <div className="size-1.5 animate-bounce rounded-full bg-neutral-600 [animation-delay:-0.3s]"></div>
            <div className="size-1.5 animate-bounce rounded-full bg-neutral-600 [animation-delay:-0.15s]"></div>
            <div className="size-1.5 animate-bounce rounded-full bg-neutral-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
