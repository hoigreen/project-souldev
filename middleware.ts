import createIntlMiddleware from 'next-intl/middleware';
import { withAuth } from 'next-auth/middleware';
import { locales } from './navigation';
import { NextRequest, NextResponse } from 'next/server';
import { publicPathRegex } from './lib/regex';

const nextIntlMiddleware = createIntlMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'vi'],

  // Used when no locale matches
  defaultLocale: 'en',
});

const nextAuthMiddleware = () =>
  withAuth(
    (req) => {
      if (req.nextauth.token) {
        let locale = `${req.cookies.get('NEXT_LOCALE')?.value || 'en'}`;
        const localeFromPath = req.nextUrl.pathname.split('/')[1];

        if (
          locale !== localeFromPath &&
          locales.includes(localeFromPath as 'vi' | 'en')
        ) {
          locale = localeFromPath;
          return NextResponse.redirect(new URL(`/${locale}/home`, req.url));
        }
      }

      return nextIntlMiddleware(req);
    },
    {
      callbacks: {
        authorized: ({ token }) => token != null,
      },
      pages: {
        signIn: '/auth/sign-in',
      },
    },
  );

export default function middleware(req: NextRequest) {
  const isPublic = publicPathRegex.test(req.nextUrl.pathname);

  if (isPublic) {
    return nextIntlMiddleware(req);
  } else {
    return (nextAuthMiddleware() as any)(req);
  }
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|ref|.well-known|apple-app-site-association|.*\\..*).*)',
  ],
};
