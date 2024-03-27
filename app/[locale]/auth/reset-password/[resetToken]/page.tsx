import { ResetPasswordBox } from '@/components/auth/reset-password/reset-password-box';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

export async function generateMetadata() {
  const t = await getTranslations('Auth');

  return {
    title: t('M45'),
  };
}

export default async function Page({
  params: { locale, resetToken },
}: {
  params: { locale: string; resetToken: string };
}) {
  console.log(resetToken);
  unstable_setRequestLocale(locale);

  return <ResetPasswordBox resetToken={resetToken} />;
}
