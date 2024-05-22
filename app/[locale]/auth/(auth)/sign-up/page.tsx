'use server';

import {
  getTranslations,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server';
import { Link } from '@/navigation';
import Container from '@/components/ui/containter';
import Image from 'next/image';
import { SignUpForm } from '@/components/auth/sign-up/sign-up-form';
import { BackLink } from '@/components/app/back-link';

export async function generateMetadata() {
  const t = await getTranslations('Auth');

  return {
    title: t('M3'),
  };
}

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstableSetRequestLocale(locale);
  const t = await getTranslations('Auth');

  return (
    <Container className="flex w-full max-w-lg flex-col gap-3 md:gap-6">
      <div className="flex flex-col gap-3 rounded py-3 md:border md:bg-background md:px-5 md:py-3">
        <BackLink href="/" label={t('M55')} />
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

        <label className="mx-auto text-xl font-bold">{t('M19')}</label>

        <SignUpForm />
      </div>

      <div className="flex items-center justify-center gap-2 rounded border border-border p-3 md:p-5">
        <p className="text-sm font-normal ">{t('M18')}</p>
        <Link
          className="text-sm font-semibold  hover:opacity-70"
          href="/auth/sign-in"
        >
          {t('M1')}
        </Link>
      </div>
    </Container>
  );
}
