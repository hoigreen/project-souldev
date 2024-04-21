import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import { ArrowLeft } from 'iconsax-react';
import React, { HTMLAttributes } from 'react';
import { buttonVariants } from '../button';

interface BackLinkButtonProps extends HTMLAttributes<HTMLButtonElement> {
  href?: string;
  text: string;
}

export default function BackLinkButton({
  href = '/',
  text,
  className,
}: BackLinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2',
        buttonVariants({ variant: 'ghost' }),
        className,
      )}
    >
      <ArrowLeft className="size-4" />
      {text}
    </Link>
  );
}
