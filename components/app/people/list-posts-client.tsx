'use client';

import AvatarUser from '@/components/ui/app/avatar-user';
import Carousel from '@/components/ui/app/carousel';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserBasic } from '@/lib/definitions';
import { cn, getFullName } from '@/lib/utils';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

type RecommendPeoplesProps = React.HTMLAttributes<HTMLDivElement> & {
  data: UserBasic[];
};

export default function RecommendPeoples({
  className,
  data,
}: RecommendPeoplesProps) {
  const t = useTranslations('Home');

  return (
    <Card className={cn('space-y-2', className)}>
      <Carousel
        className="p-4"
        classNames={{
          viewport: 'mx-auto',
          container: 'flex gap-3',
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-[0_0_40%] flex-col items-center gap-8 overflow-hidden rounded-lg border px-2 py-3 sm:flex-[0_0_33%] md:flex-[0_0_30%] lg:flex-[0_0_28%]"
          >
            <AvatarUser
              src={item.image}
              fallback={item.first_name}
              className="size-28"
            />

            <div className="flex flex-col items-center gap-3">
              <p className="text-base font-medium md:text-lg">
                {getFullName(item.first_name, item.last_name)}
              </p>
              <div className="flex gap-2">
                <Button>{t('M53')}</Button>
                <Button variant="outline">{t('M52')}</Button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="flex justify-center border-t">
        <Link href="/peoples" className={buttonVariants({ variant: 'link' })}>
          {t('M50')}
        </Link>
      </div>
    </Card>
  );
}
