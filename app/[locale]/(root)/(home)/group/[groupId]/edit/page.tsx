import { BackLink } from '@/components/app/back-link';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import { GroupEditor } from '@/components/group/editor/group-editor';
import { GroupEditorPreview } from '@/components/group/editor/group-preview';
import { getGroupDetails } from '@/lib/actions/group';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Edit group',
};

export default async function HomePage({
  params: { locale, groupId: groupId },
}: {
  params: { locale: string; groupId: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const response = await getGroupDetails({ groupId });

  if (!response.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <div className="space-y-4">
        <BackLink />
        <Heading title={t('M157')} size={1} />
      </div>

      <GroupEditor
        initialData={response.data}
        preview={<GroupEditorPreview initialData={response.data} />}
      />
    </div>
  );
}
