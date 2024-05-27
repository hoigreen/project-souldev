import { ReactNode, Suspense } from 'react';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import ProfileCard from '@/components/profile/profile-card';
import { countMyPosts } from '@/lib/actions/posts';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { ProfileCardLoadingSkeleton } from '@/components/app/post/loading';
import Tabs, { ITabs } from '@/components/ui/app/tabs';
import { getUserProfile } from '@/lib/actions/profile';

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

  if (!userProfileResponse.success)
    return <ErrorStage stage={ErrorStageType.ServerError} />;

  if (!countPosts)
    return <ErrorStage stage={ErrorStageType.ResourceNotFound} />;

  const tabs: ITabs[] = [
    {
      href: '/profile',
      label: t('M27'),
    },
    {
      href: '/profile/shared',
      label: t('M28'),
    },
    {
      href: '/profile/saved',
      label: t('M29'),
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M19')} />

      {/* Profile info */}
      <Suspense fallback={<ProfileCardLoadingSkeleton />}>
        <ProfileCard
          profile={userProfileResponse.data}
          countPosts={countPosts.data}
        />
      </Suspense>

      {/* Tabs */}
      <Tabs tabs={tabs} />

      {children}
    </div>
  );
}
