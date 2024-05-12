import { Heading } from '@/components/app/heading';
import PostCard from '@/components/app/post/post-card';
import { SearchParams } from '@/lib/definitions';
import getSession from '@/lib/get-session';
import { Metadata } from 'next';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

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

  const session = await getSession();
  if (!session) return null;

  // const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");

  // const result = await fetchPosts(
  //   searchParams.page ? +searchParams.page : 1,
  //   30
  // );

  // const reactionsData = await getReactionsData({
  //   userId: userInfo._id,
  //   posts: result.posts,
  // });

  // const { childrenReactions, childrenReactionState } = reactionsData;

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title="Home" />

      <section className="mt-9 flex flex-col gap-10">
        <PostCard
          reactions={[]}
          id="123"
          currentUserId={session.user?.id}
          parentId={'123'}
          content={
            'Tớ rất thích câu nói: \'Hãy tử tế ngay cả khi bạn không được đối xử tử tế. Dù cả thế giới này muốn bạn thay đổi, mình vẫn mong bạn là chính mình."'
          }
          author={{ id: '123', name: '123', image: '/123.svg' }}
          community={null}
          createdAt={'123'}
          comments={[]}
        />
        {/* {result.posts.length === 0 ? (
          <p className='text-lg font-semibold text-center'>No posts found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
              key={post._id}
              id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )} */}
      </section>
    </div>
  );
}
