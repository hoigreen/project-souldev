import { Heading } from '@/components/app/heading';
import Tabs, { ITabs } from '@/components/ui/app/tabs';
import { Add } from 'iconsax-react';
import { Compass, UsersRound } from 'lucide-react';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import React from 'react';

export default async function GroupsLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Home');

  const tabs: ITabs[] = [
    {
      href: '/groups',
      label: t('M123'),
      icon: <Compass size={16} />,
    },
    {
      href: '/groups/my-groups',
      label: t('M125'),
      icon: <UsersRound size={16} />,
    },
    {
      href: '/groups/create',
      label: t('M124'),
      icon: <Add variant="TwoTone" size={16} />,
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M123')} />

      <div className="space-y-4">
        <Tabs tabs={tabs} />

        {children}
      </div>
    </div>
  );
}
