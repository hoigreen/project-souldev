import { ForgetPasswordBox } from '@/components/auth/forget-password/forget-password-box';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import React from 'react';

export async function generateMetadata() {
  const t = await getTranslations('Auth');

  return {
    title: t('M39'),
  };
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);

  return <ForgetPasswordBox />;
}
