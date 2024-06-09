import { Heading } from '@/components/app/heading';
import SuggestionPages from '@/components/pages/suggestion-pages';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Pages',
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  return (
    <div className="space-y-3">
      <Heading title={t('M132')} size={1} />

      <Suspense fallback={<div>Loading ...</div>}>
        <SuggestionPages />
      </Suspense>
    </div>
  );
}
