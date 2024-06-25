import UserOnboarding from '@/components/onboarding/user-onboarding';
import { Metadata } from 'next';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Onboarding',
};

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);

  return <UserOnboarding />;
}
