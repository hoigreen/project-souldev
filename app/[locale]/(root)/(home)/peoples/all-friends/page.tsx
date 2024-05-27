import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import RemoveFriendButton from '@/components/app/people/actions/remove-friend-button';
import ListPeoples from '@/components/app/people/list-peoples';
import { ListPeoplesLoading } from '@/components/app/people/loading';
import { getMyFriendsList } from '@/lib/actions/profile';
import { FriendActions } from '@/lib/definitions';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'My friends',
};

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const response = await getMyFriendsList();

  if (!response) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const friendsListData = response.listFriend.map((item) => item.user_id);

  return (
    <div className="space-y-4">
      <Heading title={t('M96')} size={1} />
      <Suspense fallback={<ListPeoplesLoading />}>
        <ListPeoples data={friendsListData} action={FriendActions.Remove} />
      </Suspense>
    </div>
  );
}
