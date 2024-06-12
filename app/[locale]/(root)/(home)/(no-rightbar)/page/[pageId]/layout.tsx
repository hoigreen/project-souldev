import React, { Suspense } from 'react';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import Tabs, { ITabs } from '@/components/ui/app/tabs';
import { getPageDetails } from '@/lib/actions/page';
import getSession from '@/lib/get-session';
import { redirect } from '@/navigation';
import { Group, Users } from 'lucide-react';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { InfoCircle } from 'iconsax-react';
import PageDetailsSection from '@/components/page/page-details-section';

export default async function PageDetailsLayout({
  children,
  params: { locale, pageId },
}: {
  children: React.ReactNode;
  params: { locale: string; pageId: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const session = await getSession();

  if (!session) {
    return redirect('/auth/sign-out');
  }

  const response = await getPageDetails({ pageId });

  if (!response.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const tabs: ITabs[] = [
    {
      href: `/page/${pageId}`,
      label: t('M154'),
      icon: <Group size={16} />,
    },
    {
      href: `/page/${pageId}/about`,
      label: t('M193'),
      icon: <InfoCircle size={16} />,
    },
    {
      href: `/page/${pageId}/peoples`,
      label: t('M155'),
      icon: <Users size={16} />,
    },
  ];

  const data = response.data;

  const isLiked = data.likes.some(
    (item) => item.user_id._id === session.user._id,
  );
  const isFollowing = data.followers.some(
    (item) => item.user_id._id === session.user._id,
  );

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Suspense fallback={<div>Loading...</div>}>
        <PageDetailsSection
          data={data}
          isLiked={isLiked}
          isFollowing={isFollowing}
        />
      </Suspense>

      <Tabs tabs={tabs} />

      {children}
    </div>
  );
}
