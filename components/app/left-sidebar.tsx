'use client';

import { routesLink } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLAttributes } from 'react';
import { SignOutButton } from '../auth/sign-out/sign-out-button';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: LeftSidebar
 * ------------------------------------------------------------------------------------------------------------------ */

const leftSidebarVariants = cva(
  'dark:bg-dark sticky bottom-0 bottom-0 top-[4.375rem] flex w-80 flex-col justify-between bg-white text-white',
);

export type LeftSidebarProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof leftSidebarVariants>;

export function LeftSidebar({ className, ...props }: LeftSidebarProps) {
  const t = useTranslations('SidebarLink');

  return (
    <aside {...props} className={leftSidebarVariants()}>
      {/* Menu */}
      <div className="pb-4">
        {routesLink.map((link) => (
          <Link
            key={link.label}
            href={link.route}
            className={cn(
              'group group-hover:opacity-80',
              'flex min-h-14 items-center gap-2 px-4 py-1.5 text-xs font-medium transition md:gap-3 md:text-sm lg:gap-4 lg:text-base',
              'rounded-br-lg rounded-tr-lg hover:bg-neutral-200 dark:hover:bg-neutral-200',
              className,
            )}
          >
            <Image
              src={link.image}
              alt={link.label}
              width={32}
              height={32}
              className="hover:opacity-80 max-lg:hidden"
            />
            <span
              className={cn(
                'text-neutral-800 hover:text-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-300',
              )}
            >
              {t(link.label)}
            </span>
          </Link>
        ))}

        <hr className="mx-2 mt-4 bg-neutral-200 dark:bg-neutral-600" />
      </div>

      {/* Action */}
      <div className="px-4 pb-2">
        <SignOutButton />
      </div>
    </aside>
  );
}
