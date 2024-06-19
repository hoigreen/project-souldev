import { twMerge } from 'tailwind-merge';
import EMPTY from '@/public/svg/search/empty.svg';
import NO_SEARCH from '@/public/svg/search/no-search.svg';
import React from 'react';
import Image from 'next/image';

export enum SearchStageType {
  NoSearch = 'NoSearch',
  Empty = 'Empty',
}

type TSearchStage = {
  [key in SearchStageType]: {
    title: string;
    description: string;
    image: React.ReactNode;
  };
};

const searchStages: TSearchStage = {
  [SearchStageType.NoSearch]: {
    description: 'Search to connect and grow your network',
    image: (
      <Image
        src={NO_SEARCH}
        width={282}
        height={219}
        className="aspect-[282/219] h-auto max-w-full"
        alt="Search and connect"
      />
    ),
    title: 'Search and connect',
  },
  [SearchStageType.Empty]: {
    description: 'Hmm, try searching for something else',
    image: (
      <Image
        src={EMPTY}
        width={282}
        height={219}
        className="aspect-[282/219] h-auto max-w-full"
        alt="Ops! No result found."
      />
    ),
    title: 'Ops! No result found.',
  },
};

function SearchStage({
  className,
  description,
  stage,
  title,
}: {
  className?: string;
  description?: string;
  stage: SearchStageType;
  title?: string;
}) {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
  } = searchStages[stage];

  return (
    <div
      className={twMerge(
        'flex h-full flex-col items-center justify-center space-y-2 px-4 py-12 sm:space-y-5',
        className,
      )}
    >
      {image}

      <div className="text-center">
        <h1 className="text-lg font-bold capitalize md:text-2xl">
          {title ?? defaultTitle}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
          {description ?? defaultDescription}
        </p>
      </div>
    </div>
  );
}

export function SearchStageEmpty() {
  return <SearchStage stage={SearchStageType.Empty} />;
}

export function NoSearchStage() {
  return <SearchStage stage={SearchStageType.NoSearch} />;
}
