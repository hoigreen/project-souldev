'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { buttonVariants } from '../ui/button';
import React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

export function BackLink({
  label,
  href,
  className,
  ...props
}: {
  className?: string;
  href?: string;
  label?: string;
}): React.JSX.Element {
  const router = useRouter();
  const t = useTranslations('Home');

  const handleBack: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    if (href) {
      router.push(href);

      return;
    }
    router.back();
  };

  return (
    <div className={twMerge(className)}>
      <Link
        href="/"
        className={cn(
          buttonVariants({
            size: 'sm',
            variant: 'ghost',
          }),
          'gap-2 px-0',
        )}
        onClick={handleBack}
        {...props}
      >
        <ChevronLeft size={24} />
        <span className="hidden md:block">{label ?? t('M49')}</span>
      </Link>
    </div>
  );
}
