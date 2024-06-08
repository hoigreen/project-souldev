'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import { UserBasic } from '@/lib/definitions';
import ListPeoples from '../peoples/list-peoples';
import { acceptRequestToJoinGroup } from '@/lib/actions/group';
import toast from 'react-hot-toast';
import { useRouter } from '@/navigation';

type RequestJoinGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  data: UserBasic[];
  groupId: string;
};

export default function RequestJoinGroup({
  className,
  data,
  groupId,
}: RequestJoinGroupProps) {
  const t = useTranslations('Home');
  const router = useRouter();

  const handleAccept = async (userId: string) => {
    const response = await acceptRequestToJoinGroup(
      { groupId },
      { requestUser_id: userId },
    );

    if (!response.success) {
      toast.error(t('M15'));

      return;
    }

    toast.success(t('M105'));
    router.refresh();
  };

  return (
    <ListPeoples
      className={cn('md:grid-cols-1', className)}
      data={data}
      title={t('M104')}
      handleAction={handleAccept}
    />
  );
}
