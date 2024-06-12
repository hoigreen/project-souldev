import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import GroupsRequestedToJoin from '@/components/groups/groups-requested-to-join';
import { getGroupsRequestedToJoin } from '@/lib/actions/group';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Request join groups',
};

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const groupRequestedToJoinResponse = await getGroupsRequestedToJoin();

  if (!groupRequestedToJoinResponse.success) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  return (
    <div className="space-y-3">
      <Heading title={t('M128')} size={1} />
      <Suspense fallback={<div>Loading ...</div>}>
        <GroupsRequestedToJoin groups={groupRequestedToJoinResponse.data} />
      </Suspense>
    </div>
  );
}
