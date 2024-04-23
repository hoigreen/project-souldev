import { Headerbar } from '@/components/app/header-bar';
import { LeftSidebar } from '@/components/app/left-sidebar';
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
    <div className="min-h-screen bg-gray-50">
      <Headerbar />

      <LeftSidebar />

      <main className="flex items-center justify-center">
        <div className="w-full max-w-4xl">{children}</div>
      </main>
      {/* <RightSidebar /> */}

      {/* <Footerbar /> */}
    </div>
  );
}
