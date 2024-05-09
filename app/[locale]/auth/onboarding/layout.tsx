import getSession from '@/lib/get-session';
import { redirect } from '@/navigation';
import { ReactNode } from 'react';
import { SignOutButton } from '@/components/auth/sign-out/sign-out-button';
import { LocaleSwitcher } from '@/components/switcher/locale-switcher';
import ThemeSwitcher from '@/components/switcher/theme-switcher';

export default async function CompanyOnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    return redirect('/auth/sign-in');
  } else if (session.user.isOnboardingCompleted) {
    return redirect('/home');
  }

  return (
    <div className="grid min-h-screen grid-rows-[70px_1fr] bg-neutral-200 dark:bg-neutral-800">
      <header className="container flex items-center px-4">
        <div className="ml-auto flex gap-4">
          <ThemeSwitcher />
          <LocaleSwitcher />
          <SignOutButton />
        </div>
      </header>

      <main className="flex grow flex-col items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
