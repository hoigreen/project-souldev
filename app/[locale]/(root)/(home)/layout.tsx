import Dialogs from '@/components/app/dialogs';
import { Headerbar } from '@/components/app/header/header-bar';
import { LeftSidebar } from '@/components/app/left-sidebar';
import { RightSidebar } from '@/components/app/right-sidebar';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Fragment } from 'react';

export default function HomeLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <Fragment>
      <main className="bg-gray-50">
        <Headerbar />

        <div className="flex min-h-[calc(100vh-4.125rem)]">
          <LeftSidebar />

          <div className="mx-auto w-full max-w-4xl flex-1">{children}</div>

          <RightSidebar />
        </div>
      </main>

      <Dialogs />
    </Fragment>
  );
}
