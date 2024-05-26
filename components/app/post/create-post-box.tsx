'use client';

import React from 'react';
import { User } from 'next-auth';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModalActions } from '@/hooks/use-modal';
import { Modals } from '@/lib/constants';
import AvatarUser from '@/components/ui/app/avatar-user';

type CreatePostBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  user: User;
};

export default function CreatePostBox({
  user,
}: CreatePostBoxProps): React.JSX.Element {
  const t = useTranslations('Home');
  const { onOpen } = useModalActions(Modals.CreatePost);

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-4 shadow-lg dark:bg-black">
      <AvatarUser
        src={user.image}
        alt="Profile"
        fallback={user.first_name}
        className="size-14 border"
      />

      <div className="flex grow items-center gap-2" onClick={() => onOpen()}>
        <Input
          type="text"
          placeholder={t('M10')}
          className="h-14 grow border-none"
        />

        <Button className="hidden h-14 rounded-full md:block" size="lg">
          {t('M11')}
        </Button>
      </div>
    </div>
  );
}
