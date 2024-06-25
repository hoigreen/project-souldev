import { useTranslations } from 'next-intl';
import Container from '../ui/containter';
import Logo from '@/public/logo-text.svg';
import LogoDark from '@/public/logo-text-dark.svg';
import Image from 'next/image';
import { Route } from '@/lib/definitions';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export type FooterMenuProps = HTMLAttributes<HTMLElement> & {
  routes: Route[];
};

export function FooterMenu({ className, routes, ...props }: FooterMenuProps) {
  const t = useTranslations('Landing');

  return (
    <Container
      className={cn('pb-6 pt-8 max-sm:hidden md:py-10', className)}
      {...props}
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <div className="max-w-md space-y-8">
            <Image
              src={Logo}
              alt="SoulDev"
              width={200}
              height={40}
              className="dark:hidden"
            />

            <Image
              src={LogoDark}
              alt="SoulDev"
              width={200}
              height={40}
              className="hidden dark:block"
            />

            <p className="italic xl:text-base">{t('M8')}</p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
          <div className="flex-1">
            <ul className="flex flex-col gap-6 text-sm md:text-base xl:text-lg">
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
              <ul className="space-y-4 xl:text-lg">
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

export type FooterMobileMenuProps = HTMLAttributes<HTMLElement> & {
  routes: Route[];
};

export function FooterMobileMenu({
  className,
  routes,
  ...props
}: FooterMenuProps) {
  const t = useTranslations('Landing');

  return (
    <Container className={cn('hidden py-6 max-sm:block', className)} {...props}>
      <div className="grid grid-cols-2 gap-4">
        <div className="max-w-md space-y-6">
          <Image
            src={Logo}
            alt="SoulDev"
            width={200}
            height={40}
            className="dark:hidden"
          />

          <Image
            src={LogoDark}
            alt="SoulDev"
            width={200}
            height={40}
            className="hidden dark:block"
          />

          <p className="text-sm italic">{t('M8')}</p>

          <div className="flex flex-col items-start justify-between gap-3">
            <h3 className="text-lg font-bold">{t('M9')}</h3>
            <ul className="space-y-2 text-sm">
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

        <ul className="flex flex-col gap-4 text-base font-medium">
          {routes.map((route, index) => (
            <Link
              key={index}
              className="hover:text-primary/40"
              href={route.path}
            >
              {route.name}
            </Link>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export type FooterProps = HTMLAttributes<HTMLElement> & {
  routes: Route[];
};

export default function Footer({
  className,
  routes,
  ...props
}: FooterMenuProps) {
  const t = useTranslations('Landing');

  return (
    <div
      className={cn(
        'border-t border-border bg-background text-primary',
        className,
      )}
      {...props}
    >
      <FooterMenu routes={routes} />

      <FooterMobileMenu routes={routes} />

      <p className="w-full gap-y-4 border-t pb-8 pt-6 text-center text-sm md:py-6 md:text-base xl:text-lg">
        {t('M7')}
      </p>
    </div>
  );
}
