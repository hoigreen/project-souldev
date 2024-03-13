import { SignInOptions, signIn } from 'next-auth/react';
import { useRouter } from '@/navigation';
import { useSearchParams } from 'next/navigation';

function removeLocale(url: string) {
  if (url.startsWith('/en/') || url.startsWith('/vi/')) {
    return url.slice(3);
  }

  return url;
}

export const useSignInWithCredential = (callback = '/') => {
  const searchParams = useSearchParams();
  const callbackUrl = removeLocale(
    searchParams?.get('callbackUrl') ?? callback,
  );
  const router = useRouter();

  const signInWithCredential = async (options?: SignInOptions) => {
    const res = await signIn('credentials', {
      ...options,
      callbackUrl,
      redirect: false,
    });

    if (res?.ok) {
      router.push(callbackUrl);
    }
  };

  return { signInWithCredential };
};
