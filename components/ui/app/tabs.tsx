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
        'flex items-center justify-center gap-2 border-b',
        className,
      )}
      {...props}
    >
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            'flex w-full grow items-center justify-center gap-2 border-b-2 px-5 py-2.75 text-center text-sm transition-colors md:grow-0 md:text-base',
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
