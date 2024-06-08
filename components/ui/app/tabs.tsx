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
            i === tabs.length - 1 &&
              tabs.length % 2 === 1 &&
              'max-sm:col-span-2',
            pathname === tab.href
              ? 'border-primary font-bold'
              : 'border-transparent',
          )}
        >
          {tab.label}
          {tab.icon && tab.icon}
        </Link>
      ))}
    </div>
  );
}
