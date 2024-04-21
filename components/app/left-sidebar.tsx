'use client';

import { routesLink } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { usePathname } from '@/navigation';
import { VariantProps, cva } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: LeftSidebar
 * ------------------------------------------------------------------------------------------------------------------ */

const leftSidebarVariants = cva(
  'fixed inset-y-0 w-60 bg-background/50 text-white',
);

export type LeftSidebar = HTMLAttributes<HTMLElement> &
  VariantProps<typeof leftSidebarVariants>;

export function LeftSidebar({ className, ...props }: LeftSidebar) {
  const pathname = usePathname();
  const t = useTranslations('SidebarLink');

  return (
    <aside {...props} className={leftSidebarVariants()}>
      {/* <Logo /> */}

      {/* Menu */}
      <div className="space-y-2">
        {routesLink.map((link) => (
          <Link
            href={link.route}
            className={cn(
              [
                'border-transparent',
                'bg-gray-200 hover:border-l-transparent hover:bg-white/10 hover:text-white',
                'focus:border-l-transparent focus:border-r-primary focus:bg-white/10 focus:text-white',
              ],
              'flex min-h-[70px] items-center gap-2 border-x-4 p-4 px-4 py-1.5 text-xs font-medium transition md:text-sm lg:text-base',
              className,
            )}
          >
            <Image
              src={link.image}
              alt={link.label}
              width={40}
              height={40}
              className="text-light-1 max-lg:hidden"
            />
            <span className={cn('')}>{t(link.label)}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
