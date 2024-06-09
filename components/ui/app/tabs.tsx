'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/navigation';

export type ITabs = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  tabs: ITabs[];
};

export default function Tabs({ className, tabs, ...props }: TabsProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'grid place-items-center gap-2 border-b sm:flex sm:items-center sm:justify-center',
        tabs.length === 1 && 'max-sm:flex',
        tabs.length >= 2 && 'max-sm:grid-cols-2',
        'max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:z-10 max-sm:flex max-sm:gap-0 max-sm:border-t max-sm:bg-white max-sm:pt-2 max-sm:shadow-sm max-sm:dark:bg-black',
        className,
      )}
      {...props}
    >
      {tabs.map((tab, i) => (
        <Link
          prefetch
          key={tab.href}
          href={tab.href}
          className={cn(
            'flex w-full grow items-center justify-center gap-2 border-b-2 px-2 py-1 text-center text-sm transition-colors md:grow-0 md:gap-2 md:px-5 md:py-2.75 md:text-base',
            'max-sm:flex-col-reverse',
            i === tabs.length - 1 &&
              tabs.length % 2 === 1 &&
              'max-sm:col-span-2',
            pathname === tab.href
              ? 'border-primary font-bold'
              : 'border-transparent',
          )}
        >
          <span className="max-sm:text-sm max-xs:text-[8px]">{tab.label}</span>
          {tab.icon && tab.icon}
        </Link>
      ))}
    </div>
  );
}
