'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import signOut from '@/lib/sign-out';
import { cva, VariantProps } from 'class-variance-authority';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: UserMenu
 * ------------------------------------------------------------------------------------------------------------------ */

export const userMenuVariants = cva('');

export type UserMenuProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof userMenuVariants>;

export const UserMenu: FC<UserMenuProps> = ({ className, ...props }) => {
  const { data } = useSession();
  const t = useTranslations('Account');

  const user = data?.user;

  return (
    <div className={userMenuVariants({ className })} {...props}>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger className="data-state-open:bg-neutral-300 relative flex items-center gap-4 rounded-full p-1 transition hover:bg-neutral-300">
            <Image
              alt={user?.first_name ?? 'User'}
              className="rounded-full border-2 border-neutral-200 object-cover object-center"
              height={32}
              src={user?.image || '/images/default-user.jpg'}
              width={32}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('M1')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={''}>{t('M2')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onSelect={() => signOut()}
            >
              {t('M3')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
