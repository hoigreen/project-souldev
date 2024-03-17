import ThemeSwitcher from '@/components/switcher/theme-switcher';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col bg-white pb-8 dark:bg-neutral-900">
      <ThemeSwitcher className="fixed right-8 top-2" />
      <div className="flex grow items-start justify-center bg-cover bg-center bg-repeat md:items-center">
        {children}
      </div>
    </main>
  );
}
