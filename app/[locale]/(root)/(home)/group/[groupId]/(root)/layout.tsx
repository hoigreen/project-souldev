import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import GroupDetailsSection from '@/components/group/group-details-section';
import Tabs, { ITabs } from '@/components/ui/app/tabs';
import { getGroupDetails } from '@/lib/actions/group';
import getSession from '@/lib/get-session';
import { Edit, ProfileTick } from 'iconsax-react';
import { Group, Users } from 'lucide-react';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import React, { Suspense } from 'react';

export default async function Page({
  params: { locale, groupId },
  children,
}: {
  children: React.ReactNode;
  params: { locale: string; groupId: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const response = await getGroupDetails({ groupId });

  const session = await getSession();

  if (!session) {
    return <ErrorStage stage={ErrorStageType.Unauthorized} />;
  }

  if (!response.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const group = response.data;

  const isJoined = group.members.some(
    (member) => member.user_id._id === session.user._id,
  );

  if (!isJoined) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  const isManager = group.managers.some(
    (manager) => manager.user_id === session.user._id,
  );

  let tabs: ITabs[] = [];
  if (isManager) {
    tabs = [
      {
        href: `/group/${groupId}`,
        label: t('M154'),
        icon: <Group size={16} />,
      },
      {
        href: `/group/${groupId}/members`,
        label: t('M155'),
        icon: <Users size={16} />,
      },
      {
        href: `/group/${groupId}/request-join`,
        label: t('M156'),
        icon: <ProfileTick size={16} />,
      },
      {
        href: `/group/${groupId}/edit`,
        label: t('M46'),
        icon: <Edit size={16} />,
      },
    ];
  } else {
    tabs = [
      {
        href: `/group/${groupId}`,
        label: t('M154'),
        icon: <Group size={16} />,
      },
      {
        href: `/group/${groupId}/members`,
        label: t('M155'),
        icon: <Users size={16} />,
      },
    ];
  }

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Suspense fallback={<div>Loading...</div>}>
        <GroupDetailsSection isManager={isManager} data={group} />
      </Suspense>

      <Tabs tabs={tabs} />

      {children}
    </div>
  );
}
