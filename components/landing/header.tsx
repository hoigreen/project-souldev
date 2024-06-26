'use client';

import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import Container from '../ui/containter';
import LogoTextSvg from '@/public/logo-text.svg';
import LogoTextDarkSvg from '@/public/logo-text-dark.svg';
import { Link, useRouter } from '@/navigation';
import Image from 'next/image';
import ThemeSwitcher from '../switcher/theme-switcher';
import ButtonLink from './button-link';
import { useTranslations } from 'next-intl';
import NavbarMobile from './navbar-mobile';
import { Route } from '@/lib/definitions';
import { LocaleSwitcher } from '../switcher/locale-switcher';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: Header
 * ------------------------------------------------------------------------------------------------------------------ */

const headerVariants = cva(
  'pointer-events-auto sticky top-0 z-50 border-b bg-background',
);

export type HeaderProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof headerVariants> & {
    routes: Route[];
  };

export default function Header({ className, routes, ...props }: HeaderProps) {
  const t = useTranslations('Landing');
  const router = useRouter();

  return (
    <div className={headerVariants({ className })} {...props}>
      <Container className="flex items-center justify-between bg-background py-2 lg:py-3">
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

        <ul className="hidden w-fit items-center md:flex md:gap-4 xl:gap-6 2xl:gap-8">
          {routes.map((route, index) => (
            <li
              key={index}
              className="cursor-pointer text-right text-sm text-primary transition-colors duration-200 hover:opacity-90 lg:text-base"
              onClick={() => router.push(route.path)}
            >
              {route.name}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 lg:gap-4">
          <ButtonLink
            className="hidden font-bold lg:block"
            label={t('M1')}
            link="/auth/sign-in"
          />

          <ButtonLink
            className="hidden font-bold lg:block"
            label={t('M2')}
            link="/auth/sign-up"
            buttonVariant="outline"
          />

          <ThemeSwitcher title="Theme" className="max-sm:hidden" />

          <LocaleSwitcher className="max-sm:hidden" />

          <NavbarMobile className="md:hidden" routes={routes} />
        </div>
      </Container>
    </div>
  );
}
