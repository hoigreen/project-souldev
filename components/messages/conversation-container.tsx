'use client';

import { usePeopleInChat } from '@/hooks/use-people-in-chat';
import { useSocket } from '@/hooks/use-socket';
import { Conversation, Message, UserBasic } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { InfiniteScrollContainer } from '../app/infinitiy-scroll-wrapper';
import { MessageBox } from './message-box';

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
  const people = usePeopleInChat(conversation, currentUser);
  const messageRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const { socket: socketClient } = useSocket();

  useEffect(() => {
    const scrollToEnd = () => {
      if (messageRef) {
        messageRef.current?.scrollTo({
          top:
            messageRef.current.scrollHeight - messageRef.current.offsetHeight,
          behavior: 'smooth',
        });
      }
    };

    scrollToEnd();

    const socket = socketClient.current;

    if (!socket) {
      return;
    }

    const messageReceivedHandler = async (message: Message) => {
      const newMessage = {
        from: message.from,
        to: message.to,
        text: message.text,
      } as Message;

      setMessages((current) => [newMessage, ...current]);
      // if (message.from === currentUser._id || message.to === currentUser._id) {
      //   setTimeout(() => {
      //     scrollToEnd();
      //   }, 500);
      // }
    };

    socket.on('RECEIVE_MESSAGE', messageReceivedHandler);

    return () => {
      socket.off('RECEIVE_MESSAGE', messageReceivedHandler);
    };
  }, [conversation._id, currentUser, people, socketClient]);

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
            key={message._id}
            data={message}
            isOwn={currentUser._id === message.from._id}
            isLast={index === messages.length}
          />
        ))}
      </InfiniteScrollContainer>
    </div>
  );
}
