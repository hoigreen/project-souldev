'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Link, usePathname } from '@/navigation';
import { RoutesLink } from '@/lib/definitions';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: NavItem
 * ------------------------------------------------------------------------------------------------------------------ */

export type NavItemProps = React.HTMLAttributes<HTMLAnchorElement> & {
  link: RoutesLink;
  onItemClicked?: () => void;
};

export function NavItem({
  className,
  link,
  onItemClicked,
  ...props
}: NavItemProps) {
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
        'rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-400',
        'text-neutral-800 hover:text-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-800',
        isActive &&
          'bg-neutral-900 text-white hover:bg-foreground hover:text-white dark:bg-neutral-200 dark:text-black dark:hover:bg-neutral-200',
        className,
      )}
      {...props}
      onClick={onItemClicked && onItemClicked}
    >
      {link.icon}

      {t(link.label)}
    </Link>
  );
}
