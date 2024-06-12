import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import { AboutClient } from '@/components/page/about-client';
import { getPageDetails } from '@/lib/actions/page';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'About',
};

export default async function Page({
  params: { locale, pageId },
}: {
  params: { locale: string; pageId: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const response = await getPageDetails({ pageId });

  if (!response.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M193')} size={1} />

      <AboutClient data={response.data} />
    </div>
  );
}
