import Dialogs from '@/components/app/dialogs';
import { Headerbar } from '@/components/app/header/header-bar';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';
import { Fragment, ReactNode } from 'react';

export default function HomeLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);

  return (
    <Fragment>
      <main className="min-h-[calc(100vh-4.125rem)] bg-white dark:bg-black xl:bg-neutral-100 xl:dark:bg-neutral-900">
        <Headerbar />

        {children}
      </main>

      <Dialogs />
    </Fragment>
  );
}
