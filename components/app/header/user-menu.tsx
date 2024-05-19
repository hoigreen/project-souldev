'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
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
            <Avatar>
              <AvatarImage src={user.image} alt="Avatar" />
              <AvatarFallback>{user.first_name}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-60">
            <DropdownMenuLabel>{t('M1')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/setting" className="text-base">
                {t('M2')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-base font-medium text-red-500 hover:text-red-600"
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
