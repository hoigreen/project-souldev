import { Heading } from '@/components/app/heading';
import { SearchBar } from '@/components/search/search-bar';
import { Pagination } from '@/components/ui/app/pagination';
import { SearchParams } from '@/lib/definitions';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';

export default async function Page({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: SearchParams;
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  // const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");

  // const result = await fetchUsers({
  //   userId: user.id,
  //   searchString: searchParams.q,
  //   pageNumber: searchParams?.page ? +searchParams.page : 1,
  //   pageSize: 25,
  // });

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M204')} />

      <SearchBar className="h-18" />

      <div className="space-y-6">
        {/* <div className='mt-14 flex flex-col gap-9'>
            {result.users.length === 0 ? (
              <p className='no-result'>No Result</p>
            ) : (
              <>
                {result.users.map((person) => (
                  <UserCard
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    username={person.username}
                    imgUrl={person.image}
                    personType='User'
                  />
                ))}
              </>
            )}
          </div>
         */}

        <Pagination isNext page={searchParams?.page ? +searchParams.page : 1} />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Search',
};
