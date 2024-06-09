'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import useInfiniteQueryGroups from '@/hooks/use-infinity-query-groups';
import { ErrorStage, ErrorStageType } from '../app/error-stage';
import GroupCard from '../group/group-card';
import { joinGroup } from '@/lib/actions/group';
import toast from 'react-hot-toast';

type SuggestionPagesProps = React.HTMLAttributes<HTMLDivElement>;

export default function SuggestionPages({ className }: SuggestionPagesProps) {
  const t = useTranslations('Home');
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isLoading, refetch } = useInfiniteQueryGroups(
    {},
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const groups = useMemo(
    () => data?.pages.map((page) => page.items).flat() ?? [],
    [data?.pages],
  );

  const sanitizedData = useMemo(() => groups.filter((item) => item), [groups]);

  if (isLoading) return <div>Loading...</div>;

  if (sanitizedData.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  const handleSendRequest = async (groupId: string) => {
    const response = await joinGroup({ groupId });

    if (!response.success) {
      toast.error(t('M15'));

      return;
    }

    toast.success(t('M144'));
    refetch();
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="grid gap-2 xs:grid-cols-2 md:grid-cols-3">
        {sanitizedData.map((item, index) => (
          <GroupCard
            key={index}
            avatar={item.image_group[0] ?? null}
            groupId={item._id}
            name={item.name}
            totalMembers={item.members.length}
            onClick={() => handleSendRequest(item._id)}
          />
        ))}
      </div>

      <div ref={ref} onClick={() => fetchNextPage()} />
    </div>
  );
}
