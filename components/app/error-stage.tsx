import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { buttonVariants } from '../ui/button';
import PageNotFoundImage from '@/public/illustrations/404.svg';
import ServerErrorImage from '@/public/illustrations/500.svg';
import UnauthorizedImage from '@/public/illustrations/401.svg';
import React from 'react';
import Image from 'next/image';

export enum ErrorStageType {
  PageNotFound = 'PageNotFound',
  ServerError = 'ServerError',
  Unauthorized = 'Unauthorized',
  ResourceNotFound = 'ResourceNotFound',
}

type ErrorStageTypeMap = {
  [key in ErrorStageType]: {
    title: string;
    description: string;
    action: string;
    href: string;
    image: React.ReactNode;
  };
};

const errorStageTypeMap: ErrorStageTypeMap = {
  [ErrorStageType.ResourceNotFound]: {
    action: 'Go back to home',
    description: 'The resource you are looking for does not exist.',
    href: '/',
    image: (
      <Image
        src={PageNotFoundImage}
        width={282}
        height={219}
        className="aspect-[282/219] h-auto max-w-full"
        alt="Page not found"
      />
    ),
    title: 'Resource not found',
  },
  [ErrorStageType.PageNotFound]: {
    action: 'Go back to home',
    description: 'The page you are looking for does not exist.',
    href: '/',
    image: (
      <Image
        src={PageNotFoundImage}
        width={282}
        height={219}
        className="aspect-[282/219] h-auto max-w-full"
        alt="Page not found"
      />
    ),
    title: 'Page not found',
  },
  [ErrorStageType.ServerError]: {
    action: 'Go back to home',
    description:
      'The server has been deserted for a while. Try to refresh this page or feel free to contact us if the problem persists.',
    href: '/',
    image: (
      <Image
        src={ServerErrorImage}
        width={275}
        height={240}
        className="aspect-[275/240] h-auto max-w-full"
        alt="Server error"
      />
    ),
    title: 'Internal Server Error',
  },
  [ErrorStageType.Unauthorized]: {
    action: 'Go back to home',
    description: 'You are not authorized to access this page.',
    href: '/',
    image: (
      <Image
        src={UnauthorizedImage}
        width={284}
        height={245}
        className="aspect-[284/245] h-auto max-w-full"
        alt="Unauthorized"
      />
    ),
    title: 'Unauthorized',
  },
};

export function ErrorStage({
  stage,
  className,
  title,
  description,
}: {
  className?: string;
  title?: string;
  description?: string;
  stage: ErrorStageType;
}): React.JSX.Element {
  const {
    title: defaultTitle,
    description: defaultDescription,
    action,
    href,
    image,
  } = errorStageTypeMap[stage];

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

        <Link
          className={twMerge(
            buttonVariants(),
            'mt-7.5 w-fit max-w-xs sm:w-full',
          )}
          href={href}
        >
          {action}
        </Link>
      </div>
    </div>
  );
}
