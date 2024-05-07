import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';
import React from 'react';

export default function LandingLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}): React.JSX.Element {
  unstableSetRequestLocale(locale);

  return <>{children}</>;
}
