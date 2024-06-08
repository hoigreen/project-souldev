import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import CreatePostBox from '@/components/post/create-post-box';
import ListPostsClient from '@/components/post/list-posts-client';
import { getGroupDetails, getPostInGroup } from '@/lib/actions/group';
import { Post } from '@/lib/definitions';
import getSession from '@/lib/get-session';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

type PageProps = {
  params: { locale: string; groupId: string };
};

export default async function Page({ params: { locale, groupId } }: PageProps) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const session = await getSession();

  if (!session) {
    return <ErrorStage stage={ErrorStageType.Unauthorized} />;
  }

  const response = await getPostInGroup({ params: { groupId } });

  if (!response) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const posts: Post[] = response.items;

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M120')} />

      <CreatePostBox user={session.user} groupId={groupId} />

      <Suspense fallback={<div>Loading...</div>}>
        {posts.length === 0 ? (
          <ErrorStage stage={ErrorStageType.ResourceNotFound} />
        ) : (
          <div className="space-y-2">
            <ListPostsClient
              queryFunction={getPostInGroup}
              data={response}
              currentUserId={session.user._id}
            />
          </div>
        )}
      </Suspense>
    </div>
  );
}

export async function generateMetadata({
  params: { groupId },
}: PageProps): Promise<Metadata> {
  const response = await getGroupDetails({ groupId });

  if (!response.success) {
    return {
      title: 'Error',
    };
  }

  return {
    title: response.data.name,
  };
}
