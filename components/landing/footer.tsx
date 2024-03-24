import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: Footer
 * ------------------------------------------------------------------------------------------------------------------ */

const footerVariants = cva('');

export type FooterProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof footerVariants>;

export default function Footer({ className, ...props }: FooterProps) {
  return (
    <div className={footerVariants({ className })} {...props}>
      123
    </div>
  );
}
