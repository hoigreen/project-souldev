import { locales } from '@/navigation';
import { pathToRegexp } from 'path-to-regexp';

export const regexPattern = (pages: string[]) =>
  RegExp(
    `^(/(${locales.join('|')}))?(${pages
      .map(
        (page) => pathToRegexp(page, [], { start: false, end: false }).source,
      )
      .join('|')})?/?$`,
    'i',
  );

export const publicPathRegex = regexPattern(['/', '/auth/:path*']);

export const authPathRegex = regexPattern(['/auth/sign-in']);

export const NAME_REGEX = /^[\p{L}\s]+$/u;
