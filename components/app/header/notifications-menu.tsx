'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cva, VariantProps } from 'class-variance-authority';
import { BellRing } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: NotificationsMenu
 * ------------------------------------------------------------------------------------------------------------------ */

export const notificationsMenuVariants = cva('');

export type NotificationsMenuProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof notificationsMenuVariants>;

export const NotificationsMenu: FC<NotificationsMenuProps> = ({
  className,
  ...props
}) => {
  const t = useTranslations('Notifications');

  return (
    <div className={notificationsMenuVariants({ className })} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger className="data-state-open:bg-neutral-300 flex size-10 items-center gap-4 rounded-full border border-neutral-300 transition hover:bg-neutral-300">
          <BellRing size={16} className="m-auto rotate-12 text-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('M1')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={''}>{t('M2')}</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
