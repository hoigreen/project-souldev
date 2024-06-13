import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Metadata } from 'next';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Messages',
};

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);

  return (
    <div className="hidden h-full grow overflow-hidden rounded-lg bg-white shadow-lg dark:bg-black md:flex md:flex-col">
      <ErrorStage stage={ErrorStageType.ResourceNotFound} />
    </div>
  );
}
