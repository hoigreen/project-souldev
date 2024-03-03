import { getTranslations } from 'next-intl/server';
import { LoginForm } from '@/components/auth/login/login-form';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

export async function generateMetadata() {
  const t = await getTranslations('Auth');

  return {
    title: t('M1'),
  };
}

export default function LoginPage() {
  const t = useTranslations('Auth');

  return (
    <div className="mx-4 flex w-full flex-col gap-3 lg:mx-0 lg:max-w-lg">
      <div className="flex flex-col gap-3 rounded border p-12">
        <div className="flex items-center justify-center">
          <h2 className="text-4xl font-bold text-neutral-800">SoulDev</h2>
        </div>

        <LoginForm />
      </div>

      <div className="flex items-center justify-center gap-2 rounded border border-border px-12 py-6">
        <p className="text-base font-normal text-neutral-800">{t('M2')}</p>
        <Link
          href="/auth/sign-up"
          className="font-semibold text-green-500 hover:opacity-70"
        >
          {t('M3')}
        </Link>
      </div>
    </div>
  );
}
