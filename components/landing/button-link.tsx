import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { Link } from '@/navigation';
import { Button, ButtonProps } from '../ui/button';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: ButtonLink
 * ------------------------------------------------------------------------------------------------------------------ */

const ButtonLinkVariants = cva('');

export type ButtonLinkProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof ButtonLinkVariants> & {
    label: string;
    link: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    buttonVariant?: ButtonProps['variant'];
  };

export default function ButtonLink({
  className,
  label,
  link,
  icon,
  iconPosition = 'left',
  buttonVariant,
  ...props
}: ButtonLinkProps) {
  return (
    <Link href={link} {...props} className="item-center flex gap-2">
      {iconPosition === 'left' && icon}
      <Button
        variant={buttonVariant}
        className={ButtonLinkVariants({ className })}
      >
        {label}
      </Button>
      {iconPosition === 'right' && icon}
    </Link>
  );
}
