import { BackLink } from '@/components/app/back-link';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import CommentForm from '@/components/app/post/form/comment-form';
import ListComments from '@/components/app/post/list-comments';
import PostCard from '@/components/app/post/post-card';
import { getPostById } from '@/lib/actions/posts';
import getSession from '@/lib/get-session';
import { markdownToText } from '@/lib/markdown';
import { getFullName } from '@/lib/utils';
import { Metadata } from 'next';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

interface PageProps {
  params: {
    locale: string;
    postId: string;
  };
}

export default async function Page({ params: { locale, postId } }: PageProps) {
  unstableSetRequestLocale(locale);

  const session = await getSession();

  if (!session) {
    return <ErrorStage stage={ErrorStageType.Unauthorized} />;
  }

  const response = await getPostById({ postId });

  if (!response.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const post = response.post_data;
  const comments = response.comment_data ?? [];

  return (
    <div className="space-y-4 pb-40 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <BackLink />

      <PostCard
        likes={post.likes}
        id={post._id}
        content={post.content}
        author={post.user_id}
        created={post.created}
        countComments={post.commentsCount}
        currentUserId={session.user._id}
        images={post.images}
        shares={post.shares}
        classNames={{
          imageContainer: 'h-full md:min-h-[40rem]',
          image: 'object-center',
        }}
        isDisabledComment
      />

      <div className="w-full space-y-6 rounded-xl bg-white px-3 py-4 shadow-lg dark:bg-black md:p-7">
        <CommentForm user={session.user} postId={post._id} />

        <ListComments comments={comments} />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params: { postId },
}: PageProps): Promise<Metadata> {
  const response = await getPostById({ postId });

  if (!response.success) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: `${getFullName(response.post_data.user_id.first_name, response.post_data.user_id.last_name)} - ${markdownToText(response.post_data.content).slice(0, 50)}...`,
  };
}
