import type { Metadata, Viewport } from 'next';
import './globals.css';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/get-message';
import { QueryProvider } from '@/components/ui/app/query-provider';
import { ToasterProvider } from '@/components/providers/toaster-provider';
import getSession from '@/lib/get-session';
import { SessionProvider } from '@/components/providers/session-provider';
import { ThemeProvider } from '@/components/ui/app/theme-provider';
import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';
import React from 'react';
import { roboto } from '@/components/ui/fonts';

const locales = ['en', 'vi'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL as string),
  title: {
    default: 'SoulDev',
    template: '%s | SoulDev',
  },
  description: 'Social network for developers - Soulmate of Dev',
  openGraph: {
    url: '/',
    title: 'SoulDev',
    type: 'website',
    description: 'Social network for developers - Soulmate of Dev',
    images: [
      {
        url: '/logo.png',
        alt: 'SoulDev',
        width: 600,
        height: 600,
      },
    ],
  },
} satisfies Metadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

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
    <html className={roboto.variable} lang={locale} suppressHydrationWarning>
      <body className="scroll-smooth font-sans antialiased">
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
                    className: '!max-w-lg !p-3 !max-sm:text-xs',
                  },
                  error: {
                    className:
                      '!bg-red-50 !text-red-900 !border !border-red-100 !max-w-lg !p-3 !max-sm:text-xs',
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
