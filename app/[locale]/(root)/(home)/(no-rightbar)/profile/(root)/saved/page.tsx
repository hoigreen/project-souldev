import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import MyPostsClient from '@/components/post/my-posts-client';
import { getMySavedPosts } from '@/lib/actions/profile';
import getSession from '@/lib/get-session';
import { Metadata } from 'next';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Saved post',
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const session = await getSession();

  const user = session?.user;

  if (!user) return <ErrorStage stage={ErrorStageType.Unauthorized} />;

  const response = await getMySavedPosts();

  if (!response.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  if (response.data.length === 0) {
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;
  }

  return <MyPostsClient data={response} currentUserId={user._id} />;
}
