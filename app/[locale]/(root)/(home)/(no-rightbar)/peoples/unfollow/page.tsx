import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import ListPeoples from '@/components/peoples/list-peoples';
import { ListPeoplesLoading } from '@/components/peoples/loading';
import { getMyFollowings, getMyFriendsList } from '@/lib/actions/profile';
import { FriendActions } from '@/lib/definitions';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Unfollow list',
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const myFriendsresponse = await getMyFriendsList();
  const myFollowingResponse = await getMyFollowings();

  if (!myFriendsresponse) {
    return (
      <div className="space-y-4">
        <Heading title={t('M24')} size={1} />
        <ErrorStage stage={ErrorStageType.ServerError} />;
      </div>
    );
  }

  if (!myFollowingResponse) {
    return (
      <div className="space-y-4">
        <Heading title={t('M24')} size={1} />
        <ErrorStage stage={ErrorStageType.ServerError} />;
      </div>
    );
  }

  if (!myFriendsresponse.listFriend) {
    return (
      <div className="space-y-4">
        <Heading title={t('M24')} size={1} />
        <ErrorStage stage={ErrorStageType.ServerError} />;
      </div>
    );
  }

  if (!myFollowingResponse.listFollowingUser) {
    return (
      <div className="space-y-4">
        <Heading title={t('M24')} size={1} />
        <ErrorStage stage={ErrorStageType.ServerError} />;
      </div>
    );
  }

  const friends = myFriendsresponse.listFriend.map((item) => item.user_id);
  const followings = myFollowingResponse.listFollowingUser.map(
    (item) => item.user_id,
  );

  const myUnfollows = friends.filter(
    (friend) => !followings.some((follow) => follow._id === friend._id),
  );

  if (myUnfollows.length === 0) {
    return (
      <div className="space-y-4">
        <Heading title={t('M209')} size={1} />
        <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Heading title={t('M209')} size={1} />
      <Suspense fallback={<ListPeoplesLoading />}>
        <ListPeoples data={myUnfollows} action={FriendActions.Follow} />
      </Suspense>
    </div>
  );
}
