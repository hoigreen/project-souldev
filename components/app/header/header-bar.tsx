'use client';

import { Link, usePathname } from '@/navigation';
import Image from 'next/image';
import { HTMLAttributes } from 'react';
import LogoTextSvg from '@/public/logo-text.svg';
import LogoTextDarkSvg from '@/public/logo-text-dark.svg';
import { UserMenu } from './user-menu';
import { NotificationsMenu } from './notifications-menu';
import { MenuMobile } from './menu-mobile';
import { cn } from '@/lib/utils';
import { SearchBar } from '@/components/search/search-bar';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: Headerbar
 * ------------------------------------------------------------------------------------------------------------------ */

export type HeaderbarProps = HTMLAttributes<HTMLElement>;

export function Headerbar({ className, ...props }: HeaderbarProps) {
  const pathname = usePathname();

  return (
    <nav
      {...props}
      className={cn(
        'pointer-events-auto fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b bg-background p-2 md:h-20 md:px-4',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <MenuMobile />
        <Link href="/" title="SoulDev">
          <Image
            src={LogoTextSvg}
            className="dark:hidden max-md:h-10 max-md:w-auto"
            width={200}
            height={40}
            alt="SoulDev"
          />
          <Image
            src={LogoTextDarkSvg}
            className="hidden dark:block max-md:h-10"
            width={200}
            height={40}
            alt="SoulDev"
          />
        </Link>
      </div>

      {!pathname.startsWith('/search') && (
        <SearchBar className="hidden max-w-md grow md:block" />
      )}

      <div className="flex items-center gap-2 md:gap-3">
        <NotificationsMenu />
        <UserMenu />
      </div>
    </nav>
  );
}
