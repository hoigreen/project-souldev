import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import RecommendPeoples from '@/components/app/people/recomend-peoples';
import CreatePostBox from '@/components/app/post/create-post-box';
import ListPostsClient from '@/components/app/post/list-posts-client';
import { RightSidebar } from '@/components/app/right-sidebar';
import { getPosts } from '@/lib/actions/posts';
import {
  getMyFriendsRequest,
  getRecommendPeoples,
} from '@/lib/actions/profile';
import { Post } from '@/lib/definitions';
import getSession from '@/lib/get-session';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'Feeds',
  description: 'Discover the latest news and stories',
};

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');
  const session = await getSession();

  if (!session) return null;

  const [
    getPostsResponse,
    getRecommendedPeoplesResponse,
    getMyFriendRequestsResponse,
  ] = await Promise.all([
    getPosts(),
    getRecommendPeoples(),
    getMyFriendsRequest(),
  ]);

  if (!getPostsResponse) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  if (!getRecommendedPeoplesResponse) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  if (!getMyFriendRequestsResponse) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const posts: Post[] = getPostsResponse.items;

  if (posts.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  console.log(getMyFriendRequestsResponse);

  return (
    <Fragment>
      <div className="mx-auto w-full max-w-3xl space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
        <Heading title={t('M1')} />

        <CreatePostBox user={session.user} />

        {/* Recommend peoples */}
        <div className="space-y-2">
          <Heading title={t('M51')} size={1} />
          <RecommendPeoples
            data={getRecommendedPeoplesResponse.items}
            myFriendsRequest={getMyFriendRequestsResponse.listFollowerUser}
          />
        </div>

        <ListPostsClient
          data={getPostsResponse}
          currentUserId={session.user._id}
        />
      </div>

      <RightSidebar />
    </Fragment>
  );
}
