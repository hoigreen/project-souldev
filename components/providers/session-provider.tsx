'use client';

import { SessionProvider as AuthSessionProvider } from 'next-auth/react';
import { SessionProviderProps } from 'next-auth/react';

export function SessionProvider({ children, ...props }: SessionProviderProps) {
  return <AuthSessionProvider {...props}>{children}</AuthSessionProvider>;
}
