'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import SettingsItem from './setting-item';
import { ThemeSwitcherRadio } from '@/components/switcher/theme-switcher';
import { useTranslations } from 'next-intl';
import { LocaleSwitcherRadioGroup } from '@/components/switcher/locale-switcher';
import { Link } from '@/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { Modals } from '@/lib/constants';
import { useModalActions } from '@/hooks/use-modal';

type SettingsBoxProps = React.HTMLAttributes<HTMLDivElement>;

export default function SettingsBox({ className, ...props }: SettingsBoxProps) {
  const t = useTranslations('Home');
  const { onOpen } = useModalActions(Modals.ChangePassword);

  return (
    <div
      className={cn('space-y-6 py-4 lg:space-y-8 lg:pb-10 lg:pt-6', className)}
      {...props}
    >
      <SettingsItem title={t('M137')}>
        <ThemeSwitcherRadio />
      </SettingsItem>

      <SettingsItem title={t('M138')}>
        <LocaleSwitcherRadioGroup />
      </SettingsItem>

      <hr />

      <SettingsItem title={t('M141')}>
        <Button variant="ghost" className="px-0" onClick={onOpen}>
          {t('M142')}
        </Button>
      </SettingsItem>

      <hr />

      <SettingsItem title={t('M139')}>
        <Link
          href={`${process.env.NEXT_PUBLIC_URL}/terms`}
          className={cn(
            buttonVariants({ variant: 'link' }),
            'px-0 text-blue-400',
          )}
          target="_blank"
        >
          {t('M140')}
        </Link>
      </SettingsItem>
    </div>
  );
}
