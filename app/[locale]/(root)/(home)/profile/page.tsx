import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import ProfileCard from '@/components/profile/profile-card';
import { countMyPosts } from '@/lib/actions/posts';
import { getUserProfile } from '@/lib/actions/profile';
import { SearchParams } from '@/lib/definitions';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfilePage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: SearchParams;
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const userProfileResponse = await getUserProfile();
  const countPosts = await countMyPosts();

  if (!userProfileResponse)
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;

  if (!countPosts)
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M19')} />

      {/* Profile info */}
      <ProfileCard
        profile={userProfileResponse.data}
        countPosts={countPosts.data}
      />

      {/* Tabs */}
    </div>
  );
}
