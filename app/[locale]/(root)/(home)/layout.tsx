import Dialogs from '@/components/app/dialogs';
import { Headerbar } from '@/components/app/header/header-bar';
import { LeftSidebar } from '@/components/app/left-sidebar';
import { RightSidebar } from '@/components/app/right-sidebar';
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
      <main className="min-h-[calc(100vh-4.125rem)] bg-gray-100 dark:bg-neutral-900">
        <Headerbar />

        <LeftSidebar />
        <div className="xl:px-80">
          <div className="mx-auto min-h-[calc(100vh-4.125rem)] w-full max-w-3xl flex-1 p-2 px-4 md:px-0 md:py-4">
            {children}
          </div>
        </div>
        <RightSidebar />
      </main>

      <Dialogs />
    </Fragment>
  );
}
