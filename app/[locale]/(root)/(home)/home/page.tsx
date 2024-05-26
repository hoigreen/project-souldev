import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import RecommendPeoples from '@/components/app/people/recomend-peoples';
import CreatePostBox from '@/components/app/post/create-post-box';
import ListPostsClient from '@/components/app/post/list-posts-client';
import { RightSidebar } from '@/components/app/right-sidebar';
import { getPosts } from '@/lib/actions/posts';
import { Post, SearchParams } from '@/lib/definitions';
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
  searchParams,
}: {
  params: { locale: string };
  searchParams: SearchParams;
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');
  const session = await getSession();

  if (!session) return null;

  const result = await getPosts();

  if (!result) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const posts: Post[] = result.items;

  if (posts.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  return (
    <Fragment>
      <div className="mx-auto w-full max-w-3xl space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
        <Heading title={t('M1')} />

        <CreatePostBox user={session.user} />

        {/* Recommend peoples */}
        <div className="space-y-2">
          <Heading title={t('M51')} size={1} />
          <RecommendPeoples
            data={[posts[0].user_id, posts[1].user_id, posts[2].user_id]}
          />
        </div>

        <ListPostsClient
          searchParams={searchParams}
          data={result}
          currentUserId={session.user._id}
        />
      </div>

      <RightSidebar />
    </Fragment>
  );
}
