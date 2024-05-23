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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useModalActions } from '@/hooks/use-modal';
import { Modals } from '@/lib/constants';
import AvatarUser from '@/components/ui/app/avatar-user';

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

  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-xl bg-white p-7 shadow-lg dark:bg-black',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/people/${author._id}`}>
              <AvatarUser
                src={author.image}
                alt="Profile"
                fallback={author.first_name}
                className="aspect-square size-12 cursor-pointer rounded-full border"
              />
            </Link>

            <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800 dark:bg-neutral-400" />
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <div className="flex w-full justify-between">
                <div className="block space-y-0.5">
                  <Link href={`/people/${author._id}`} className="w-fit">
                    <h4 className="cursor-pointer text-base font-semibold">
                      {getFullName(author.first_name, author.last_name)}
                    </h4>
                  </Link>
                  <span className="flex items-center gap-2 text-xs font-light italic">
                    <Clock className="size-3" variant="TwoTone" />
                    {created
                      ? calculateTime(created, locale as Locale)
                      : t('M8')}
                  </span>
                </div>

                <ArchiveMinus size={24} variant="TwoTone" />
              </div>

              <Typography content={content} />

              {/* Images */}
              {images.length <= 1 ? (
                images.map((image, index) => (
                  <div className="flex flex-1 rounded-xl" key={index}>
                    <div className="relative size-full min-h-96">
                      <ViewImageDialog
                        alt={String(author.last_name)}
                        src={image}
                      >
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
                        <ViewImageDialog
                          alt={String(author.last_name)}
                          src={image}
                        >
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

            <div className="border-t border-neutral-200 pt-2 dark:border-neutral-700">
              <div className="flex gap-3.5">
                {/* React */}
                <ReactPost
                  postId={id}
                  isLike={likes.some(
                    (like) => like.user_id._id === currentUserId,
                  )}
                />

                {/* Comment Post */}
                <div
                  className="flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 hover:bg-neutral-100 dark:bg-neutral-600"
                  onClick={() => onOpenViewDetailPost({ postId: id })}
                >
                  <MessageText1
                    variant="TwoTone"
                    size={20}
                    className="text-foreground"
                  />
                  <p className="hidden text-xs font-medium sm:block md:text-sm">
                    {t('M6')}
                  </p>
                </div>

                {/* Share post */}
                <div
                  className="flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 hover:bg-neutral-100 dark:bg-neutral-600"
                  onClick={() =>
                    onClickShare
                      ? onClickShare()
                      : onOpenSharePost({ postId: id })
                  }
                >
                  <Send
                    variant="TwoTone"
                    size={20}
                    className="cursor-pointer text-foreground"
                  />
                  <p className="hidden text-xs font-medium sm:block md:text-sm">
                    {t('M7')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {likes.length > 0 && (
          <div className="ml-1 mt-3 flex items-center gap-2">
            {likes.slice(0, 2).map((like, index) => (
              <Avatar
                className={cn('size-6', index !== 0 && '-ml-5')}
                key={index}
              >
                <AvatarImage src={like.user_id.image} alt="Avatar" />
                <AvatarFallback>{like.user_id.first_name}</AvatarFallback>
              </Avatar>
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
    </div>
  );
}
