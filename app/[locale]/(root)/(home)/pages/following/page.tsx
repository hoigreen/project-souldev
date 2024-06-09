import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import FollowingPages from '@/components/pages/following-pages';
import MyPages from '@/components/pages/my-pages';
import { getPagesFollowing, getPagesLiked } from '@/lib/actions/page';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Following',
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const response = await getPagesFollowing();

  if (!response.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  return (
    <div className="space-y-3">
      <Heading title={t('M24')} size={1} />
      <Suspense fallback={<div>Loading ...</div>}>
        <FollowingPages pages={response.data} />
      </Suspense>
    </div>
  );
}
