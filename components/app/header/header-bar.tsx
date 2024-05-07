import { Link } from '@/navigation';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import { HTMLAttributes } from 'react';
import LogoTextSvg from '@/public/logo-text.svg';
import LogoTextDarkSvg from '@/public/logo-text-dark.svg';
import { UserMenu } from './user-menu';
import { NotificationsMenu } from './notifications-menu';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: Headerbar
 * ------------------------------------------------------------------------------------------------------------------ */

const headerbarVariants = cva(
  'pointer-events-auto sticky top-0 z-50 flex items-center justify-between border-b bg-background p-2 md:px-4',
);

export type HeaderbarProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof headerbarVariants>;

export function Headerbar({ className, ...props }: HeaderbarProps) {
  return (
    <nav {...props} className={headerbarVariants({ className })}>
      <Link href="/" title="SoulDev">
        <Image
          src={LogoTextSvg}
          className="dark:hidden max-md:h-10 max-md:w-auto"
          width={200}
          height={40}
          alt="SoulDev"
        />
        <Image
          src={LogoTextDarkSvg}
          className="hidden dark:block max-md:h-10"
          width={200}
          height={40}
          alt="SoulDev"
        />
      </Link>

      {/* Searchbar */}

      {/* Avatar dropdown */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Message */}

        {/* Notification */}
        <NotificationsMenu />

        {/* User menu */}
        <UserMenu />
      </div>
    </nav>
  );
}
