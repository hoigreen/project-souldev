import { Heading } from '@/components/app/heading';
import RecommendPeoples from '@/components/app/people/recomend-peoples';
import { SearchParams } from '@/lib/definitions';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Suggestions for you',
};

export default async function HomePage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: SearchParams;
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  return (
    <>
      <div className="space-y-3">
        <Heading title={t('M51')} size={1} />
        <RecommendPeoples data={[]} />
      </div>
    </>
  );
}
