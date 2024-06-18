'use client';

import { Button } from '@/components/ui/button';
import { useModalActions } from '@/hooks/use-modal';
import { Modals } from '@/lib/constants';
import { UserBasic } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { UserMinus } from 'iconsax-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function RemoveFriendButton({
  user,
  className,
}: {
  user: UserBasic;
  className?: string;
}) {
  const t = useTranslations('Home');
  const { onOpen } = useModalActions(Modals.RemoveFriend);

  return (
    <Button
      className={cn('gap-1', className)}
      onClick={() => onOpen({ user })}
      variant="outline"
    >
      <UserMinus size={16} variant="TwoTone" />
      <span className="max-sm:hidden md:hidden lg:block xl:hidden xl:rounded-xl 2xl:block 2xl:rounded-lg">
        {t('M97')}
      </span>
    </Button>
  );
}
