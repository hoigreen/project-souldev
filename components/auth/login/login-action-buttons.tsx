'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import GOOGLE_SVG from '@/public/google.svg';
import GITHUB_DARK from '@/public/github-mark-white.svg';
import GITHUB from '@/public/github-mark.svg';
import { signIn } from 'next-auth/react';

export default function LoginActionButtons() {
  const t = useTranslations('Auth');

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="flex items-center justify-center gap-3"
        variant="outline"
        onClick={() => signIn('google')}
      >
        <Image alt="Google" height={20} src={GOOGLE_SVG} width={20} />
        <span>{t('M15')}</span>
      </Button>
      <Button
        className="flex items-center justify-center gap-3"
        variant="outline"
        onClick={() => signIn('github')}
      >
        <Image
          className="dark:hidden"
          alt="Github"
          height={20}
          src={GITHUB}
          width={20}
        />
        <Image
          className="hidden dark:block"
          alt="Github"
          height={20}
          src={GITHUB_DARK}
          width={20}
        />
        <span>{t('M17')}</span>
      </Button>
    </div>
  );
}
