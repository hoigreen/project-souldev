import Image from 'next/image';
import Link from 'next/link';

import { cn, formatDateString, getFullName } from '@/lib/utils';
import React from 'react';
import { Like, UserProfile } from '@/lib/definitions';
import { Clock, MessageText1, Send } from 'iconsax-react';
import { useTranslations } from 'next-intl';
import ReactPost from './react-post';
// import DeleteThread from "../forms/DeleteThread";
// import EditThread from "../atoms/EditThread";
// import ReactThread from "../atoms/ReactThread";

export type PostCardProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  content?: string;
  author: UserProfile;
  page: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt?: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  likes: Like[];
  isComment?: boolean;
  currentUserId: string;
};

export default function PostCard({
  className,
  id,
  content,
  author,
  page,
  createdAt,
  comments,
  likes,
  isComment,
  currentUserId,
}: PostCardProps): React.JSX.Element {
  const t = useTranslations('Home');

  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-xl',
        isComment ? 'xs:px-7 px-0' : 'bg-white p-7 dark:bg-black',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/people/${author._id}`} className="relative size-12">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="aspect-square cursor-pointer rounded-full border"
              />
            </Link>

            <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800 dark:bg-neutral-400" />
          </div>

          <div className="min-h-24 flex-1 space-y-6">
            <div className="grow space-y-3">
              <div className="block space-y-0.5">
                <Link href={`/people/${author._id}`} className="w-fit">
                  <h4 className="cursor-pointer text-base font-semibold">
                    {getFullName(author.first_name, author.last_name)}
                  </h4>
                </Link>
                <span className="flex items-center gap-2 text-xs font-light italic">
                  <Clock className="size-3" variant="TwoTone" />
                  {createdAt ? formatDateString(createdAt) : t('M8')}
                </span>
              </div>

              <p className="mt-2 text-sm">{content}</p>
            </div>

            <div
              className={cn(
                'border-t border-neutral-200 pt-2 dark:border-neutral-700',
                isComment && 'mb-10',
              )}
            >
              <div className="flex gap-3.5">
                {/* React */}
                <ReactPost
                  postId={id}
                  isLike={likes.some(
                    (like) => like.user_id._id === currentUserId,
                  )}
                  userId={author._id}
                  isComment={isComment}
                />

                {/* Comment Post */}
                <Link href={`/post/${id}`}>
                  <div className="flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 hover:bg-neutral-100 dark:bg-neutral-600">
                    <MessageText1
                      variant="TwoTone"
                      size={20}
                      className="text-foreground"
                    />
                    <p className="text-sm font-medium">{t('M6')}</p>
                  </div>
                </Link>

                {/* Share post */}
                <div className="flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 hover:bg-neutral-100 dark:bg-neutral-600">
                  <Send
                    variant="TwoTone"
                    size={20}
                    className="cursor-pointer text-foreground"
                  />
                  <p className="text-sm font-medium">{t('M6')}</p>
                </div>
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

                    {comments.length > 0 && likes.length > 0 && (
                      <p className="text-subtle-medium text-gray-1 mt-1">•</p>
                    )}

                    {likes.length > 0 && (
                      <Link href={`/thread/reactions/${id}`}>
                        <p className="text-subtle-medium text-gray-1 mt-1">
                          {likes.length} {likes.length > 1 ? 'likes' : 'like'}
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

            {comments.length > 0 && likes.length > 0 && (
              <div className="ml-1 mt-3 flex items-center">
                <p className="text-subtle-medium text-gray-1 mt-1">•</p>
              </div>
            )}

            {likes.length > 0 && (
              <div className="ml-1 mt-3 flex items-center gap-2">
                {likes.slice(0, 2).map((like, index) => (
                  <Image
                    key={index}
                    src={like.user_id.image}
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
                    {likes.length} {likes.length > 1 ? 'likes' : 'like'}
                  </p>
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {!isComment && page && (
        <Link
          href={`/communities/${page.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {createdAt ? formatDateString(createdAt) : 'So long ago'}
            {page && ` - ${page.name} Community`}
          </p>

          <Image
            src={page.image}
            alt={page.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </div>
  );
}
