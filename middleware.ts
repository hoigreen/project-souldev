import createIntlMiddleware from 'next-intl/middleware';
import { withAuth } from 'next-auth/middleware';
import { locales } from './navigation';
import { NextRequest, NextResponse } from 'next/server';
import { AUTH_PATH_REGEX, PUBLIC_PATH_REGEX } from './lib/regex';

const nextIntlMiddleware = createIntlMiddleware({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  localeDetection: true,
});

const nextAuthMiddleware = () =>
  withAuth(
    (req) => {
      const token = req.nextauth.token;

      if (token) {
        let locale = `${req.cookies.get('NEXT_LOCALE')?.value || 'en'}`;
        const localeFromPath = req.nextUrl.pathname.split('/')[1];

        if (
          locale !== localeFromPath &&
          locales.includes(localeFromPath as 'en' | 'vi')
        ) {
          locale = localeFromPath;
        }

        if (!token.isOnboardingCompleted) {
          return NextResponse.rewrite(
            new URL(`/${locale}/auth/onboarding`, req.url),
          );
        } else {
          if (AUTH_PATH_REGEX.test(req.nextUrl.pathname)) {
            return NextResponse.redirect(new URL(`/${locale}/home`, req.url));
          }
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
  const isPublic = PUBLIC_PATH_REGEX.test(req.nextUrl.pathname);
  const isAuth = AUTH_PATH_REGEX.test(req.nextUrl.pathname);

  if (isPublic) {
    if (isAuth) {
      if (req.cookies.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string)) {
        return (nextAuthMiddleware() as any)(req);
      }

      // @ts-ignore
      return nextIntlMiddleware(req);
    }

    return (nextAuthMiddleware() as any)(req);
  }

  return (nextAuthMiddleware() as any)(req);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|ref|.well-known|apple-app-site-association|.*\\..*).*)',
  ],
};
