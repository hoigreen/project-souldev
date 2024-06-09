'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import Image from 'next/image';
import { ImagePlus } from 'lucide-react';
import { Page, UserBasic } from '@/lib/definitions';
import AvatarUser from '../ui/app/avatar-user';
import { EmphasizedTextBold } from '../ui/emphasize';
import { Button } from '../ui/button';
import { CloseCircle, Dislike, Like1, TickCircle } from 'iconsax-react';
import toast from 'react-hot-toast';
import { useRouter } from '@/navigation';
import {
  followPage,
  likePage,
  unfollowPage,
  unlikePage,
} from '@/lib/actions/page';

type PageDetailsSectionProps = React.HTMLAttributes<HTMLDivElement> & {
  data: Page;
  isLiked: boolean;
  isFollowing: boolean;
};

export default function PageDetailsSection({
  className,
  data,
  isLiked,
  isFollowing,
}: PageDetailsSectionProps) {
  const t = useTranslations('Home');
  const router = useRouter();
  const pageId = data._id;
  const dataLikes = useMemo(
    () => data.likes.map((item) => item.user_id),
    [data],
  ) as UserBasic[];
  const dataFolowers = useMemo(
    () => data.followers.map((item) => item.user_id),
    [data],
  );
  const dataLikesAndFollowers = useMemo(
    () => dataLikes.concat(dataFolowers),
    [dataLikes, dataFolowers],
  );

  const handleLikePage = async () => {
    const response = isLiked ? unlikePage({ pageId }) : likePage({ pageId });

    if (!(await response).success) {
      toast.error(t('M15'));

      return;
    }

    toast.success(t(isLiked ? 'M177' : 'M176'));
    router.refresh();
  };

  const handleFollowPage = async () => {
    const response = isFollowing
      ? unfollowPage({ pageId })
      : followPage({ pageId });

    if (!(await response).success) {
      toast.error(t('M15'));

      return;
    }

    toast.success(t(isFollowing ? 'M179' : 'M178'));
    router.refresh();
  };

  return (
    <Card
      className={cn(
        'space-y-4 border-none bg-transparent shadow-none md:space-y-6',
        className,
      )}
    >
      <div className="relative flex aspect-[24/9] w-full items-center justify-center overflow-hidden rounded-lg border bg-neutral-200 dark:bg-neutral-600">
        {data.image_page && data.image_page[0] ? (
          <Image
            src={data.image_page[0]}
            alt={data.name}
            fill
            className="absolute inset-0 size-full"
          />
        ) : (
          <ImagePlus size={48} />
        )}
      </div>

      <div className="flex flex-col items-center gap-3 md:gap-4">
        <h2
          className={cn(
            'text-lg font-bold md:text-lg lg:text-2xl',
            data.name
              ? 'text-neutral-900 dark:text-neutral-100'
              : 'text-neutral-500 dark:text-neutral-400',
          )}
        >
          {data.name}
        </h2>

        <div className="flex items-center justify-center gap-3">
          <p className="text-center text-sm md:text-base">
            {t.rich('M190', {
              emphasize: EmphasizedTextBold,
              count: dataLikes.length,
            })}
          </p>

          <p className="text-center text-sm md:text-base">
            {t.rich('M191', {
              emphasize: EmphasizedTextBold,
              count: dataFolowers.length,
            })}
          </p>
        </div>

        {dataLikesAndFollowers.length > 0 && (
          <div className="flex cursor-pointer items-center gap-2 hover:opacity-90">
            {data.likes.map((item, index) => (
              <AvatarUser
                key={item.user_id._id}
                className={cn(
                  'size-12 rounded-full border bg-neutral-100 dark:bg-neutral-700',
                  index !== 0 && '-ml-5',
                )}
                src={item.user_id.image}
                fallback={item.user_id.first_name}
              />
            ))}
          </div>
        )}

        <div className="flex w-full max-w-lg flex-col items-center justify-center gap-2 md:flex-row md:gap-3">
          <Button
            className="flex w-full grow items-center gap-1 text-center text-xs sm:text-sm md:w-1/2"
            variant={isLiked ? 'outline' : 'default'}
            onClick={handleLikePage}
          >
            {isLiked ? (
              <>
                <Dislike variant="Bold" size={16} />
                {t('M173')}
              </>
            ) : (
              <>
                <Like1 variant="Bold" size={16} />
                {t('M174')}
              </>
            )}
          </Button>

          <Button
            className="flex w-full grow items-center gap-1 text-center text-xs sm:text-sm md:w-1/2"
            variant="outline"
            onClick={handleFollowPage}
          >
            {isFollowing ? (
              <>
                <CloseCircle variant="Bulk" size={16} />
                {t('M108')}
              </>
            ) : (
              <>
                <TickCircle variant="Bold" size={16} />
                {t('M52')}
              </>
            )}
          </Button>
        </div>
      </div>

      <hr />

      {/* <div className="space-y-3 md:flex md:items-start md:justify-between md:space-y-0">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 md:text-2xl lg:text-3xl">
            {data.name}
          </h2>

          <p className="text-sm lg:text-base">
            {t('M143', {
              totalMembers: data.likes.length,
            })}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-3 md:mt-0 md:gap-4">
          {isManager && (
            <Button className="flex items-center gap-2 text-sm md:text-base">
              <Add size={16} />
              <span>{t('M168')}</span>
            </Button>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <MoreCircle
                size={24}
                variant="TwoTone"
                className="cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">{t('M164')}</h4>
                  <p className="text-sm text-muted-foreground">{t('M165')}</p>
                </div>

                <div className="grid gap-2 divide-y">
                  <Button
                    variant="destructive"
                    onClick={
                      isManager
                        ? () => onOpenDialogDeleteGroup({ groupId: data._id })
                        : () => onOpenDialogLeaveGroup({ groupId: data._id })
                    }
                  >
                    {isManager ? t('M166') : t('M167')}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div> */}
    </Card>
  );
}
