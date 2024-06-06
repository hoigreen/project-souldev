'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import GroupCard from '../group/group-card';
import { Group } from '@/lib/definitions';
import { ErrorStage, ErrorStageType } from '../app/error-stage';

type GroupsRequestedToJoinProps = React.HTMLAttributes<HTMLDivElement> & {
  groups: Group[];
};

export default function GroupsRequestedToJoin({
  className,
  groups,
}: GroupsRequestedToJoinProps) {
  const t = useTranslations('Home');

  if (groups.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  const handleCancelRequest = async (groupId: string) => {
    // const response = await leaveGroup(groupId);
    // if (response.success) {
    //   router.reload();
    // }
  };

  return (
    <div className={cn('grid gap-2 xs:grid-cols-2 md:grid-cols-3', className)}>
      {groups.map((item, index) => (
        <GroupCard
          key={index}
          avatar={item.image_group[0] ?? null}
          name={item.name}
          groupId={item._id}
          totalMembers={item.members.length}
          title={t('M150')}
          onClick={() => handleCancelRequest(item._id)}
        />
      ))}
    </div>
  );
}
