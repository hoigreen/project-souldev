'use client';

import AvatarUser from '@/components/ui/app/avatar-user';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useInfiniteQueryPeoples from '@/hooks/use-infinity-query-peoples';
import { ListPeoplesWithPaginationResponse } from '@/lib/definitions';
import { cn, getFullName } from '@/lib/utils';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { ListPeoplesLoading } from './loading';

type SuggestionPeoplesProps = React.HTMLAttributes<HTMLDivElement> & {
  data: ListPeoplesWithPaginationResponse;
};

export default function SuggestionPeoples({
  className,
  data,
}: SuggestionPeoplesProps) {
  const t = useTranslations('Home');
  const { ref, inView } = useInView();

  const {
    data: peoplesResponse,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQueryPeoples({
    initialData: {
      pages: [data],
      pageParams: [1],
    },
  });

  const loadMoreContent = useMemo(() => {
    if (isFetchingNextPage) {
      return <ListPeoplesLoading />;
    }
  }, [isFetchingNextPage]);

  const peoples = useMemo(
    () => peoplesResponse?.pages.map((page) => page.items).flat() ?? [],
    [peoplesResponse?.pages],
  );
  const sanitizedData = useMemo(
    () => peoples.filter((item) => item.user_id),
    [peoples],
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {sanitizedData.map((item, index) => (
          <Card
            key={index}
            className="flex items-center gap-3 rounded-lg border p-3"
          >
            <Link href={`/people/${item.user_id._id}`} className="block">
              <AvatarUser
                src={item.user_id.image}
                fallback={item.user_id.first_name}
                className="size-16"
              />
            </Link>

            <div className="flex grow items-center justify-between gap-2">
              <Link href={`/people/${item.user_id._id}`} className="grow">
                <p className="h-12 text-base font-medium md:text-lg">
                  {getFullName(item.user_id.first_name, item.user_id.last_name)}
                </p>
              </Link>

              <Button className="w-fit">{t('M53')}</Button>
            </div>
          </Card>
        ))}
      </div>

      <div ref={ref} onClick={() => fetchNextPage()}>
        {loadMoreContent}
      </div>
    </div>
  );
}
