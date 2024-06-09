'use client';

import signOut from '@/lib/sign-out';
import { useSession } from 'next-auth/react';
import { useRouter } from '@/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'authenticated') {
      router.replace('/');

      return;
    }

    signOut();

    signOut({ redirect: false }).then(() => {
      router.replace('/auth/sign-in');
    });
  }, [data, router, status]);

  return null;
}
