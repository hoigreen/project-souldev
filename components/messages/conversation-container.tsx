'use client';

import {
  Conversation,
  Message,
  MessageInfo,
  PaginationsResponse,
  UserBasic,
} from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { InfiniteScrollContainer } from '../app/infinitiy-scroll-wrapper';
import { MessageBox } from './message-box';
import { socket } from '@/socket';
import { getMessages } from '@/lib/actions/conversation';
import { MessageBoxTyping } from './message-box-typing';
import { usePeopleInChat } from '@/hooks/use-people-in-chat';

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
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [pagination, setPagination] = useState(initialPagination);
  const messageRef = useRef<HTMLDivElement>(null);
  const people = usePeopleInChat(conversation, currentUser);

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

    const handleTyping = (value: any) => {
      if (value.conversationId === conversation._id) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 5000);
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

    socket.on('TYPING', handleTyping);
    socket.on('RECEIVE_MESSAGE', messageReceivedHandler);

    return () => {
      socket.off('TYPING', handleTyping);
      socket.off('RECEIVE_MESSAGE', messageReceivedHandler);
    };
  }, [conversation._id, currentUser._id]);

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
        {isTyping && <MessageBoxTyping data={people} />}
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
