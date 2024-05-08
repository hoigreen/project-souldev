'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { ArrowLeft } from 'iconsax-react';
import { buttonVariants } from '../ui/button';
import React from 'react';

export function BackLink({
  label,
  className,
  ...props
}: React.ComponentProps<typeof Link> & {
  label: string;
}): React.JSX.Element {
  const router = useRouter();

  const handleBack: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    router.back();
  };

  return (
    <div className={twMerge(className)}>
      <Link
        className={buttonVariants({
          size: 'sm',
          variant: 'ghost',
        })}
        onClick={handleBack}
        {...props}
      >
        <ArrowLeft className="-ml-3" size={24} variant="TwoTone" />
        <span>{label}</span>
      </Link>
    </div>
  );
}
