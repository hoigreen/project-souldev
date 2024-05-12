import createIntlMiddleware from 'next-intl/middleware';
import { withAuth } from 'next-auth/middleware';
import { locales } from './navigation';
import { NextRequest, NextResponse } from 'next/server';
import { authPathRegex, publicPathRegex } from './lib/regex';

const nextIntlMiddleware = createIntlMiddleware({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  localeDetection: false,
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
          locales.includes(localeFromPath as any)
        ) {
          locale = localeFromPath;
        }

        if (!token.isOnboardingCompleted) {
          return NextResponse.redirect(
            new URL(`/${locale}/auth/onboarding`, req.url),
          );
        } else {
          if (authPathRegex.test(req.nextUrl.pathname)) {
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
  const isPublic = publicPathRegex.test(req.nextUrl.pathname);
  const isAuth = authPathRegex.test(req.nextUrl.pathname);

  if (isPublic) {
    if (
      req.cookies.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string) &&
      isAuth
    ) {
      return (nextAuthMiddleware() as any)(req);
    }

    // @ts-ignore
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
