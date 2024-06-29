import { BackLink } from '@/components/app/back-link';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import CommentForm from '@/components/post/form/comment-form';
import ListComments from '@/components/post/list-comments';
import PostCard from '@/components/post/post-card';
import { getPostById } from '@/lib/actions/post';
import getSession from '@/lib/get-session';
import { markdownToText } from '@/lib/markdown';
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
        id={post._id}
        group={post.group_id}
        page={post.page_id}
        author={post.user_id}
        created={post.created}
        countComments={comments.length}
        currentUserId={session.user._id}
        classNames={{
          imageContainer: 'h-full md:min-h-[40rem]',
          image: 'object-center',
        }}
        isDisabledComment
        {...post}
      />

      <div className="w-full space-y-6 rounded-xl px-3 py-4 md:p-7 xl:bg-white xl:shadow-lg xl:dark:bg-black">
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
    title: `${markdownToText(response.post_data.content).slice(0, 50)}...`,
  };
}
