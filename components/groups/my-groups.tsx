'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import GroupCard from '../group/group-card';
import { Group } from '@/lib/definitions';
import { ErrorStage, ErrorStageType } from '../app/error-stage';
import { useRouter } from '@/navigation';

type MyGroupsProps = React.HTMLAttributes<HTMLDivElement> & {
  groups: Group[];
};

export default function MyGroups({ className, groups }: MyGroupsProps) {
  const t = useTranslations('Home');
  const router = useRouter();

  if (groups.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  return (
    <div className={cn('grid gap-2 xs:grid-cols-2 md:grid-cols-3', className)}>
      {groups.map((item, index) => (
        <GroupCard
          key={index}
          avatar={item.image_group[0] ?? null}
          name={item.name}
          groupId={item._id}
          totalMembers={item.members.length}
          title={t('M148')}
          onClick={() => router.push(`/group/${item._id}`)}
        />
      ))}
    </div>
  );
}
