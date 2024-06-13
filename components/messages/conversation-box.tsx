'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/navigation';
import { HTMLAttributes, useMemo } from 'react';
import { Conversation, User } from '@/lib/definitions';
import AvatarUser from '../ui/app/avatar-user';
import { calculateTime, getFullName } from '@/lib/utils';
import { usePeopleInChat } from '@/hooks/use-people-in-chat';

const conversationBoxVariants = cva(
  'relative flex w-full cursor-pointer flex-col gap-2 rounded-lg py-4 transition hover:bg-neutral-100 md:px-3',
  {
    variants: {
      selected: {
        true: 'bg-neutral-200 before:absolute before:inset-y-0 before:right-0 before:h-full before:w-1 before:rounded before:bg-green-700 before:content-[""] dark:bg-neutral-700',
        false: 'bg-white dark:bg-black',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

type ConversationBoxProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof conversationBoxVariants> & {
    currentUser: User;
    data: Conversation;
  };

export function ConversationBox({
  data,
  className,
  selected,
  currentUser,
  ...props
}: ConversationBoxProps) {
  const t = useTranslations('Home');
  const router = useRouter();
  const people = usePeopleInChat(data, currentUser);

  const lastMessage = useMemo(() => {
    return data.messages[data.messages.length - 1];
  }, [data]);

  return (
    <div {...props} className={className}>
      <Link
        href={`/messages/${data._id}`}
        className={conversationBoxVariants({ className, selected })}
        onClick={() => router.refresh()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AvatarUser src={people.image} fallback={people.first_name} />

            <div className="flex flex-col gap-1 focus:outline-none">
              <p className="text-base font-bold text-neutral-800">
                {getFullName(people.first_name, people.last_name)}
              </p>

              <p className="min-w-32 max-w-40 truncate text-sm">
                {lastMessage.text}
              </p>
            </div>
          </div>

          <p className="shrink-0 text-xs font-light text-gray-400">
            {calculateTime(lastMessage.date)}
          </p>
        </div>
      </Link>
    </div>
  );
}
