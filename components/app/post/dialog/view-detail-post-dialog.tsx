'use client';

import { Modals } from '@/lib/constants';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModalActions, useModalData, useModalOpen } from '@/hooks/use-modal';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { PostDetailResponse, ViewDetailPostData } from '@/lib/definitions';
import { getPostById } from '@/lib/actions/posts';
import { ErrorStage, ErrorStageType } from '../../error-stage';
import { cn, formatDateString, getFullName } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Typography } from '@/components/ui/typography';
import ReactPost from '../react-post';
import { useSession } from 'next-auth/react';
import { MessageText1, Send } from 'iconsax-react';
import CommentForm from '../form/comment-form';
import { useRouter } from '@/navigation';

export function ViewDetailPostDialog(): React.JSX.Element {
  const [postData, setPostData] =
    React.useState<PostDetailResponse['post_data']>();
  const [comments, setComments] =
    React.useState<PostDetailResponse['comment_data']>();
  const isOpen = useModalOpen(Modals.ViewDetailPost);
  const { onClose } = useModalActions(Modals.ViewDetailPost);
  const { postId } = useModalData<ViewDetailPostData>(Modals.ViewDetailPost, {
    postId: '',
  });
  const t = useTranslations('Home');
  const { data: session } = useSession();
  const [isUpdateData, setIsUpdateData] = React.useState(false);

  async function getPostDetails() {
    const response = await getPostById({ postId });

    if (!response.success) {
      return <ErrorStage stage={ErrorStageType.ServerError} />;
    }

    setPostData(response.post_data);
    setComments(response.comment_data ?? []);
  }

  useEffect(() => {
    if (postId === '') return;

    getPostDetails().then();
    setIsUpdateData(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, isOpen, isUpdateData]);

  const isHasImage: boolean | undefined =
    postData && postData?.images.length > 0;

  if (!postData) {
    return <></>;
  }

  const handleCloseDialog = () => {
    onClose();
    setPostData(undefined);
    setComments(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent
        className={cn(
          'flex w-screen gap-10 bg-background p-3',
          isHasImage ? 'max-w-7xl' : 'max-w-4xl',
        )}
      >
        <div
          className={cn(
            'flex grow items-center justify-center p-3',
            !isHasImage && 'hidden',
          )}
        >
          {postData.images.length <= 1 ? (
            postData.images.map((image, index) => (
              <div className="flex flex-1 rounded-xl" key={index}>
                <div className="relative aspect-square size-full">
                  <Image
                    alt={String(postData.user_id.last_name)}
                    fill
                    priority
                    src={image as string}
                  />
                </div>
              </div>
            ))
          ) : (
            <Carousel className="w-full">
              <CarouselContent>
                {postData.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <Image
                            alt={String(image)}
                            fill
                            priority
                            src={image}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>

        <div
          className={cn(
            'space-y-6 bg-background',
            isHasImage ? 'w-lg' : 'w-full',
          )}
        >
          <div className="space-y-4 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-700">
            <div className="flex items-center gap-3">
              <Avatar className="size-12">
                <AvatarImage
                  src={postData.user_id.image}
                  alt={String(postData.user_id.last_name)}
                />
                <AvatarFallback>
                  {postData.user_id.first_name.charAt(0)}
                  {postData.user_id.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <p className="text-lg font-bold">
                  {' '}
                  {getFullName(
                    postData.user_id.first_name,
                    postData.user_id.last_name,
                  )}
                </p>
                <p className="text-sm font-medium">{postData.user_id.email}</p>
              </div>
            </div>

            <Typography content={postData.content} />
          </div>

          <div className="flex gap-3.5">
            <div className="flex items-center gap-0.5">
              <p className="font-semibold">{postData.likes.length}</p>
              <ReactPost
                postId={postData._id}
                isLike={postData.likes.some(
                  (like) => like.user_id._id === session?.user._id,
                )}
                userId={postData.user_id._id}
              />
            </div>

            <div className="flex items-center gap-1 rounded-lg bg-neutral-100 px-2 py-1 dark:bg-neutral-600">
              <MessageText1
                variant="TwoTone"
                size={20}
                className="text-foreground"
              />
              <p className="hidden text-xs font-medium sm:block md:text-sm">
                {comments?.length ?? 0}
              </p>
            </div>

            <div className="flex items-center gap-1 rounded-lg bg-neutral-100 px-2 py-1 dark:bg-neutral-600">
              <Send
                variant="TwoTone"
                size={20}
                className="cursor-pointer text-foreground"
              />
              <p className="hidden text-xs font-medium sm:block md:text-sm">
                {postData.shares.length}
              </p>
            </div>
          </div>

          <hr className="h-px bg-neutral-200" />

          <CommentForm
            user={session?.user}
            postId={postData._id}
            onCommentCreated={() => setIsUpdateData(true)}
          />

          <hr className="h-px bg-neutral-200" />

          <div className="h-full max-h-lvh space-y-4 overflow-auto">
            {!comments ? (
              <p className="text-center text-lg font-semibold">{t('M2')}</p>
            ) : (
              comments.map((comment, index) => (
                <div className="space-y-2" key={index}>
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage
                        src={comment.user_id.image}
                        alt={String(comment.user_id.last_name)}
                      />
                      <AvatarFallback>
                        {comment.user_id.first_name.charAt(0)}
                        {comment.user_id.last_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex grow items-center justify-between">
                      <p className="text-base font-medium">
                        {getFullName(
                          comment.user_id.first_name,
                          comment.user_id.last_name,
                        )}
                      </p>

                      <span className="text-sm italic">
                        {formatDateString(comment.date)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm">{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
