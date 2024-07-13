import { SignInOptions, signIn } from 'next-auth/react';
import { useRouter } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

function removeLocale(url: string) {
  if (url.startsWith('/en/') || url.startsWith('/vi/')) {
    return url.slice(3);
  }

  return url;
}

export const useSignInWithCredential = (callback = '/') => {
  const t = useTranslations('Auth');
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = removeLocale(
    searchParams?.get('callbackUrl') ?? callback,
  );

  const signInWithCredential = async (options?: SignInOptions) => {
    const res = await signIn('credentials', {
      ...options,
      callbackUrl,
      redirect: false,
    });

    if (res?.ok) {
      toast.success(t('M56'));
      router.push(callbackUrl);
    }
  };

  return { signInWithCredential };
};
