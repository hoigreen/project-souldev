import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import { Route } from '@/lib/definitions';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

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
      path: '/#about-us',
    },
    {
      name: t('M5'),
      path: `/#contact-us`,
    },
    {
      name: t('M6'),
      path: `/  terms`,
    },
  ];

  return (
    <>
      <Header routes={routes} />
      <main>
        <Suspense fallback={<div className="h-dvh" />}></Suspense>
      </main>
      <Footer />
    </>
  );
}
