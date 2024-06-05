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
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

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

export function ThemeSwitcherRadio({
  className,
  ...props
}: ThemeSwitcherProps) {
  const { setTheme, theme } = useTheme();
  const t = useTranslations('Theme');

  return (
    <div className={themeSwitcherVariants({ className })} {...props}>
      <RadioGroup
        defaultValue={theme}
        className="flex flex-col gap-3 lg:flex-row lg:gap-12"
        onValueChange={(value) => setTheme(value)}
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem value="light" id="r1" />
          <Label
            htmlFor="r1"
            className="flex items-center gap-1 text-sm font-normal md:text-base "
          >
            <Sun className="size-5" />
            <span>{t('M1')}</span>
          </Label>
        </div>

        <div className="flex items-center gap-3">
          <RadioGroupItem value="dark" id="r2" />
          <Label
            htmlFor="r2"
            className="flex items-center gap-1 text-sm font-normal md:text-base"
          >
            <Moon className="size-5" />
            <span>{t('M2')}</span>
          </Label>
        </div>

        <div className="flex items-center gap-3">
          <RadioGroupItem value="system" id="r3" />
          <Label
            htmlFor="r3"
            className="flex items-center gap-1 text-sm font-normal md:text-base"
          >
            {t('M3')}
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
