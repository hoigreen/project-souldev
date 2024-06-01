import cookie from '@/lib/cookie';
import { signOut as authSignOut, SignOutParams } from 'next-auth/react';
import toast from 'react-hot-toast';

const signOut = async <R extends boolean = true>(
  options?: SignOutParams<R>,
) => {
  try {
    await authSignOut(options);

    cookie.delete(
      (process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string) ?? 'access_token',
    );

    toast.success('Signed out successfully!');
  } catch (error: any) {
    console.error(error);
  }
};

export default signOut;
