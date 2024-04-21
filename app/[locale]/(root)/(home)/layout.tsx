import { Headerbar } from '@/components/app/header-bar';
import { LeftSidebar } from '@/components/app/left-sidebar';
import Container from '@/components/ui/containter';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function HomeLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <div>
      <Headerbar />

      <main className="flex flex-row justify-between">
        <LeftSidebar />1<div className="w-full max-w-4xl">{children}</div>1
        {/* <RightSidebar /> */}
      </main>

      {/* <Footerbar /> */}
    </div>
  );
}
