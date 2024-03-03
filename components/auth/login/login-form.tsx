'use client';

import { VariantProps, cva } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import { HTMLAttributes } from 'react';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: LoginForm
 * ------------------------------------------------------------------------------------------------------------------ */

const loginFormVariants = cva('');

export type LoginFormProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof loginFormVariants>;

export function LoginForm({ className, ...props }: LoginFormProps) {
  const t = useTranslations('Auth');

  return (
    <div {...props} className={loginFormVariants({ className })}>
      123
    </div>
  );
}
