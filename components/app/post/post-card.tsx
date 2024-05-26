import Image from 'next/image';
import Link from 'next/link';
import { cn, calculateTime, getFullName } from '@/lib/utils';
import React from 'react';
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
import { Typography } from '@/components/ui/typography';
import { useModalActions } from '@/hooks/use-modal';
import { Modals } from '@/lib/constants';
import AvatarUser from '@/components/ui/app/avatar-user';
import { Button } from '@/components/ui/button';

export type PostCardProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  content?: string;
  author: UserProfile;
  created?: string;
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
  images,
  shares,
  onClickShare,
}: PostCardProps): React.JSX.Element {
  const locale = useLocale();
  const t = useTranslations('Home');
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

        <Typography content={content} />

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
        <div className="flex items-center justify-between">
          {likes.length > 0 && (
            <div className="ml-1 mt-3 flex items-center gap-2">
              {likes.slice(0, 2).map((like, index) => (
                <AvatarUser
                  key={index}
                  src={like.user_id.image}
                  alt="Profile"
                  fallback={like.user_id.first_name}
                  className={cn('size-6', index !== 0 && '-ml-5')}
                />
              ))}

              <p className="mt-1 text-sm font-medium">
                {likes.length} {likes.length > 1 ? 'likes' : 'like'}
              </p>
            </div>
          )}

          {shares.length > 0 && (
            <div className="ml-1 mt-3 flex items-center gap-2 text-base">
              {shares.length} {t('M7')}
            </div>
          )}
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
              className="grow gap-2 rounded-none px-4 py-3 hover:bg-neutral-100 dark:bg-neutral-600"
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
