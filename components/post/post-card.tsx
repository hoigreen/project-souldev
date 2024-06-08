'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn, calculateTime, getFullName } from '@/lib/utils';
import React, { useMemo } from 'react';
import {
  Group,
  Like,
  Locale,
  Share,
  SharePostData,
  UserProfile,
  ViewDetailPostData,
} from '@/lib/definitions';
import { ArchiveMinus, Clock, MessageText1, Send } from 'iconsax-react';
import { useLocale, useTranslations } from 'next-intl';
import ReactPost from './react-post';
import Carousel from '@/components/ui/app/carousel';
import { ViewImageDialog } from '@/components/ui/dialogs/view-image-dialog';
import { useModalActions } from '@/hooks/use-modal';
import { Modals } from '@/lib/constants';
import AvatarUser from '@/components/ui/app/avatar-user';
import { Button } from '@/components/ui/button';
import { Truncate } from '@/components/ui/truncate';
import AvatarGroup from '../ui/app/avatar-group';

export type PostCardProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  content?: string;
  author: UserProfile;
  created?: string;
  countComments?: number;
  likes: Like[];
  currentUserId: string;
  images: string[];
  shares: Share[];
  onClickShare?: () => void;
  classNames?: {
    imageContainer?: string;
    image?: string;
    images?: string;
  };
  group?: Group;
  isDisabledComment?: boolean;
};

