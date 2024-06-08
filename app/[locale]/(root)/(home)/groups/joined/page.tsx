import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import GroupsJoined from '@/components/groups/groups-joined';
import { getGroupsJoined } from '@/lib/actions/group';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Groups joined',
};

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const groupsJoinedResponse = await getGroupsJoined();

  if (!groupsJoinedResponse.success) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  return (
    <div className="space-y-3">
      <Heading title={t('M145')} size={1} />
      <Suspense fallback={<div>Loading ...</div>}>
        <GroupsJoined groups={groupsJoinedResponse.data} />
      </Suspense>
    </div>
  );
}
