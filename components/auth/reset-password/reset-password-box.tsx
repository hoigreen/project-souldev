'use client';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import type { HTMLAttributes } from 'react';
import { ResetPasswordForm } from './reset-password-form';
import { Link } from '@/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: ResetPasswordBox
 * ------------------------------------------------------------------------------------------------------------------ */

const resetPasswordBoxVariants = cva(
  'gap-7.5 flex w-full max-w-lg flex-col items-center rounded-lg border bg-background p-3 shadow-md md:gap-10 md:p-6',
);

export type ResetPasswordBoxProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof resetPasswordBoxVariants> & {
    resetToken: string;
  };

export function ResetPasswordBox({
  className,
  resetToken,
  ...props
}: ResetPasswordBoxProps) {
  const t = useTranslations('Auth');

  return (
    <div {...props} className={resetPasswordBoxVariants({ className })}>
      <h1 className="text-lg font-bold text-primary lg:text-xl">{t('M46')}</h1>

      {/* Form */}
      <div className="mx-auto w-full space-y-4">
        <ResetPasswordForm resetToken={resetToken} />

        <Link
          href="/auth/sign-in"
          className={cn(
            'mx-auto block w-full text-center',
            buttonVariants({ variant: 'link' }),
          )}
        >
          {t('M51')}
        </Link>
      </div>
    </div>
  );
}
