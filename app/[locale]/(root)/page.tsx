import AboutUs from '@/components/landing/about-us';
import Features from '@/components/landing/features';
import Hero from '@/components/landing/hero';
import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}): React.JSX.Element {
  unstable_setRequestLocale(locale);

  return (
    <>
      <AboutUs />
      <Hero />
      <Features />
    </>
  );
}
