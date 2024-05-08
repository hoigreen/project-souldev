'use client';

import { routesLink } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLAttributes } from 'react';
import { SignOutButton } from '../auth/sign-out/sign-out-button';
import { usePathname } from '@/navigation';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: LeftSidebar
 * ------------------------------------------------------------------------------------------------------------------ */

export type LeftSidebarProps = HTMLAttributes<HTMLElement>;

export function LeftSidebar({ className, ...props }: LeftSidebarProps) {
  const t = useTranslations('SidebarLink');
  const pathname = usePathname();

  return (
    <aside
      {...props}
      className={cn(
        'custom-scrollbar dark:bg-dark @apply border-r-dark-4 bg-dark-2 max-xl:hidden',
        'sticky bottom-0 left-0 top-[4.375rem] z-20 flex w-80 flex-col justify-between overflow-auto border-r bg-white pb-5 pt-28 text-white',
        className,
      )}
    >
      {/* Menu */}
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {routesLink.map((link) => {
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
            >
              {link.icon}

              {t(link.label)}
            </Link>
          );
        })}

        <hr className="mx-2 mt-4 bg-neutral-200 dark:bg-neutral-600" />
      </div>

      {/* Action */}
      <div className="mt-10 px-6">
        <SignOutButton className="w-full" />
      </div>
    </aside>
  );
}
