import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import ListPeoples from '@/components/app/people/list-peoples';
import { ListPeoplesLoading } from '@/components/app/people/loading';
import { getMyFriendsList, getMyFriendsRequest } from '@/lib/actions/profile';
import { FriendActions } from '@/lib/definitions';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Friend Requests',
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const response = await getMyFriendsRequest();

  if (!response) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const friendRequestsListData = response.listFriendRequest.map(
    (item) => item.user_id,
  );

  if (friendRequestsListData.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  return (
    <div className="space-y-4">
      <Heading title={t('M96')} size={1} />
      <Suspense fallback={<ListPeoplesLoading />}>
        <ListPeoples
          data={friendRequestsListData}
          action={FriendActions.Accept}
        />
      </Suspense>
    </div>
  );
}
