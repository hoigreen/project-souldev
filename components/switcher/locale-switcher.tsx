'use client';

import { locales, usePathname } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { HTMLAttributes } from 'react';
import { ArrowDown2 } from 'iconsax-react';
import queryString from 'query-string';
import VietnamFlag from '@/public/svg/locale/vietnam.svg';
import UkFlag from '@/public/svg/locale/uk.svg';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: LocaleSwitcher
 * ------------------------------------------------------------------------------------------------------------------ */

export type LocaleSwitcherProps = HTMLAttributes<HTMLDivElement>;

export function LocaleSwitcher({ className, ...props }: LocaleSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('Locale');
  const router = useRouter();

  const handleSwitch = (locale: string) => {
    router.push(
      queryString.stringifyUrl({
        url: `/${locale}/${pathname}`,
        query: queryString.parse(searchParams.toString()),
      }),
    );
  };

  return (
    <div className={cn({ className })} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-3 p-1 !font-medium lg:p-0">
            <Image
              src={locale === 'en' ? UkFlag : VietnamFlag}
              alt="flag"
              width={20}
              height={20}
              className="hidden md:block"
            />
            <Image
              src={locale === 'en' ? UkFlag : VietnamFlag}
              alt="flag"
              width={16}
              height={16}
              className="md:hidden"
            />

            {
              <ArrowDown2
                variant="TwoTone"
                size={16}
                className="max-sm:hidden"
              />
            }
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          {locales.map((lang) => (
            <DropdownMenuCheckboxItem
              key={lang}
              checked={locale === lang}
              onCheckedChange={() => handleSwitch(lang)}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={lang === 'en' ? UkFlag : VietnamFlag}
                  alt="flag"
                  width={20}
                  height={20}
                  className="hidden md:block"
                />
                <Image
                  src={lang === 'en' ? UkFlag : VietnamFlag}
                  alt="flag"
                  width={16}
                  height={16}
                  className="md:hidden"
                />

                <span>{t(lang === 'en' ? 'M1' : 'M2')}</span>
              </div>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function LocaleSwitcherRadioGroup({
  className,
  ...props
}: LocaleSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('Locale');
  const router = useRouter();

  const handleSwitch = (locale: string) => {
    router.push(
      queryString.stringifyUrl({
        url: `/${locale}/${pathname}`,
        query: queryString.parse(searchParams.toString()),
      }),
    );
  };

  return (
    <div className={cn({ className })} {...props}>
      <RadioGroup
        defaultValue={locale}
        className="flex flex-col gap-3 lg:flex-row lg:gap-12"
        onValueChange={(value) => handleSwitch(value)}
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem value="en" id="r1" />
          <Label
            htmlFor="r1"
            className="flex items-center gap-1 text-sm font-normal md:text-base "
          >
            <Image
              src={UkFlag}
              alt="flag"
              width={20}
              height={20}
              className="hidden md:block"
            />
            <span>{t('M1')}</span>
          </Label>
        </div>

        <div className="flex items-center gap-3">
          <RadioGroupItem value="vi" id="r2" />
          <Label
            htmlFor="r2"
            className="flex items-center gap-1 text-sm font-normal md:text-base"
          >
            <Image
              src={VietnamFlag}
              alt="flag"
              width={20}
              height={20}
              className="hidden md:block"
            />
            <span>{t('M2')}</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
