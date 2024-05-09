'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { usePathname } from '@/navigation';
import { RoutesLink } from '@/lib/definitions';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: NavItem
 * ------------------------------------------------------------------------------------------------------------------ */

export type NavItemProps = React.HTMLAttributes<HTMLAnchorElement> & {
  link: RoutesLink;
};

export function NavItem({ className, link, ...props }: NavItemProps) {
  const t = useTranslations('SidebarLink');
  const pathname = usePathname();

  const isActive =
    (pathname.includes(link.route) && link.route.length > 1) ||
    pathname === link.route;

  return (
    <Link
      key={link.label}
      href={link.route}
      className={cn(
        'group group-hover:opacity-80',
        'flex min-h-14 items-center gap-2 px-4 py-1.5 text-xs font-medium transition md:gap-3 md:text-sm lg:gap-4 lg:text-base',
        'rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-200',
        'text-neutral-800 hover:text-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-300',
        isActive &&
          'hover:text-dark bg-neutral-900 text-white hover:bg-foreground dark:bg-neutral-200 dark:text-black dark:hover:text-white',
        className,
      )}
      {...props}
    >
      {link.icon}

      {t(link.label)}
    </Link>
  );
}
