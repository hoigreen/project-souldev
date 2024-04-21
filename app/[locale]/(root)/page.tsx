import AboutUs from '@/components/landing/about-us';
import Contact from '@/components/landing/contact';
import Features from '@/components/landing/features';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import { Route } from '@/lib/definitions';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

export default function Page({
  params: { locale },
}: {
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
      <main className="space-y-[8rem] lg:space-y-[9rem] xl:space-y-[10rem] 2xl:space-y-[12rem]">
        <AboutUs />
        <Hero />
        <Features />
        <Contact />
      </main>
      <Footer routes={routes} />
    </>
  );
}
