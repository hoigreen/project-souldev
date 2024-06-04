import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import MySharedPostsClient from '@/components/app/post/my-shared-posts-client';
import { getMySharedPosts } from '@/lib/actions/post';
import getSession from '@/lib/get-session';
import { Metadata } from 'next';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Shared',
};

export default async function SharedPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const session = await getSession();

  const user = session?.user;

  if (!user) return <ErrorStage stage={ErrorStageType.Unauthorized} />;

  const { data, success } = await getMySharedPosts();

  if (!success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  if (data.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  return <MySharedPostsClient data={data} currentUserId={user._id} />;
}
