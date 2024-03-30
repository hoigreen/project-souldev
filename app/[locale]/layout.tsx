import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/get-message';
import { QueryProvider } from '@/components/ui/app/query-provider';
import { ToasterProvider } from '@/components/providers/toaster-provider';
import getSession from '@/lib/get-session';
import { SessionProvider } from '@/components/providers/session-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';
import React from 'react';

const locales = ['en', 'vi'];

const robotoFont = Roboto({ subsets: ['vietnamese'], weight: '400' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: 'SoulDev',
    template: '%s | SoulDev',
  },
  description: 'Social network for developers - Soulmate of Dev',
} satisfies Metadata;

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const isValidLocale = locales.some((cur) => cur === locale);

  if (!isValidLocale) {
    notFound();
  }

  const session = await getSession();
  const messages = await getMessages(locale);

  return (
    <html
      className={robotoFont.className}
      lang={locale}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
