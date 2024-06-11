import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import { PageEditor } from '@/components/page/editor/page-editor';
// import { Card } from '@/components/ui/card';
import { getPageDetails } from '@/lib/actions/page';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
// import { Suspense } from 'react';

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

      <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:gap-6">
        <div className="w-full max-w-lg"></div>
        <PageEditor
          className="w-full grow"
          classNames={{
            form: 'z-0 w-full max-w-full grow p-3 md:p-4 xl:static xl:max-w-full',
            preview: 'hidden',
          }}
        />
      </div>
    </div>
  );
}
