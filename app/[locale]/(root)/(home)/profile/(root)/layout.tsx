import { ReactNode } from 'react';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import ProfileCard from '@/components/profile/profile-card';
import ProfileTabs from '@/components/profile/profile-tabs';
import { countMyPosts } from '@/lib/actions/posts';
import { getUserProfile } from '@/lib/actions/profile';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';

export default async function ProfileLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const countPosts = await countMyPosts();
  const userProfileResponse = await getUserProfile();

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
      <ProfileTabs />

      {children}
    </div>
  );
}
