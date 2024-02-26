import { unstable_setRequestLocale } from 'next-intl/server';
import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider';

const locales = ['en', 'de'];

const roboto = Roboto({ subsets: ['vietnamese'], weight: '300' })

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'FiSave - Financial Management',
  description: '',
}

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
