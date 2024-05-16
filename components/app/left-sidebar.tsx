'use client';

import {
  routesLink,
  routesLink2,
  routesLink3,
  routesLink4,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import { SignOutButton } from '../auth/sign-out/sign-out-button';
import { NavItem } from './nav-item';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: LeftSidebar
 * ------------------------------------------------------------------------------------------------------------------ */

export type LeftSidebarProps = HTMLAttributes<HTMLElement>;

export function LeftSidebar({ className, ...props }: LeftSidebarProps) {
  return (
    <aside
      {...props}
      className={cn(
        'custom-scrollbar bg-white dark:bg-black max-xl:hidden',
        'fixed bottom-0 left-0 top-[4.375rem] z-20 flex w-80 flex-col justify-between overflow-auto border-r pb-5 pt-28 text-white',
        className,
      )}
    >
      <div className="grow space-y-6">
        <div className="w-full space-y-2 px-6">
          {routesLink.map((link) => (
            <NavItem key={link.label} link={link} />
          ))}
        </div>

        <hr className="mx-2 mt-4 bg-neutral-200 dark:bg-neutral-600" />

        <div className="px-6">
          {routesLink2.map((link) => (
            <NavItem key={link.label} link={link} />
          ))}
        </div>

        <hr className="mx-2 mt-4 bg-neutral-200 dark:bg-neutral-600" />

        <div className="space-y-2 px-6">
          {routesLink3.map((link) => (
            <NavItem key={link.label} link={link} />
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="mt-10 space-y-2 px-6">
        {routesLink4.map((link) => (
          <NavItem key={link.label} link={link} />
        ))}

        <SignOutButton className="w-full" />
      </div>
    </aside>
  );
}
