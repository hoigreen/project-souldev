import { Heading } from '@/components/app/heading';
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

  const user = await getSession();
  if (!user) return null;

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
