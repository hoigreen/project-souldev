import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import { ListPeoplesLoading } from '@/components/app/people/loading';
import RecommendPeoples from '@/components/app/people/recomend-peoples';
import SuggestionPeoples from '@/components/app/people/suggestion-peoples';
import { getRecommendPeoples } from '@/lib/actions/profile';
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

  const response = await getRecommendPeoples();

  if (!response) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }
  return (
    <>
      <div className="space-y-3">
        <Heading title={t('M51')} size={1} />
        <RecommendPeoples data={response.items} />
      </div>

      <div className="space-y-3">
        <Heading title={t('M56')} size={1} />
        <Suspense fallback={<ListPeoplesLoading />}>
          <SuggestionPeoples data={response} />
        </Suspense>
      </div>
    </>
  );
}
