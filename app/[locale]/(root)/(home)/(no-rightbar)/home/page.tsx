import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import { RightSidebar } from '@/components/app/right-sidebar';
import RecommendPeoples from '@/components/peoples/recomend-peoples';
import CreatePostBox from '@/components/post/create-post-box';
import ListPostsClient from '@/components/post/list-posts-client';
import { ListPostsClientLoading } from '@/components/post/loading';
import { getPosts } from '@/lib/actions/post';
import { getMyFollowings, getRecommendPeoples } from '@/lib/actions/profile';
import { UserBasic } from '@/lib/definitions';
import getSession from '@/lib/get-session';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Fragment, Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Feeds',
  description: 'Discover the latest news and stories',
};

export default async function HomePage() {
  const t = await getTranslations('Home');
  const session = await getSession();

  if (!session) return null;

  const [
    getPostsResponse,
    getRecommendedPeoplesResponse,
    getMyFollowingsResponse,
  ] = await Promise.all([
    getPosts({}),
    getRecommendPeoples(),
    getMyFollowings(),
  ]);

  if (!getPostsResponse) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  if (!getRecommendedPeoplesResponse) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  if (!getMyFollowingsResponse) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const myFollowings: UserBasic[] = (
    getMyFollowingsResponse.listFollowingUser ?? []
  ).map((item) => item.user_id);

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
            myFollowings={myFollowings}
          />
        </div>

        <Suspense fallback={<ListPostsClientLoading />}>
          <ListPostsClient
            queryFunction={getPosts}
            data={getPostsResponse}
            currentUserId={session.user._id}
          />
        </Suspense>
      </div>

      <RightSidebar />
    </Fragment>
  );
}
