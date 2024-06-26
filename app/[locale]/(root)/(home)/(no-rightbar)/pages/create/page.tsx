import { Heading } from '@/components/app/heading';
import { PageEditor } from '@/components/page/editor/page-editor';
import { PagePreview } from '@/components/page/editor/page-preview';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Create page',
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
      <Heading title={t('M131')} size={1} />
      <PageEditor preview={<PagePreview />} />
    </div>
  );
}
