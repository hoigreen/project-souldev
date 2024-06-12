'use client';

// import { ConversationBox } from '@/ui/messages/conversation-box';
// import { useChatActions } from '@/hooks/stores/use-chat';
// import { useActiveListActions } from '@/hooks/use-active-list';
import { cva, VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useSocket } from '@/hooks/use-socket';
import { Conversation, Message, User } from '@/lib/definitions';
import useConversation from '@/hooks/use-conversation';

const conversationListVariants = cva(
  'w-full min-w-80 border-r bg-white sm:left-24 md:w-auto lg:block lg:w-80',
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

type ConversationListProps = HTMLAttributes<HTMLElement> &
  Omit<VariantProps<typeof conversationListVariants>, 'isOpen'> & {
    currentUser: User;
    initialItems: Conversation[];
  };

export function ConversationList({
  className,
  initialItems,
  currentUser,
  ...props
}: ConversationListProps) {
  const { conversationId, isOpen } = useConversation();
  const t = useTranslations('Home');
  const { socket } = useSocket();
  const [items, setItems] = useState(initialItems ?? []);

  useEffect(() => {
    console.log(socket);
    if (!socket) {
      return;
    }

    const _socket = socket.current;

    const handleReceiveMessage = (value: Message) => {
      const conversationIndex = items.findIndex(
        (e) => e._id === value.conversationId,
      );

      if (conversationIndex !== -1) {
        const updatedConversation = items[conversationIndex];

        const newItems = items.filter(
          (conversation) => conversation._id !== updatedConversation._id,
        );

        setItems([updatedConversation, ...newItems]);
      } else {
        setItems([...items]);
      }
    };

    // const userOnlineHandler = (value: any) => {
    //   addActiveMember(value.userId);
    // };
    // const userOfflineHandler = (value: any) => {
    //   removeActiveMember(value.userId);
    // };
    // const conversationsUsers = items?.map((item) => item.node.users).flat();

    // setActiveMember(
    //   conversationsUsers.filter((e) => e.isOnline)?.map((e) => e.id),
    // );

    _socket?.on('RECEIVE_MESSAGE', handleReceiveMessage);
    // _socket?.on('USER_OFFLINE', userOfflineHandler);
    // _socket?.on('USER_ONLINE', userOnlineHandler);

    return () => {
      _socket?.off('MESSAGE_RECEIVED', handleReceiveMessage);
      // _socket?.off('USER_OFFLINE', userOfflineHandler);
      // _socket?.off('USER_ONLINE', userOnlineHandler);
    };
  }, [conversationId, currentUser._id, items, socket]);

  return (
    <aside
      className={conversationListVariants({ className, isOpen })}
      {...props}
    >
      <div className="flex h-full flex-col">
        <div className="flex flex-col gap-4 border-b px-4 py-5">
          <div className="text-2xl font-bold">{t('M200')}</div>
        </div>

        {/* {items.map((item, index) => (
          <ConversationBox
            key={index}
            data={item}
            selected={conversationId === item._id}
            currentUser={currentUser}
          />
        ))} */}
      </div>
    </aside>
  );
}
