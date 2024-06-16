import { twMerge } from 'tailwind-merge';
import NEW_CHAT from '@/public/svg/messages/new-chat.svg';
import EMPTY_CHAT from '@/public/svg/messages/empty.svg';
import React from 'react';
import Image from 'next/image';

export enum MessageStageType {
  NewChat = 'NewChat',
  EmptyChat = 'EmptyChat',
}

type MessageStageMap = {
  [key in MessageStageType]: {
    title: string;
    description: string;
    image: React.ReactNode;
  };
};

const messageStages: MessageStageMap = {
  [MessageStageType.EmptyChat]: {
    description: 'Please select a chat to start messaging.',
    image: (
      <Image
        src={EMPTY_CHAT}
        width={282}
        height={219}
        className="aspect-[282/219] h-auto max-w-full"
        alt="No chat selected"
      />
    ),
    title: 'No chat selected',
  },
  [MessageStageType.NewChat]: {
    description: 'Say something to start a new chat',
    image: (
      <Image
        src={NEW_CHAT}
        width={282}
        height={219}
        className="aspect-[282/219] h-auto max-w-full"
        alt="New chat"
      />
    ),
    title: 'Both of you are new here',
  },
};

function MessageStage({
  stage,
  className,
}: {
  className?: string;
  stage: MessageStageType;
}): React.JSX.Element {
  const { title, description, image } = messageStages[stage];

  return (
    <div
      className={twMerge(
        'flex h-full flex-col items-center justify-center space-y-2 px-4 py-12 sm:space-y-5',
        className,
      )}
    >
      {image}

      <div className="text-center">
        <h1 className="text-lg font-bold capitalize md:text-2xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export function MessageStageEmpty() {
  return <MessageStage stage={MessageStageType.EmptyChat} />;
}

export function MessageStageNew() {
  return <MessageStage stage={MessageStageType.NewChat} />;
}
