import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import { Route } from '@/lib/definitions';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

export default function LandingLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}): React.JSX.Element {
  unstable_setRequestLocale(locale);

  const t = useTranslations('Landing');

  const routes: Route[] = [
    {
      name: t('M3'),
      path: '/',
    },
    {
      name: t('M4'),
      path: '/#features',
    },
    {
      name: t('M5'),
      path: `/#contact-us`,
    },
    {
      name: t('M6'),
      path: `/terms`,
    },
  ];

  return (
    <>
      <Header routes={routes} />
      <main className="space-y-[8rem] pb-[8rem] lg:space-y-[9rem] lg:pb-[9rem] xl:space-y-[10rem] xl:pb-[10rem] 2xl:space-y-[12rem] 2xl:pb-[12rem]">
        {children}
      </main>
      <Footer routes={routes} />
    </>
  );
}
