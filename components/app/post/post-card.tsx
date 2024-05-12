import Image from 'next/image';
import Link from 'next/link';

import { cn, formatDateString } from '@/lib/utils';
import React from 'react';
// import DeleteThread from "../forms/DeleteThread";
// import EditThread from "../atoms/EditThread";
// import ReactThread from "../atoms/ReactThread";

export type PostCardProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  reactions: {
    image: string;
    _id: string;
    id: string;
    name: string;
    username: string;
  }[];
  isComment?: boolean;
  reactState?: boolean;
};

export default function PostCard({
  className,
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  reactions,
  isComment,
  reactState,
}: PostCardProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-xl',
        isComment ? 'xs:px-7 px-0' : 'bg-dark-2 p-7',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative size-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="text-base-semibold text-light-1 cursor-pointer">
                {author.name}
              </h4>
            </Link>

            <p className="text-small-regular text-light-2 mt-2">{content}</p>

            <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                {/* <ReactThread
                  threadId={id}
                  currentUserId={currentUserId}
                  interactState={reactState}
                  parentId={parentId}
                  isComment={isComment}
                /> */}
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>

              <div className="flex flex-row gap-2">
                {isComment && (
                  <>
                    {comments.length > 0 && (
                      <Link href={`/thread/${id}`}>
                        <p className="text-subtle-medium text-gray-1 mt-1">
                          {comments.length}{' '}
                          {comments.length > 1 ? 'replies' : 'reply'}
                        </p>
                      </Link>
                    )}

                    {comments.length > 0 && reactions.length > 0 && (
                      <p className="text-subtle-medium text-gray-1 mt-1">•</p>
                    )}

                    {reactions.length > 0 && (
                      <Link href={`/thread/reactions/${id}`}>
                        <p className="text-subtle-medium text-gray-1 mt-1">
                          {reactions.length}{' '}
                          {reactions.length > 1 ? 'likes' : 'like'}
                        </p>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          {/* <DeleteThread
            threadId={JSON.stringify(id)}
            currentUserId={currentUserId}
            authorId={author.id}
            parentId={parentId}
            isComment={isComment}
          />
          <EditThread
            threadId={JSON.stringify(id)}
            currentUserId={currentUserId}
            authorId={author.id}
          /> */}
        </div>
      </div>

      <div className="flex flex-row gap-2">
        {!isComment && (
          <>
            {comments.length > 0 && (
              <div className="ml-1 mt-3 flex items-center gap-2">
                {comments.slice(0, 2).map((comment, index) => (
                  <Image
                    key={index}
                    src={comment.author.image}
                    alt={`user_${index}`}
                    width={24}
                    height={24}
                    className={`${
                      index !== 0 && '-ml-5'
                    } rounded-full object-cover`}
                  />
                ))}

                <Link href={`/thread/${id}`}>
                  <p className="text-subtle-medium text-gray-1 mt-1">
                    {comments.length}{' '}
                    {comments.length > 1 ? 'replies' : 'reply'}
                  </p>
                </Link>
              </div>
            )}

            {comments.length > 0 && reactions.length > 0 && (
              <div className="ml-1 mt-3 flex items-center">
                <p className="text-subtle-medium text-gray-1 mt-1">•</p>
              </div>
            )}

            {reactions.length > 0 && (
              <div className="ml-1 mt-3 flex items-center gap-2">
                {reactions.slice(0, 2).map((reaction, index) => (
                  <Image
                    key={index}
                    src={reaction.image}
                    alt={`user_${index}`}
                    width={24}
                    height={24}
                    className={`${
                      index !== 0 && '-ml-5'
                    } rounded-full object-cover`}
                  />
                ))}

                <Link href={`/thread/reactions/${id}`}>
                  <p className="text-subtle-medium text-gray-1 mt-1">
                    {reactions.length} {reactions.length > 1 ? 'likes' : 'like'}
                  </p>
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </div>
  );
}
