import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import MyPostsClient from '@/components/app/post/my-posts-client';
import { getMyPosts } from '@/lib/actions/posts';
import getSession from '@/lib/get-session';
import { Metadata } from 'next';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfilePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const session = await getSession();

  const user = session?.user;

  if (!user) return <ErrorStage stage={ErrorStageType.Unauthorized} />;

  const myPostResponse = await getMyPosts();

  if (!myPostResponse)
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;

  return <MyPostsClient data={myPostResponse} currentUserId={user._id} />;
}
