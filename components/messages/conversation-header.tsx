'use client';

import { cn, getFullName } from '@/lib/utils';
import { BackLink } from '../app/back-link';
import AvatarUser from '../ui/app/avatar-user';
import { usePeopleInChat } from '@/hooks/use-people-in-chat';
import { HTMLAttributes, useMemo } from 'react';
import { Conversation, UserBasic } from '@/lib/definitions';
import { useOnlineUsers } from '@/hooks/use-online';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

type ConversationHeaderProps = HTMLAttributes<HTMLDivElement> & {
  conversation: Conversation;
  currentUser: UserBasic;
};

export function ConversationHeader({
  className,
  conversation,
  currentUser,
  ...props
}: ConversationHeaderProps) {
  const t = useTranslations('Home');
  const people = usePeopleInChat(conversation, currentUser);
  const usersOnline = useOnlineUsers();
  const isOnline = useMemo(
    () => usersOnline.includes(people._id),
    [people._id, usersOnline],
  );

  return (
    <div
      {...props}
      className={cn(
        'flex w-full items-center border-b bg-white p-3 dark:bg-black',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <BackLink className="md:hidden" />

        <Link href={`/people/${people._id}`} className="relative block">
          <AvatarUser
            src={people.image}
            fallback={people.first_name}
            className="size-14"
          />

          {isOnline && (
            <span className="absolute bottom-0 right-0 block size-2 rounded-full bg-green-500 ring ring-white md:size-3" />
          )}
        </Link>

        <div>
          <p className="text-base font-bold md:text-lg">
            {getFullName(people.first_name, people.last_name)}
          </p>
          {isOnline && (
            <p className="text-xs font-light italic md:text-sm">{t('M201')}</p>
          )}
        </div>
      </div>
    </div>
  );
}
