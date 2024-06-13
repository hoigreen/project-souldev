'use client';

import { cn, getFullName } from '@/lib/utils';
import { BackLink } from '../app/back-link';
import AvatarUser from '../ui/app/avatar-user';
import { usePeopleInChat } from '@/hooks/use-people-in-chat';
import { HTMLAttributes } from 'react';
import { Conversation, UserBasic } from '@/lib/definitions';

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
  const people = usePeopleInChat(conversation, currentUser);

  return (
    <div
      {...props}
      className={cn(
        'flex w-full items-center border-b bg-white px-3 py-4 md:justify-center md:py-5',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <BackLink className="md:hidden" />

        <AvatarUser src={people.image} fallback={people.first_name} />

        <div className="text-base font-bold md:text-lg">
          {getFullName(people.first_name, people.last_name)}
        </div>
      </div>
    </div>
  );
}
