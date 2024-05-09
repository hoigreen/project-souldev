import ThemeSwitcher from '@/components/switcher/theme-switcher';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';
import React from 'react';

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col gap-10 bg-white pb-8 dark:bg-neutral-900">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[24%] max-h-[510px] w-full bg-banner bg-contain bg-center bg-repeat-x dark:bg-banner-dark max-sm:hidden" />
      <ThemeSwitcher className="fixed right-8 top-2 z-50" />
      <div className="z-10 flex grow items-start justify-center pt-60 max-sm:pt-0 md:items-center">
        {children}
      </div>
    </main>
  );
}
