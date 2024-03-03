import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getMessages } from '@/lib/get-message';
import { NextIntlClientProvider } from 'next-intl';
import { QueryProvider } from '@/components/ui/app/query-provider';
import { ToasterProvider } from '@/components/providers/toaster-provider';

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

  const messages = await getMessages(locale);

  return (
    <html lang={locale} className={nunito.className} suppressHydrationWarning>
      <body className="antialiased">
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
      </body>
    </html>
  );
}
