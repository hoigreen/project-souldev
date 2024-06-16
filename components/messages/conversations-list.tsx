'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import { HTMLAttributes, useEffect, useState } from 'react';
import { Conversation, MessageInfo, User } from '@/lib/definitions';
import useConversation from '@/hooks/use-conversation';
import { ConversationBox } from './conversation-box';
import { socket } from '@/socket';
import { useOnlineActions } from '@/hooks/use-online';

const conversationsListVariants = cva(
  'w-full min-w-96 bg-white dark:border dark:bg-black md:block md:w-96 md:overflow-hidden md:rounded-lg md:shadow-md',
  {
    variants: {
      isOpen: {
        true: 'hidden',
        false: 'block w-full',
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  },
);

type ConversationsListProps = HTMLAttributes<HTMLElement> &
  Omit<VariantProps<typeof conversationsListVariants>, 'isOpen'> & {
    currentUser: User;
    initialItems: Conversation[];
  };

export function ConversationsList({
  className,
  initialItems,
  currentUser,
  ...props
}: ConversationsListProps) {
  const { conversationId, isOpen } = useConversation();
  const t = useTranslations('Home');
  const [items, setItems] = useState(initialItems ?? []);
  const onlineAction = useOnlineActions();

  useEffect(() => {
    const handleUserOnline = (value: any) => onlineAction.set(value);

    const handleReceiveMessage = (value: MessageInfo) => {
      const conversationIndex = items.findIndex(
        (item) => item._id === value.conversationId,
      );

      if (conversationIndex !== -1) {
        const updatedConversation = items[conversationIndex];

        const newItems = items.filter(
          (conversation) => conversation._id !== updatedConversation._id,
        );

        setItems([updatedConversation, ...newItems]);
      } else {
        setItems(items);
      }
    };

    socket.on('USERS_ONLINE', handleUserOnline);
    socket.on('RECEIVE_MESSAGE', handleReceiveMessage);

    return () => {
      socket.off('USER_ONLINE', handleUserOnline);
      socket.off('MESSAGE_RECEIVED', handleReceiveMessage);
    };
  }, [items, onlineAction]);

  return (
    <aside
      className={conversationsListVariants({ className, isOpen })}
      {...props}
    >
      <div className="flex h-full flex-col gap-8 p-1">
        <h2 className="px-2 py-4 text-2xl font-bold">{t('M200')}</h2>

        <div className="grow gap-2 overflow-y-auto">
          {items.length === 0 && (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-sm md:text-base">{t('M203')}</p>
            </div>
          )}

          {items.map((item, index) => (
            <ConversationBox
              key={index}
              currentUser={currentUser}
              data={item}
              selected={conversationId === item._id}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
