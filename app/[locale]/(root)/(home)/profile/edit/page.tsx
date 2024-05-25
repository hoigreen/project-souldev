import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
// import { ProfileForm } from '@/components/profile/form';
import { ProfileBasicInfoForm } from '@/components/profile/form/basic-info-form';
import { getUserProfile } from '@/lib/actions/profile';
import { Metadata } from 'next';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';
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

  const profileResponse = await getUserProfile();

  if (!profileResponse.success) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  return (
    <div className="w-full space-y-16">
      <ProfileBasicInfoForm initialData={profileResponse.data.user_id} />

      {/* <ProfileForm initialData={profileResponse.data} /> */}
    </div>
  );
}
