import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/get-message';
import { QueryProvider } from '@/components/ui/app/query-provider';
import { ToasterProvider } from '@/components/providers/toaster-provider';
import getSession from '@/lib/get-session';
import { SessionProvider } from '@/components/providers/session-provider';
import { getCurrentUser } from '@/lib/actions';

const locales = ['en', 'de'];

const nunito = Nunito({ subsets: ['vietnamese'], weight: '400' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'SoulDev',
  description: '',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const isValidLocale = locales.some((cur) => cur === locale);

  if (!isValidLocale) {
    notFound();
  }

  const session = await getSession();
  const messages = await getMessages(locale);

  // console.log(session)

  return (
    <html className={nunito.className} lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <SessionProvider session={session}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <QueryProvider>{children}</QueryProvider>

            <ToasterProvider
              toastOptions={{
                success: {
                  className: '!max-w-lg',
                },
                error: {
                  className:
                    '!bg-red-50 !text-red-900 !border !border-red-100 !max-w-lg',
                },
              }}
            />
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
