'use client';

import { Modals } from '@/lib/constants';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModalActions, useModalData, useModalOpen } from '@/hooks/use-modal';
import React, { useEffect } from 'react';
import {
  Locale,
  PostDetailResponse,
  ViewDetailPostData,
} from '@/lib/definitions';
import { getPostById } from '@/lib/actions/post';
import { calculateTime, cn, getFullName } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import ReactPost from '../react-post';
import { useSession } from 'next-auth/react';
import { Clock, MessageText1, Send } from 'iconsax-react';
import CommentForm from '../form/comment-form';
import { Truncate } from '@/components/ui/truncate';
import ListComments from '../list-comments';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import AvatarUser from '@/components/ui/app/avatar-user';
import { useLocale, useTranslations } from 'next-intl';

export function ViewDetailPostDialog(): React.JSX.Element {
  const [postData, setPostData] =
    React.useState<PostDetailResponse['post_data']>();
  const [comments, setComments] =
    React.useState<PostDetailResponse['comment_data']>();
  const [isUpdateData, setIsUpdateData] = React.useState(false);
  const isOpen = useModalOpen(Modals.ViewDetailPost);
  const { onClose } = useModalActions(Modals.ViewDetailPost);
  const { postId } = useModalData<ViewDetailPostData>(Modals.ViewDetailPost, {
    postId: '',
  });
  const { data: session } = useSession();
  const t = useTranslations('Home');
  const locale = useLocale();

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
        className={cn(isHasImage ? 'max-w-7xl' : 'max-w-4xl')}
        classNames={{
          children:
            'flex flex-col gap-4 bg-background md:p-3 lg:flex-row lg:gap-10',
        }}
      >
        <div
          className={cn(
            'flex grow items-center justify-center md:p-3',
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
                    className="object-contain"
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
                            className="object-contain"
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
            isHasImage ? 'w-full lg:max-w-lg' : 'w-full',
          )}
        >
          <div className="space-y-4 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-700">
            <div className="flex items-center gap-3">
              <AvatarUser
                className="size-12"
                src={
                  postData.page_id
                    ? postData.page_id.image_page[0]
                    : postData.user_id.image
                }
                alt="Avatar"
                fallback={
                  postData.page_id
                    ? postData.page_id.name
                    : postData.user_id.first_name
                }
              />

              <div className="space-y-1">
                <p className="text-lg font-bold">
                  {postData.page_id
                    ? postData.page_id.name
                    : getFullName(
                        postData.user_id.first_name,
                        postData.user_id.last_name,
                      )}
                </p>
                <div className="flex items-center gap-1 text-xs font-light italic leading-none">
                  <Clock className="size-3" variant="TwoTone" />
                  {postData.created
                    ? calculateTime(postData.created, locale as Locale)
                    : t('M8')}
                </div>
              </div>
            </div>

            <Truncate text={postData.content} />
          </div>

          <div className="flex gap-3.5">
            <ReactPost
              postId={postData._id}
              isLike={postData.likes.some(
                (like) => like.user_id._id === session?.user._id,
              )}
              onReactedSuccess={() => setIsUpdateData(true)}
              isInPost
              totalLikes={postData.likes.length}
            />

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
                {postData.shares.length ?? 0}
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

          <ListComments comments={comments} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
