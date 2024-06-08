'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import GroupCard from '../group/group-card';
import { Group } from '@/lib/definitions';
import { ErrorStage, ErrorStageType } from '../app/error-stage';
import { buttonVariants } from '../ui/button';
import { useRouter } from '@/navigation';

type GroupsJoinedProps = React.HTMLAttributes<HTMLDivElement> & {
  groups: Group[];
};

export default function GroupsJoined({ className, groups }: GroupsJoinedProps) {
  const t = useTranslations('Home');
  const router = useRouter();

  if (groups.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  const handleViewGroup = (groupId: string) => router.push(`/group/${groupId}`);

  return (
    <div className={cn('grid gap-2 xs:grid-cols-2 md:grid-cols-3', className)}>
      {groups.map((item, index) => (
        <GroupCard
          key={index}
          avatar={item.image_group[0] ?? null}
          groupId={item._id}
          name={item.name}
          totalMembers={item.members.length}
          title={t('M148')}
          onClick={() => handleViewGroup(item._id)}
        />
      ))}
    </div>
  );
}
