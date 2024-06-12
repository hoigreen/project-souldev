import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import CreatePostBox from '@/components/post/create-post-box';
import ListPostsClient from '@/components/post/list-posts-client';
import { getPageDetails, getPostsOfPage } from '@/lib/actions/page';
import { Post } from '@/lib/definitions';
import getSession from '@/lib/get-session';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type PageProps = {
  params: { locale: string; pageId: string };
};

export default async function Page({ params: { locale, pageId } }: PageProps) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const session = await getSession();

  if (!session) {
    return redirect('/auth/sign-out');
  }

  if (!pageId) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  const [pageDetailResponse, postsResponse] = await Promise.all([
    getPageDetails({ pageId }),
    getPostsOfPage({ params: { pageId } }),
  ]);

  if (!postsResponse) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }
  const isManager = pageDetailResponse.data.creator_id === session.user._id;

  const posts: Post[] = postsResponse.items.map((item) => item);

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M120')} />

      {isManager && <CreatePostBox user={session.user} pageId={pageId} />}

      <Suspense fallback={<div>Loading...</div>}>
        {posts.length === 0 ? (
          <ErrorStage stage={ErrorStageType.ResourceNotFound} />
        ) : (
          <div className="space-y-2">
            <ListPostsClient
              params={{ pageId }}
              queryFunction={getPostsOfPage}
              data={postsResponse}
              currentUserId={session.user._id}
            />
          </div>
        )}
      </Suspense>
    </div>
  );
}

export async function generateMetadata({
  params: { pageId },
}: PageProps): Promise<Metadata> {
  const response = await getPageDetails({ pageId });

  if (!response.success) {
    return {
      title: 'Error',
    };
  }

  return {
    title: response.data.name,
  };
}
