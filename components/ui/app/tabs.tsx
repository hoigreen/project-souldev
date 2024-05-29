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
        'flex items-center justify-center border-b md:gap-2',
        className,
      )}
      {...props}
    >
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            'flex w-full grow items-center justify-center gap-1 border-b-2 p-1 text-center text-[10px] transition-colors sm:px-2 sm:py-1 sm:text-sm md:grow-0 md:gap-2 md:px-5 md:py-2.75 md:text-base',
            pathname === tab.href
              ? 'border-primary font-bold'
              : 'border-transparent',
          )}
        >
          {tab.label}
          <span className="max-sm:hidden"> {tab.icon && tab.icon}</span>
        </Link>
      ))}
    </div>
  );
}
