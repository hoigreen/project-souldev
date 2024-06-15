'use client';

import {
  Conversation,
  Message,
  MessageInfo,
  UserBasic,
} from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { InfiniteScrollContainer } from '../app/infinitiy-scroll-wrapper';
import { MessageBox } from './message-box';
import { socket } from '@/socket';

export type ConversationContainerProps = HTMLAttributes<HTMLDivElement> & {
  conversation: Conversation;
  currentUser: UserBasic;
  initialMessages: Message[];
  // initialPagination: PaginatedMessage['pageInfo'];
};

export function ConversationContainer({
  conversation,
  initialMessages,
  currentUser,
  className,
  ...props
}: ConversationContainerProps) {
  const t = useTranslations('Home');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
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

  // const refreshMessages = async () => {
  //   const { data } = await queryMessages(
  //     {
  //       conversationId: Number(conversation.id),
  //       first: MESSAGES_PER_REQUEST,
  //       after: pagination?.endCursor,
  //     },
  //     {
  //       Authorization: `Bearer ${session?.user.chatToken}`,
  //     },
  //   );

  //   const loadedMessages: MessageEdge[] = data.messages?.edges
  //     ? (data.messages?.edges as MessageEdge[])
  //     : ([] as MessageEdge[]);
  //   setPagination(data.messages.pageInfo);
  //   setMessages((current) => [...current, ...loadedMessages]);
  // };

  return (
    <div
      ref={messageRef}
      {...props}
      className={cn('relative grow overflow-y-auto', className)}
    >
      <InfiniteScrollContainer
        id="chat-messages"
        ref={messageRef}
        inverse
        hasMore={true}
        className="flex h-full flex-col-reverse overflow-y-auto"
        dataLength={messages.length}
        onNext={() => console.log('onNext')}
        onRefresh={() => console.log('onRefresh')}
      >
        {messages.map((message, index) => (
          <MessageBox
            key={index}
            data={message}
            isOwn={currentUser._id === message.from._id}
            isLast={index === messages.length}
          />
        ))}
      </InfiniteScrollContainer>
    </div>
  );
}
