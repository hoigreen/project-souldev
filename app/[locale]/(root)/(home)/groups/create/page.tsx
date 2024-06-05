import { Heading } from '@/components/app/heading';
import { GroupEditor } from '@/components/group/editor/group-editor';
import { GroupEditorPreview } from '@/components/group/editor/group-preview';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Create groups',
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
      <Heading title={t('M124')} size={1} />
      <GroupEditor preview={<GroupEditorPreview />} />
    </div>
  );
}
