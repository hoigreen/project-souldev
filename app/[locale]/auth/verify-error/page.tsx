'use server';

import { VerifyBoxError } from '@/components/auth/verify/verify-box-error';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('Auth');

  return {
    title: t('M36'),
  };
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);

  return <VerifyBoxError />;
}
