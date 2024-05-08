'use client';

import { useTranslations } from 'next-intl';
import { HTMLAttributes } from 'react';
import { LogoutCurve } from 'iconsax-react';
import { Button } from '@/components/ui/button';
import signOut from '@/lib/sign-out';
import { cn } from '@/lib/utils';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: SignOutButton
 * ------------------------------------------------------------------------------------------------------------------ */

export type SignOutButtonProps = HTMLAttributes<HTMLDivElement>;

export function SignOutButton({ className, ...props }: SignOutButtonProps) {
  const t = useTranslations('Auth');

  return (
    <div {...props}>
      <Button
        className={cn(
          'flex items-center justify-center gap-2 text-sm font-bold',
          className,
        )}
        onClick={() => signOut()}
      >
        <LogoutCurve variant="TwoTone" size={16} />
        {t('M54')}
      </Button>
    </div>
  );
}
