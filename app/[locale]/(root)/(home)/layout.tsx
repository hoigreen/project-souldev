import Dialogs from '@/components/app/dialogs';
import { Headerbar } from '@/components/app/header/header-bar';
import { LeftSidebar } from '@/components/app/left-sidebar';
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

        <LeftSidebar className="pt-14 md:pt-20" />

        <div className="py-14 md:py-20 xl:px-80">
          <div className="mx-auto min-h-[calc(100vh-4.125rem)] w-full max-w-6xl flex-1 p-2 px-4 pb-10 md:p-4 lg:px-0 xl:pl-10">
            {children}
          </div>
        </div>
      </main>

      <Dialogs />
    </Fragment>
  );
}
