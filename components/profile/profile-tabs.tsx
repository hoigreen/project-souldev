'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';

type ProfileTabsProps = React.HTMLAttributes<HTMLDivElement>;

export default function ProfileTabs({ className, ...props }: ProfileTabsProps) {
  const t = useTranslations('Home');
  const pathname = usePathname();

  const tabs = [
    {
      href: '/profile',
      label: t('M27'),
    },
    {
      href: '/profile/shared',
      label: t('M28'),
    },
    {
      href: '/profile/saved',
      label: t('M29'),
    },
  ];

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
            'w-full grow border-b-2 px-5 py-2.75 text-center text-sm transition-colors md:max-w-40 md:grow-0 md:text-base',
            pathname === tab.href
              ? 'border-primary font-bold'
              : 'border-transparent',
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
