'use server';

import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { VerifyBox } from '@/components/auth/verify/verify-box';

export async function generateMetadata() {
  const t = await getTranslations('Auth');

  return {
    title: t('M29'),
  };
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <VerifyBox />;
}
