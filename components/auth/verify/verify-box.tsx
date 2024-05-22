'use client';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { HTMLAttributes } from 'react';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: VerifyBox
 * ------------------------------------------------------------------------------------------------------------------ */

const VerifyBoxVariants = cva(
  'flex w-full flex-col gap-3 border-border p-3 md:p-6 lg:max-w-xl lg:gap-6 lg:rounded-xl lg:border',
);

export type VerifyBoxProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof VerifyBoxVariants>;

export function VerifyBox({ className, ...props }: VerifyBoxProps) {
  const t = useTranslations('Auth');

  return (
    <div {...props} className={VerifyBoxVariants({ className })}>
      <div className="flex items-center justify-center">
        <Image
          className="dark:hidden"
          width={300}
          height={60}
          src="/logo-large.svg"
          alt="logo"
        />
        <Image
          className="hidden dark:block"
          width={300}
          height={60}
          src="/logo-dark-large.svg"
          alt="logo"
        />
      </div>

      <h1 className="text-center text-xl font-bold lg:text-2xl">{t('M30')}</h1>

      <p className="whitespace-normal text-center text-base lg:text-lg">
        {t('M31')}
      </p>
    </div>
  );
}
