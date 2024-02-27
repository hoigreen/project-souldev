import { unstable_setRequestLocale as unstableSetRequestLocale } from 'next-intl/server';
import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { notFound } from 'next/navigation';
import { getMessages } from '@/lib/get-message';
import { NextIntlClientProvider } from 'next-intl';
import { QueryProvider } from '@/components/ui/app/query-provider';
import { ToasterProvider } from '@/components/providers/toaster-provider';

const locales = ['en', 'de'];

const roboto = Roboto({ subsets: ['vietnamese'], weight: '300' });

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
    <html lang={locale} className={roboto.className} suppressHydrationWarning>
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
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {children}
        </ThemeProvider> */}
      </body>
      {/* <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <html lang='en'>
          <body className={inter.className}>
            <Topbar />

            <main className='flex flex-row'>
              <LeftSidebar />
              <section className='main-container'>
                <div className='w-full max-w-4xl'>{children}</div>
              </section>
              {/* @ts-ignore */}
      {/* // <RightSidebar />
  //           </main >

  //   <Bottombar />
  //         </body >
  //       </html >
  //     </ClerkProvider > */}
    </html>
  );
}
