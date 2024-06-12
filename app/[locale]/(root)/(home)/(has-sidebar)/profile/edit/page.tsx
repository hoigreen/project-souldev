import { BackLink } from '@/components/app/back-link';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import { ProfileAdvanceInfoForm } from '@/components/profile/form/advance-info-form';
import { ProfileBasicInfoForm } from '@/components/profile/form/basic-info-form';
import { getUserProfile } from '@/lib/actions/profile';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import React from 'react';

export const metadata: Metadata = {
  title: 'Edit profile',
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<React.JSX.Element> {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const profileResponse = await getUserProfile();

  if (!profileResponse.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  return (
    <div className="w-full space-y-8">
      <BackLink />

      <div className="flex justify-center">
        <Heading title={t('M20')} />
      </div>

      <ProfileBasicInfoForm initialData={profileResponse.data.user_id} />

      <ProfileAdvanceInfoForm initialData={profileResponse.data} />
    </div>
  );
}
