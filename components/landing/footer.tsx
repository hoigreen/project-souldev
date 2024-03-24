import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import Container from '../ui/containter';
import Logo from '@/public/logo-text.svg';
import LogoDark from '@/public/logo-text-dark.svg';
import Image from 'next/image';
import { Route } from '@/lib/definitions';
import Link from 'next/link';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: FooterMenu
 * ------------------------------------------------------------------------------------------------------------------ */

const footerMenuVariants = cva('pb-6 pt-8 md:py-10');

export type FooterMenuProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof footerMenuVariants> & {
    routes: Route[];
  };

export function FooterMenu({ className, routes, ...props }: FooterMenuProps) {
  const t = useTranslations('Landing');

  return (
    <Container className={footerMenuVariants({ className })} {...props}>
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        {/* Logo */}
        <div className="">
          <div className="max-w-md space-y-8">
            <Image
              src={Logo}
              alt="SoulDev"
              width={200}
              height={40}
              className="mx-auto dark:hidden"
            />

            <Image
              src={LogoDark}
              alt="SoulDev"
              width={200}
              height={40}
              className="mx-auto hidden dark:block"
            />

            <p className="text-grayscale-2 italic xl:text-base">{t('M8')}</p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
          <div className="flex-1">
            <ul className="flex flex-col gap-6 text-sm font-medium md:text-base xl:text-lg">
              {routes.map((route, index) => (
                <Link
                  key={index}
                  className="hover:text-primary"
                  href={route.path}
                >
                  {route.name}
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
          <div className="flex-1">
            <div className="space-y-5">
              <h3 className="text-xl font-bold xl:text-2xl">{t('M9')}</h3>
              <ul className="space-y-4 font-medium xl:text-lg">
                <li>
                  <p className="mb-2">{t('M10')}</p>
                </li>
                <li>
                  <p>{t('M12')}</p>
                </li>
                <li>
                  <p>{t('M11')}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: FooterMobileMenu
 * ------------------------------------------------------------------------------------------------------------------ */

const footerMobileMenuVariants = cva('');

export type FooterMobileMenuProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof footerMobileMenuVariants>;

export function FooterMobileMenu({ className, ...props }: FooterMenuProps) {
  const t = useTranslations('Landing');

  return (
    <div className={footerMobileMenuVariants({ className })} {...props}></div>
  );
}

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: Footer
 * ------------------------------------------------------------------------------------------------------------------ */

const footerVariants = cva('border-t border-border bg-background text-primary');

export type FooterProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof footerVariants> & {
    routes: Route[];
  };

export default function Footer({
  className,
  routes,
  ...props
}: FooterMenuProps) {
  const t = useTranslations('Landing');

  return (
    <div className={footerVariants({ className })} {...props}>
      <FooterMenu routes={routes} />

      <FooterMobileMenu routes={routes} />

      <p className="text-grayscale-2 w-full gap-y-4 border-t pb-8 pt-6 text-center text-sm font-medium md:py-6 md:text-base xl:text-lg">
        {t('M7')}
      </p>
    </div>
  );
}
