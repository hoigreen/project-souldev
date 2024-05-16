import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
// import { getTranslations } from 'next-intl/server';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: RightSidebar
 * ------------------------------------------------------------------------------------------------------------------ */

const rightSidebarVariants = cva();

export type RightSidebarProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof rightSidebarVariants>;

export async function RightSidebar({ className, ...props }: RightSidebarProps) {
  // const t = await getTranslations('SidebarLink');

  // const user = await currentUser();
  // if (!user) return null;

  // const similarMinds = await fetchUsers({
  //   userId: user.id,
  //   pageSize: 4,
  // });

  // const suggestedCommunities = await fetchCommunities({ pageSize: 4 });

  return (
    <aside
      {...props}
      className={cn(
        'custom-scrollbar fixed bottom-0 right-0 top-[4.375rem] z-20 flex w-80 flex-col justify-between',
        'gap-12 overflow-auto border-l bg-white px-10 pb-6 pt-28 text-white dark:bg-black max-xl:hidden',
        className,
      )}
    >
      <div className="flex grow flex-col justify-start">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 lg:text-lg">
          Suggested Communities
        </h3>

        <div className="mt-7 flex w-[350px] flex-col gap-9">
          {/* {suggestedCommunities.communities.length > 0 ? (
            <>
              {suggestedCommunities.communities.map((community) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType="Community"
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">
              No communities yet
            </p>
          )} */}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 lg:text-lg">
          Similar Minds
        </h3>
        <div className="mt-7 flex w-[350px] flex-col gap-10">
          {/* {similarMinds.users.length > 0 ? (
            <>
              {similarMinds.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType="User"
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">No users yet</p>
          )} */}
        </div>
      </div>
    </aside>
  );
}
