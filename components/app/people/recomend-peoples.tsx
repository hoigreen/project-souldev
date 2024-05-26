'use client';

import AvatarUser from '@/components/ui/app/avatar-user';
import Carousel from '@/components/ui/app/carousel';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserBasic } from '@/lib/definitions';
import { cn, getFullName } from '@/lib/utils';
import { Link, usePathname } from '@/navigation';
import { useTranslations } from 'next-intl';
import path from 'path';
import React from 'react';

type RecommendPeoplesProps = React.HTMLAttributes<HTMLDivElement> & {
  data: UserBasic[];
};

export default function RecommendPeoples({
  className,
  data,
}: RecommendPeoplesProps) {
  const t = useTranslations('Home');
  const pathname = usePathname();

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
            className="flex flex-[0_0_40%] flex-col items-center gap-8 overflow-hidden rounded-lg border px-2 py-3 sm:flex-[0_0_33%] md:flex-[0_0_30%] lg:flex-[0_0_25%]"
          >
            <AvatarUser
              src={item.image}
              fallback={item.first_name}
              className="size-28"
            />

            <div className="flex w-full flex-col items-center gap-3">
              <p className="h-12 text-center text-base font-medium md:text-lg">
                {getFullName(item.first_name, item.last_name)}
              </p>

              <Button className="w-full">{t('M53')}</Button>
            </div>
          </div>
        ))}
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
