'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { Link, useRouter } from '@/navigation';
import { HTMLAttributes, useMemo } from 'react';
import { Conversation, Message, UserBasic } from '@/lib/definitions';
import AvatarUser from '../ui/app/avatar-user';
import { calculateTime, getFullName } from '@/lib/utils';
import { usePeopleInChat } from '@/hooks/use-people-in-chat';
import { useOnlineUsers } from '@/hooks/use-online';

const conversationBoxVariants = cva(
  'relative flex w-full cursor-pointer flex-col gap-2 rounded-lg px-2 py-4 transition hover:bg-neutral-100 dark:hover:bg-neutral-700 md:px-3 md:transition-all md:hover:shadow-lg',
  {
    variants: {
      selected: {
        true: 'bg-neutral-100 dark:bg-neutral-800',
        false: 'bg-transparent',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

type ConversationBoxProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof conversationBoxVariants> & {
    currentUser: UserBasic;
    data: Conversation;
  };

export function ConversationBox({
  data,
  className,
  selected,
  currentUser,
  ...props
}: ConversationBoxProps) {
  const router = useRouter();
  const people = usePeopleInChat(data, currentUser);
  const usersOnline = useOnlineUsers();
  const isOnline = useMemo(
    () => usersOnline.includes(people._id),
    [people._id, usersOnline],
  );

  const lastMessage =
    data.messages.length === 0
      ? ({ text: 'Start a new conversation' } as Message)
      : data.messages[data.messages.length - 1];

  return (
    <div {...props} className={className}>
      <Link
        prefetch
        href={`/messages/${data._id}`}
        className={conversationBoxVariants({ className, selected })}
        onClick={router.refresh}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <AvatarUser
                src={people.image}
                fallback={people.first_name}
                className="size-12"
              />

              {isOnline && (
                <span className="absolute bottom-0 right-0 block size-2 rounded-full bg-green-500 ring ring-white md:size-3" />
              )}
            </div>

            <div className="flex flex-col gap-1 focus:outline-none">
              <p className="text-base font-bold">
                {getFullName(people.first_name, people.last_name)}
              </p>

              <p className="min-w-32 max-w-44 truncate text-xs md:text-sm">
                {lastMessage.text}
              </p>
            </div>
          </div>

          {lastMessage?.date && (
            <p className="shrink-0 text-xs font-light">
              {calculateTime(lastMessage.date)}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
