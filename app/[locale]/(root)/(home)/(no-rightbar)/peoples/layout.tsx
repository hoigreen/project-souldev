import { Heading } from '@/components/app/heading';
import Tabs, { ITabs } from '@/components/ui/app/tabs';
import { Profile2User, UserAdd, UserSearch, UserTick } from 'iconsax-react';
import { XSquare } from 'lucide-react';
import { Metadata } from 'next';
import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import React from 'react';

export const metadata: Metadata = {
  title: 'Peoples',
};

export default async function PeoplesLayout({
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
      href: '/peoples',
      label: t('M59'),
      icon: <UserSearch variant="TwoTone" size={16} />,
    },
    {
      href: '/peoples/friends-request',
      label: t('M60'),
      icon: <UserAdd variant="TwoTone" size={16} />,
    },
    {
      href: '/peoples/following',
      label: t('M61'),
      icon: <UserTick variant="TwoTone" size={16} />,
    },
    {
      href: '/peoples/unfollow',
      label: t('M209'),
      icon: <XSquare size={16} />,
    },
    {
      href: '/peoples/all-friends',
      label: t('M62'),
      icon: <Profile2User variant="TwoTone" size={16} />,
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12">
      <Heading title={t('M58')} />

      <div className="space-y-4">
        <Tabs tabs={tabs} />

        {children}
      </div>
    </div>
  );
}
