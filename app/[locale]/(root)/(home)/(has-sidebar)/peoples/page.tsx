import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import { ListPeoplesLoading } from '@/components/peoples/loading';
import RecommendPeoples from '@/components/peoples/recomend-peoples';
import SuggestionPeoples from '@/components/peoples/suggestion-peoples';
import { getMyFollowings, getRecommendPeoples } from '@/lib/actions/profile';
import { UserBasic } from '@/lib/definitions';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Suggestions for you',
};

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const [getRecommendedPeoplesResponse, getMyFollowingsResponse] =
    await Promise.all([getRecommendPeoples(), getMyFollowings()]);

  if (!getRecommendedPeoplesResponse) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  if (!getMyFollowingsResponse) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const myFollowings: UserBasic[] =
    getMyFollowingsResponse.listFollowingUser.map((item) => item.user_id);

  return (
    <>
      <div className="space-y-3">
        <Heading title={t('M51')} size={1} />
        <RecommendPeoples
          data={getRecommendedPeoplesResponse.items}
          myFollowings={myFollowings}
        />
      </div>

      <div className="space-y-3">
        <Heading title={t('M56')} size={1} />
        <Suspense fallback={<ListPeoplesLoading />}>
          <SuggestionPeoples myFollowings={myFollowings} />
        </Suspense>
      </div>
    </>
  );
}
