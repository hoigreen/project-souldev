'use client';

import AvatarUser from '@/components/ui/app/avatar-user';
import Carousel from '@/components/ui/app/carousel';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserBasic, UsersResponse } from '@/lib/definitions';
import { cn, getFullName } from '@/lib/utils';
import { Link, usePathname, useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { RecommendPeoplesLoadingSkeleton } from './loading';
import { addFriend, cancelFriendRequest } from '@/lib/actions/profile';
import toast from 'react-hot-toast';

type RecommendPeoplesProps = React.HTMLAttributes<HTMLDivElement> & {
  data: UsersResponse[];
  myFollowings: UserBasic[];
};

export default function RecommendPeoples({
  className,
  data,
  myFollowings,
}: RecommendPeoplesProps) {
  const t = useTranslations('Home');
  const pathname = usePathname();
  const [sanitizedData, setSanitizedData] = React.useState<UsersResponse[]>();
  const router = useRouter();

  useEffect(() => {
    const sanitizedData = (data ?? []).filter((item) => item.user_id);

    setSanitizedData(sanitizedData);
  }, [data]);

  const handleAddFriend = async (toUserId: string) => {
    const response = await addFriend(toUserId);

    if (!response.success) {
      toast.error(t('M15'));

      return;
    }

    toast.success(t('M102'));
    router.refresh();
  };

  const handleCancelRequest = async (requestUserId: string) => {
    const response = await cancelFriendRequest(requestUserId);

    if (!response.success) {
      toast.error(t('M15'));

      return;
    }

    toast.success(t('M103'));
    router.refresh();
  };

  return (
    <Card className={cn('space-y-2', className)}>
      <Carousel
        className="p-4"
        classNames={{
          viewport: 'mx-auto',
          container: 'flex gap-3',
        }}
      >
        {!sanitizedData ? (
          <RecommendPeoplesLoadingSkeleton />
        ) : sanitizedData.length === 0 ? (
          <div className="mx-auto flex min-h-60 items-center text-center">
            <p>{t('M106')}</p>
          </div>
        ) : (
          sanitizedData.map((item, index) => (
            <div
              key={index}
              className="flex max-w-52 flex-[0_0_54%] select-none flex-col items-center gap-8 overflow-hidden rounded-lg border px-2 py-3 sm:flex-[0_0_33%] md:flex-[0_0_30%] lg:flex-[0_0_25%]"
            >
              <Link href={`/people/${item.user_id._id}`} className="block">
                <AvatarUser
                  src={item.user_id.image}
                  fallback={item.user_id.first_name}
                  className="size-20 sm:size-28"
                />
              </Link>

              <div className="flex w-full flex-col items-center gap-3">
                <Link href={`/people/${item.user_id._id}`} className="block">
                  <p className="h-12 text-center text-sm font-medium sm:text-base md:text-lg">
                    {getFullName(
                      item.user_id.first_name,
                      item.user_id.last_name,
                    )}
                  </p>
                </Link>

                {myFollowings.find((user) => user._id === item.user_id._id) ? (
                  <Button
                    className="w-full text-xs sm:text-base"
                    variant="outline"
                    onClick={() => handleCancelRequest(item.user_id._id)}
                  >
                    {t('M101')}
                  </Button>
                ) : (
                  <Button
                    className="w-full text-xs sm:text-base"
                    onClick={() => handleAddFriend(item.user_id._id)}
                  >
                    {t('M53')}
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </Carousel>

      {pathname !== '/peoples' && (
        <div className="flex justify-center border-t">
          <Link href="/peoples" className={buttonVariants({ variant: 'link' })}>
            {t('M50')}
          </Link>
        </div>
      )}
    </Card>
  );
}
