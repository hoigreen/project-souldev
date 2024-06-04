import { Heading } from '@/components/app/heading';
import Tabs, { ITabs } from '@/components/ui/app/tabs';
import { Add, Flag, Like1 } from 'iconsax-react';
import { Compass } from 'lucide-react';
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
      href: '/pages',
      label: t('M129'),
      icon: <Compass size={16} />,
    },
    {
      href: '/pages/liked',
      label: t('M134'),
      icon: <Like1 variant="TwoTone" size={16} />,
    },
    {
      href: '/pages/my-pages',
      label: t('M130'),
      icon: <Flag variant="TwoTone" size={16} />,
    },
    {
      href: '/pages/create',
      label: t('M131'),
      icon: <Add variant="TwoTone" size={16} />,
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M131')} />

      <div className="space-y-4">
        <Tabs tabs={tabs} />

        {children}
      </div>
    </div>
  );
}
