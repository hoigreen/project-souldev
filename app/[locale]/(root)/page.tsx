import AboutUs from '@/components/landing/about-us';
import { unstable_setRequestLocale } from 'next-intl/server';
import React, { Suspense } from 'react';

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}): React.JSX.Element {
  unstable_setRequestLocale(locale);

  return (
    <>
      <AboutUs />
    </>
  );
}
