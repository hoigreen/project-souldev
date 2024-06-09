import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import MyPages from '@/components/pages/my-pages';
import { getPagesLiked } from '@/lib/actions/page';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Liked',
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const response = await getPagesLiked();

  if (!response.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  return (
    <div className="space-y-3">
      <Heading title={t('M134')} size={1} />
      <Suspense fallback={<div>Loading ...</div>}>
        <MyPages pages={response.data} />
      </Suspense>
    </div>
  );
}
