import Image from 'next/image';
import Link from 'next/link';
import { cn, calculateTime, getFullName } from '@/lib/utils';
import React, { useMemo } from 'react';
import {
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
};

export default function PostCard({
  className,
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
        'w-full rounded-xl bg-white px-3 py-4 shadow-lg dark:bg-black md:p-7',
        className,
      )}
    >
      <div className="space-y-3">
        <div className="flex w-full justify-between">
          <div className="flex gap-2">
            <Link href={`/people/${author._id}`}>
              <AvatarUser
                src={author.image}
                alt="Profile"
                fallback={author.first_name}
                className="aspect-square size-12 cursor-pointer rounded-full border"
              />
            </Link>

            <div className="block space-y-0.5">
              <Link href={`/people/${author._id}`} className="w-fit">
                <h4 className="cursor-pointer text-base font-semibold">
                  {getFullName(author.first_name, author.last_name)}
                </h4>
              </Link>
              <span className="flex items-center gap-2 text-xs font-light italic">
                <Clock className="size-3" variant="TwoTone" />
                {created ? calculateTime(created, locale as Locale) : t('M8')}
              </span>
            </div>
          </div>

          <ArchiveMinus size={24} variant="TwoTone" />
        </div>

        <Truncate text={content ?? ''} isHtml />

        {/* Images */}
        {images.length <= 1 ? (
          images.map((image, index) => (
            <div className="flex flex-1 rounded-xl" key={index}>
              <div className="relative size-full min-h-96">
                <ViewImageDialog alt={String(author.last_name)} src={image}>
                  <Image
                    alt={String(author.last_name)}
                    priority
                    src={image}
                    fill
                    className="object-contain object-left"
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
                <div className="relative size-full min-h-96">
                  <ViewImageDialog alt={String(author.last_name)} src={image}>
                    <Image
                      alt={String(author.last_name)}
                      fill
                      priority
                      className="object-contain object-left"
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
              className="grow gap-2 rounded-none bg-transparent px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-600"
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
