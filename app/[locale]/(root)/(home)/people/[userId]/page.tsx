import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { getProfileById } from '@/lib/actions/profile';
import { getFullName } from '@/lib/utils';
import { Metadata, ResolvingMetadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';

interface PageProps {
  params: {
    locale: string;
    userId: string;
  };
}

export default async function Page({ params: { locale, userId } }: PageProps) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const response = await getProfileById({ userId });

  if (!response.success) {
    return <ErrorStage stage={ErrorStageType.PageNotFound} />;
  }

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12"></div>
  );
}

export async function generateMetadata(
  { params: { userId } }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const response = await getProfileById({ userId });

  if (!response.success) {
    return {
      title: 'User not found',
    };
  }

  return {
    title: getFullName(
      response.data.user_id.first_name,
      response.data.user_id.last_name,
    ),
  };
}
