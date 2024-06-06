import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import GroupsJoined from '@/components/groups/groups-joined';
import GroupsRequestedToJoin from '@/components/groups/groups-requested-to-join';
import MyGroups from '@/components/groups/my-groups';
import {
  getGroupsJoined,
  getGroupsRequestedToJoin,
  getMyGroups,
} from '@/lib/actions/group';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'My groups',
};

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const [myGroupsResponse, groupsJoinedResponse, groupRequestedToJoinResponse] =
    await Promise.all([
      getMyGroups(),
      getGroupsJoined(),
      getGroupsRequestedToJoin(),
    ]);

  if (!myGroupsResponse.success) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  if (!groupsJoinedResponse.success) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  if (!groupRequestedToJoinResponse.success) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  return (
    <>
      <div className="space-y-3">
        <Heading title={t('M125')} size={1} />
        <Suspense fallback={<div>Loading ...</div>}>
          <MyGroups groups={myGroupsResponse.data} />
        </Suspense>
      </div>

      <div className="space-y-3">
        <Heading title={t('M145')} size={1} />
        <Suspense fallback={<div>Loading ...</div>}>
          <GroupsJoined groups={groupsJoinedResponse.data} />
        </Suspense>
      </div>

      <div className="space-y-3">
        <Heading title={t('M128')} size={1} />
        <Suspense fallback={<div>Loading ...</div>}>
          <GroupsRequestedToJoin groups={groupRequestedToJoinResponse.data} />
        </Suspense>
      </div>
    </>
  );
}