export default function PostCard({
  className,
  classNames,
  id,
  content,
  author,
  created,
  likes,
  currentUserId,
  countComments,
  images,
  shares,
  onClickShare,
  isDisabledComment,
  group,
}: PostCardProps): React.JSX.Element {
  const locale = useLocale();
  const t = useTranslations('Home');
  const { onOpen: onOpenViewLikesPost } = useModalActions<UserProfile[]>(
    Modals.ViewLikesPost,
  );
  const { onOpen: onOpenViewDetailPost } = useModalActions<ViewDetailPostData>(
    Modals.ViewDetailPost,
  );
  const { onOpen: onOpenSharePost } = useModalActions<SharePostData>(
    Modals.SharePost,
  );

  const postActions = [
    {
      onClick: () => onOpenViewDetailPost({ postId: id }),
      icon: MessageText1,
      label: t('M6'),
    },
    {
      onClick: () =>
        onClickShare ? onClickShare() : onOpenSharePost({ postId: id }),
      icon: Send,
      label: t('M7'),
    },
  ];

  const santinizedLikesData = useMemo(
    () => likes.map((like) => like.user_id),
    [likes],
  );

  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-xl bg-white px-3 py-4 shadow-lg dark:bg-black md:p-7',
        className,
      )}
    >
      <div className="flex size-full grow flex-col gap-3">
        <div className="flex w-full justify-between">
          <div className={cn('flex items-start gap-2', group && 'gap-4')}>
            {group ? (
              <div className="relative rounded border">
                <Link
                  href={`/group/${group._id}`}
                  className="relative block size-12"
                >
                  <AvatarGroup
                    groupName={group.name}
                    groupImage={
                      group.image_group && group.image_group.length > 0
                        ? group.image_group[0]
                        : undefined
                    }
                  />
                </Link>

                <Link
                  href={`/people/${author._id}`}
                  className="absolute -bottom-1 -right-3 block"
                >
                  <AvatarUser
                    src={author.image}
                    alt="Profile"
                    fallback={author.first_name}
                    className="aspect-square size-8 cursor-pointer rounded-full border"
                  />
                </Link>
              </div>
            ) : (
              <Link href={`/people/${author._id}`}>
                <AvatarUser
                  src={author.image}
                  alt="Profile"
                  fallback={author.first_name}
                  className="aspect-square size-12 cursor-pointer rounded-full border"
                />
              </Link>
            )}

            <div className={cn('block space-y-0.5', group && 'space-y-2')}>
              {group && (
                <Link href={`/group/${group._id}`} className="w-fit">
                  <h4 className="cursor-pointer text-lg font-bold leading-none">
                    {group.name}
                  </h4>
                </Link>
              )}

              <div
                className={cn(
                  'space-y-0.5',
                  group && 'flex items-baseline gap-2 space-y-0',
                )}
              >
                <Link href={`/people/${author._id}`} className="w-fit">
                  <h4 className="cursor-pointer text-base font-semibold leading-none">
                    {getFullName(author.first_name, author.last_name)}
                  </h4>
                </Link>
                <Link
                  className="flex items-center gap-1 text-xs font-light italic leading-none"
                  href={`/post/${id}`}
                >
                  <Clock className="size-3" variant="TwoTone" />
                  {created ? calculateTime(created, locale as Locale) : t('M8')}
                </Link>
              </div>
            </div>
          </div>

          <ArchiveMinus size={24} variant="TwoTone" />
        </div>

        <div className="h-full min-h-max grow">
          <Truncate text={content ?? ''} isHtml />
        </div>

        {/* Images */}
        {images.length <= 1 ? (
          images.map((image, index) => (
            <div className="flex flex-1 rounded-xl" key={index}>
              <div
                className={cn(
                  'relative size-full min-h-96',
                  classNames?.imageContainer,
                )}
              >
                <ViewImageDialog alt={String(author.last_name)} src={image}>
                  <Image
                    alt={String(author.last_name)}
                    priority
                    src={image}
                    fill
                    className={cn(
                      'bg-gradient-to-tr from-green-100/80 via-blue-300/80 to-teal-200/80 object-contain object-center',
                      classNames?.image,
                    )}
                  />
                </ViewImageDialog>
              </div>
            </div>
          ))
        ) : (
          <Carousel
            classNames={{
              viewport: 'mx-auto',
              container: 'flex gap-3',
            }}
          >
            {images.map((image, index) => (
              <div
                className="flex flex-[0_0_90%] overflow-hidden md:flex-[0_0_75%] lg:flex-[0_0_70%] xl:flex-[0_0_60%]"
                key={index}
              >
                <div
                  className={cn(
                    'relative size-full min-h-96',
                    classNames?.imageContainer,
                  )}
                >
                  <ViewImageDialog alt={String(author.last_name)} src={image}>
                    <Image
                      alt={String(author.last_name)}
                      className={cn(
                        'object-contain object-left',
                        classNames?.images,
                      )}
                      fill
                      priority
                      src={image}
                    />
                  </ViewImageDialog>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>

      <div className="space-y-3">
        <div className="mt-3 flex items-center justify-between">
          <div
            className="flex cursor-pointer items-center gap-2 hover:opacity-90"
            onClick={() => onOpenViewLikesPost(santinizedLikesData)}
          >
            {santinizedLikesData.length > 0 && (
              <>
                {santinizedLikesData.slice(0, 2).map((like, index) => (
                  <AvatarUser
                    key={index}
                    src={like.image}
                    alt="Profile"
                    fallback={like.first_name}
                    className={cn('size-6', index !== 0 && '-ml-5')}
                  />
                ))}

                <p className="mt-1 text-sm font-medium">
                  {santinizedLikesData.length}{' '}
                  {santinizedLikesData.length > 1 ? 'likes' : 'like'}
                </p>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            {countComments !== 0 && (
              <span>
                {countComments} {t('M6')}
              </span>
            )}

            {shares.length > 0 && (
              <span>
                {shares.length} {t('M7')}
              </span>
            )}
          </div>
        </div>

        <div className="flex divide-x border-t border-neutral-200 dark:border-neutral-700">
          <ReactPost
            postId={id}
            isLike={likes.some((like) => like.user_id._id === currentUserId)}
          />

          {postActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                'grow gap-2 rounded-none bg-transparent px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-600',
                isDisabledComment && index === 0 && 'hidden',
              )}
              onClick={action.onClick}
            >
              <action.icon
                variant="TwoTone"
                size={20}
                className="text-foreground"
              />
              <p className="text-xs font-medium md:text-sm">{action.label}</p>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
