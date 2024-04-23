import { Link } from '@/navigation';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import { HTMLAttributes } from 'react';
import LogoTextSvg from '@/public/logo-text.svg';
import LogoTextDarkSvg from '@/public/logo-text-dark.svg';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: Headerbar
 * ------------------------------------------------------------------------------------------------------------------ */

const headerbarVariants = cva(
  'pointer-events-auto sticky top-0 z-50 flex items-center justify-between border-b bg-background px-2 py-2 md:px-4',
);

export type HeaderbarProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof headerbarVariants>;

export function Headerbar({ className, ...props }: HeaderbarProps) {
  return (
    <nav {...props} className={headerbarVariants({ className })}>
      <Link href="/" title="SoulDev">
        <Image
          src={LogoTextSvg}
          className="dark:hidden max-md:h-[2.5rem] max-md:w-auto"
          width={200}
          height={40}
          alt="SoulDev"
        />
        <Image
          src={LogoTextDarkSvg}
          className="hidden dark:block max-md:h-[2.5rem]"
          width={200}
          height={40}
          alt="SoulDev"
        />
      </Link>

      {/* Navbar */}

      {/* Avatar dropdown */}
    </nav>
  );
}
