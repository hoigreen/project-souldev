'use client';

import {
  Conversation,
  Message,
  MessageInfo,
  PaginationsResponse,
  UserBasic,
} from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { InfiniteScrollContainer } from '../app/infinitiy-scroll-wrapper';
import { MessageBox } from './message-box';
import { socket } from '@/socket';
import { getMessages } from '@/lib/actions/conversation';

export type ConversationContainerProps = HTMLAttributes<HTMLDivElement> & {
  conversation: Conversation;
  currentUser: UserBasic;
  initialMessages: Message[];
  initialPagination: {
    hasNextPage: boolean;
    page: PaginationsResponse<Message[]>['page'];
  };
};

export function ConversationContainer({
  conversation,
  initialMessages,
  initialPagination,
  currentUser,
  className,
  ...props
}: ConversationContainerProps) {
  const t = useTranslations('Home');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [pagination, setPagination] = useState(initialPagination);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const scrollToEnd = () => {
      if (messageRef) {
        messageRef.current?.scrollTo({
          top:
            messageRef.current.scrollHeight - messageRef.current.offsetHeight,
          behavior: 'smooth',
        });
      }
    };

    const messageReceivedHandler = async (data: MessageInfo) => {
      const newMessage = data.message as Message;

      if (
        data.message.from._id === currentUser._id ||
        data.message.to._id === currentUser._id
      ) {
        setMessages((current) => [newMessage, ...current]);
        setTimeout(() => scrollToEnd(), 500);
      }
    };

    socket.on('RECEIVE_MESSAGE', messageReceivedHandler);

    return () => {
      socket.off('RECEIVE_MESSAGE', messageReceivedHandler);
    };
  }, [currentUser._id]);

  const handleNextPages = async () => {
    const { items, success, page, totalPage } = await getMessages(
      conversation._id,
      {
        page: initialPagination.page + 1,
      },
    );

    if (!success) {
      return;
    }

    const loadedMessages: Message[] = items ?? ([] as Message[]);

    setMessages((current) => [...current, ...loadedMessages]);
    setPagination({
      page,
      hasNextPage: page < totalPage,
    });
  };

  return (
    <div
      ref={messageRef}
      {...props}
      className={cn(
        'relative grow overflow-y-auto bg-neutral-50 dark:bg-black',
        className,
      )}
    >
      <InfiniteScrollContainer
        id="chat-messages"
        ref={messageRef}
        inverse
        hasMore={!!pagination.hasNextPage}
        className="flex h-full flex-col-reverse overflow-y-auto"
        dataLength={messages.length}
        onNext={handleNextPages}
        onRefresh={() => console.log('resetting messages')}
      >
        {messages.map((message, index) => (
          <MessageBox
            key={index}
            data={message}
            isOwn={currentUser._id === message.from._id}
          />
        ))}
      </InfiniteScrollContainer>
    </div>
  );
}
