import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import ListPeoples from '@/components/peoples/list-peoples';
import { ListPeoplesLoading } from '@/components/peoples/loading';
import { getMyFollowings } from '@/lib/actions/profile';
import { FriendActions } from '@/lib/definitions';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Following',
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const response = await getMyFollowings();

  if (!response) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const friendsListData = response.listFollowingUser.map(
    (item) => item.user_id,
  );

  if (friendsListData.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  return (
    <div className="space-y-4">
      <Heading title={t('M24')} size={1} />
      <Suspense fallback={<ListPeoplesLoading />}>
        <ListPeoples data={friendsListData} action={FriendActions.UnFollow} />
      </Suspense>
    </div>
  );
}
