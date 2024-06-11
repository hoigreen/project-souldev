import { getGroups } from '@/lib/actions/group';
import { getPages } from '@/lib/actions/page';
import { cn } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { HTMLAttributes } from 'react';
import GroupBox from '../group/group-box';
import PageBox from '../page/page-box';

export type RightSidebarProps = HTMLAttributes<HTMLElement>;

export async function RightSidebar({ className, ...props }: RightSidebarProps) {
  const t = await getTranslations('Home');

  const [groupsResponse, pagesResponse] = await Promise.all([
    getGroups({ size: 5 }),
    getPages({ size: 5 }),
  ]);

  return (
    <aside
      {...props}
      className={cn(
        'no-scrollbar fixed bottom-0 right-0 top-[4.375rem] z-20 flex w-80 flex-col justify-between',
        'gap-6 overflow-auto border-l bg-white px-4 py-8 pt-14 text-white dark:bg-black max-xl:hidden',
        className,
      )}
    >
      <div className="flex grow flex-col justify-start space-y-7">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 lg:text-lg">
          {t('M57')}
        </h3>

        <div className="flex flex-col gap-4">
          {groupsResponse.items.length > 0 ? (
            groupsResponse.items.map((item) => (
              <GroupBox
                key={item._id}
                avatar={item.image_group[0] ?? null}
                groupId={item._id}
                name={item.name}
                totalMembers={item.members.length}
              />
            ))
          ) : (
            <p className="text-sm text-neutral-800 dark:text-neutral-200 md:text-base">
              {t('M198')}
            </p>
          )}
        </div>
      </div>
      <div className="flex grow flex-col justify-start">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 lg:text-lg">
          {t('M56')}
        </h3>
        <div className="mt-7 flex flex-col gap-4">
          {pagesResponse.items.length > 0 ? (
            pagesResponse.items.map((item) => (
              <PageBox
                key={item._id}
                avatar={item.image_page[0] ?? null}
                pageId={item._id}
                name={item.name}
                usersLiked={item.likes.length}
              />
            ))
          ) : (
            <p className="text-sm text-neutral-800 dark:text-neutral-200 md:text-base">
              {t('M199')}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
