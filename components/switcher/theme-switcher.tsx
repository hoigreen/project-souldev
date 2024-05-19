'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import { VariantProps, cva } from 'class-variance-authority';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: ThemeSwitcher
 * ------------------------------------------------------------------------------------------------------------------ */

const themeSwitcherVariants = cva('');

export type ThemeSwitcherProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof themeSwitcherVariants>;

export default function ThemeSwitcher({
  className,
  ...props
}: ThemeSwitcherProps) {
  const { setTheme } = useTheme();
  const t = useTranslations('Theme');

  return (
    <div className={themeSwitcherVariants({ className })} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            <span className="text-sm">{t('M1')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            <span className="text-sm">{t('M2')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            <span className="text-sm">{t('M3')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
