import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'vi'] as const;

export const { Link, useRouter, usePathname, redirect } =
  createSharedPathnamesNavigation({ locales });
