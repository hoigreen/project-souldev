'use client';

import AvatarUser from '@/components/ui/app/avatar-user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import signOut from '@/lib/sign-out';
import { Link } from '@/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { FC, HTMLAttributes } from 'react';

export type UserMenuProps = HTMLAttributes<HTMLDivElement>;

export const UserMenu: FC<UserMenuProps> = ({ className, ...props }) => {
  const { data } = useSession();
  const t = useTranslations('Account');

  const user = data?.user;

  return (
    <div className={className} {...props}>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger className="data-state-open:bg-neutral-300 relative flex items-center gap-4 rounded-full p-1 transition hover:bg-neutral-300">
            <AvatarUser
              src={user.image}
              alt="Avatar"
              fallback={user.first_name}
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="min-w-60">
            <DropdownMenuLabel>{t('M1')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="text-base">
                {t('M4')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account-setting" className="text-base">
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
