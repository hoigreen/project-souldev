import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import { getGroupDetails, getPostInGroup } from '@/lib/actions/group';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Suspense } from 'react';

type PageProps = {
  params: { locale: string; groupId: string };
};

export default async function Page({ params: { locale, groupId } }: PageProps) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const response = await getPostInGroup({ groupId });
  console.log(response);

  if (!response.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  // const group = response.data;

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title="Message" />

      <Suspense fallback={<div>Loading...</div>}></Suspense>
    </div>
  );
}

export async function generateMetadata({
  params: { groupId },
}: PageProps): Promise<Metadata> {
  const response = await getGroupDetails({ groupId });

  if (!response.success) {
    return {
      title: 'Error',
    };
  }

  return {
    title: response.data.name,
  };
}
