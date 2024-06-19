import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import ListPeoples from '@/components/peoples/list-peoples';
import { ListPeoplesLoading } from '@/components/peoples/loading';
import { SearchBar } from '@/components/search/search-bar';
import { NoSearchStage } from '@/components/search/search-stage';
import { Pagination } from '@/components/ui/app/pagination';
import { searchPeople } from '@/lib/actions/profile';
import { SearchParamKey } from '@/lib/constants';
import { SearchParams, ViewDetailsActionPeoples } from '@/lib/definitions';
import { parseNumberParam, parseStringParam } from '@/lib/parse-search-params';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export default async function Page({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: SearchParams;
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const keyword = parseStringParam(searchParams[SearchParamKey.Keyword]);
  const page = parseNumberParam(searchParams[SearchParamKey.Page]);

  if (!keyword) {
    return (
      <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
        <Heading title={t('M204')} />
        <SearchBar className="h-18" />
        <NoSearchStage />
      </div>
    );
  }

  const response = await searchPeople({
    keyword,
    page,
  });

  if (!response.success) {
    return (
      <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
        <Heading title={t('M204')} />
        <SearchBar className="h-18" />
        <ErrorStage stage={ErrorStageType.ServerError} />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M204')} />

      <SearchBar className="h-18" />

      <hr />
      <div className="flex flex-col items-center space-y-6">
        <Suspense
          fallback={
            <ListPeoplesLoading className="grid w-full max-w-4xl gap-3 md:grid-cols-1 md:gap-4" />
          }
        >
          <ListPeoples
            data={response.items}
            className="grid w-full max-w-4xl gap-3 md:grid-cols-1 md:gap-4"
            viewAction={ViewDetailsActionPeoples.viewDetail}
          />
        </Suspense>
        <Pagination
          isNext={response.page < response.totalPage}
          page={searchParams?.page ? +searchParams.page : 1}
        />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Search',
};
