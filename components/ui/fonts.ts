import { Roboto, Nunito, Kanit, Lexend } from 'next/font/google';

export const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
});

export const nunito = Nunito({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-serif',
});

export const kanit = Kanit({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-serif',
});

export const lexend = Lexend({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-serif',
});
