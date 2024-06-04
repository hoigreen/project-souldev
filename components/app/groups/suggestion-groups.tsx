'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link, useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { ErrorStage, ErrorStageType } from '../error-stage';
import useInfiniteQueryGroups from '@/hooks/use-infinity-query-groups';
import Image from 'next/image';
import { User } from 'iconsax-react';
import { Button } from '@/components/ui/button';

type SuggestionPeoplesProps = React.HTMLAttributes<HTMLDivElement>;

export default function SuggestionGroups({
  className,
}: SuggestionPeoplesProps) {
  const t = useTranslations('Home');
  const { ref, inView } = useInView();
  const router = useRouter();

  const { data, fetchNextPage, isLoading } = useInfiniteQueryGroups({});

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const groups = useMemo(
    () => data?.pages.map((page) => page.data).flat() ?? [],
    [data?.pages],
  );
  const sanitizedData = useMemo(() => groups.filter((item) => item), [groups]);

  if (sanitizedData.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  // const handleSendRequest = async (groupId: string) => {
  //   const response = await sendRequest(groupId);

  //   if (response) {
  //     toast.success(t('M100'));
  //   } else {
  //     toast.error(t('M99'));
  //   }
  // }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {sanitizedData.map((item, index) => (
          <Card
            key={index}
            className="space-y-6 rounded-lg border p-3 shadow-md"
          >
            <Link href={`/group/${item._id}`} className="block space-y-3">
              <div className="aspect-video size-full object-fill">
                {item.image_group[0] ? (
                  <Image
                    src={item.image_group[0]}
                    alt={item.name}
                    fill
                    className="rounded-lg"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center rounded-lg bg-gray-200">
                    <User
                      size={24}
                      variant="TwoTone"
                      className="text-background"
                    />
                  </div>
                )}
              </div>

              <p className="h-12 truncate text-sm font-medium sm:text-base md:text-lg">
                {item.name}
              </p>
            </Link>

            <Button
              className="w-fit text-xs sm:text-sm"
              // onClick={() => handleCancelRequest(item.user_id._id)}
            >
              {t('M127')}
            </Button>
          </Card>
        ))}
      </div>

      <div ref={ref} onClick={() => fetchNextPage()} />
    </div>
  );
}
