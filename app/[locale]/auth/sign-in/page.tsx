'use server';

import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { LoginForm } from '@/components/auth/login/login-form';
import Container from '@/components/ui/containter';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import GOOGLE_SVG from '@/public/google.svg';
import GITHUB_DARK from '@/public/github-mark-white.svg';
import GITHUB from '@/public/github-mark.svg';

export async function generateMetadata() {
  const t = await getTranslations('Auth');

  return {
    title: t('M1'),
  };
}

export default async function LoginPage() {
  const t = await getTranslations('Auth');

  return (
    <Container className="flex w-full max-w-lg flex-col gap-3">
      <div className="flex flex-col gap-3 py-3">
        <div className="flex items-center justify-center">
          <Image
            className="dark:hidden"
            width={300}
            height={60}
            src="/logo-large.svg"
            alt="logo"
          />
          <Image
            className="hidden dark:block"
            width={300}
            height={60}
            src="/logo-dark-large.svg"
            alt="logo"
          />
        </div>

        <LoginForm />

        <div className="flex items-center gap-3 p-2">
          <div className="h-[1px] w-full flex-1 border" />
          <span className="text-base font-bold uppercase text-neutral-400">
            {t('M14')}
          </span>
          <div className="h-[1px] w-full flex-1 border" />
        </div>

        <div className="flex flex-col gap-2">
          <Button
            className="flex items-center justify-center gap-3"
            variant="outline"
          >
            <Image alt="Google" height={20} src={GOOGLE_SVG} width={20} />
            <span>{t('M15')}</span>
          </Button>
          <Button
            className="flex items-center justify-center gap-3"
            variant="outline"
          >
            <Image
              className="dark:hidden"
              alt="Google"
              height={20}
              src={GITHUB}
              width={20}
            />
            <Image
              className="hidden dark:block"
              alt="Google"
              height={20}
              src={GITHUB_DARK}
              width={20}
            />
            <span>{t('M17')}</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 rounded border border-border p-3">
        <p className="text-sm font-normal ">{t('M2')}</p>
        <Link
          className="text-sm font-semibold  hover:opacity-70"
          href="/auth/sign-up"
        >
          {t('M3')}
        </Link>
      </div>
    </Container>
  );
}
