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
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: LocaleSwitcher
 * ------------------------------------------------------------------------------------------------------------------ */

const localesVariants = cva('');

export type LocaleSwitcherProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof localesVariants>;

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
    <div className={localesVariants({ className })} {...props}>
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
