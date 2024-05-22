import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import PostCard from '@/components/app/post/post-card';
import { getMySharedPosts } from '@/lib/actions/posts';
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

  return (
    <div className="mx-auto mt-9 flex w-full max-w-3xl flex-col gap-10">
      {data.map((item, index) => (
        <PostCard
          key={index}
          likes={item.likes}
          currentUserId={user._id}
          id={item._id}
          content={item.content}
          author={item.user_id}
          created={item.created}
          images={item.images}
          shares={item.shares}
        />
      ))}
    </div>
  );
}
