'use client';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { HTMLAttributes } from 'react';
import { ForgetPasswordForm } from './forget-password-form';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: ForgetPasswordBox
 * ------------------------------------------------------------------------------------------------------------------ */

const forgetPasswordBoxVariants = cva(
  'flex w-full max-w-lg flex-col items-center gap-7.5 rounded-lg bg-background p-3 shadow-md md:gap-10 md:p-6',
);

export type ForgetPasswordBoxProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof forgetPasswordBoxVariants>;

export function ForgetPasswordBox({
  className,
  ...props
}: ForgetPasswordBoxProps) {
  const t = useTranslations('Auth');

  return (
    <div {...props} className={forgetPasswordBoxVariants({ className })}>
      <RefreshCcw className="size-12 text-primary" />

      <div className="w-full space-y-4 text-center">
        <h1 className="text-lg font-bold text-primary lg:text-xl">
          {t('M40')}
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-200 lg:text-base">
          {t('M41')}
        </p>
      </div>

      <ForgetPasswordForm />
    </div>
  );
}
