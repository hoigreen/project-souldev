'use server';

import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { LoginForm } from '@/components/auth/login/login-form';
import Container from '@/components/ui/containter';
import Image from 'next/image';

export async function generateMetadata() {
  const t = await getTranslations('Auth');

  return {
    title: t('M1'),
  };
}

export default async function LoginPage() {
  const t = await getTranslations('Auth');

  return (
    <Container>
      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-col gap-3 p-3">
          <div className="flex items-center justify-center">
            <Image width={300} height={60} src="/logo-large.svg" alt="logo" />
          </div>

          <LoginForm />
        </div>

        <div className="flex items-center justify-center gap-2 rounded border border-border px-12 py-6">
          <p className="text-base font-normal text-neutral-800">{t('M2')}</p>
          <Link
            className="font-semibold text-neutral-800 hover:opacity-70"
            href="/auth/sign-up"
          >
            {t('M3')}
          </Link>
        </div>
      </div>
    </Container>
  );
}
