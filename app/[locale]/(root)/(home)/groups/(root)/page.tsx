import { Heading } from '@/components/app/heading';
import SuggestionGroups from '@/components/groups/suggestion-groups';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Groups',
};

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  return (
    <div className="space-y-3">
      <Heading title={t('M126')} size={1} />

      <Suspense fallback={<div>Loading ...</div>}>
        <SuggestionGroups />
      </Suspense>
    </div>
  );
}
