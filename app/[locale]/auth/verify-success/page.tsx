'use server';

import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { VerifyBoxSuccess } from '@/components/auth/verify/verify-box-success';

export async function generateMetadata() {
  const t = await getTranslations('Auth');

  return {
    title: t('M35'),
  };
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <VerifyBoxSuccess />;
}
