'use client';

import { VariantProps, cva } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import { HTMLAttributes, useState } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
import { List, XCircle } from 'lucide-react';
import { Route } from '@/lib/definitions';
import { Link } from '@/navigation';
import LogoTextSvg from '@/public/logo-text.svg';
import LogoTextDarkSvg from '@/public/logo-text-dark.svg';
import Image from 'next/image';
import ButtonLink from './button-link';
import ThemeSwitcher from '../switcher/theme-switcher';
import { LocaleSwitcher } from '../switcher/locale-switcher';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: NavbarMobile
 * ------------------------------------------------------------------------------------------------------------------ */

const NavbarMobileVariants = cva('');

export type NavbarMobileProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof NavbarMobileVariants> & {
    routes: Route[];
  };

export default function NavbarMobile({
  className,
  routes,
  ...props
}: NavbarMobileProps) {
  const t = useTranslations('Landing');
  const [open, setOpen] = useState(false);

  return (
    <div className={NavbarMobileVariants({ className })} {...props}>
      <Drawer direction="right" onOpenChange={setOpen} open={open}>
        <DrawerTrigger className="relative flex rounded-lg bg-background">
          <List size={18} />
        </DrawerTrigger>

        <DrawerContent>
          <div className="relative ml-auto h-screen w-full max-w-sm space-y-12 overflow-auto bg-background p-6 pt-[4.5rem] md:pt-[5.375rem] lg:pt-[6.5rem]">
            <div className="fixed inset-0 top-12 flex justify-between px-6 py-2">
              <Link href="/" title="SoulDev">
                <Image
                  src={LogoTextSvg}
                  className="dark:hidden max-md:h-[2.5rem] max-md:w-auto"
                  width={200}
                  height={40}
                  alt="SoulDev"
                />
                <Image
                  src={LogoTextDarkSvg}
                  className="hidden dark:block max-md:h-[2.5rem]"
                  width={200}
                  height={40}
                  alt="SoulDev"
                />
              </Link>

              <XCircle
                size={24}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>

            <ul className="w-full space-y-8">
              {routes.map((route, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="cursor-pointer text-right text-lg text-primary transition-colors duration-200 hover:opacity-90"
                >
                  {route.name}
                </li>
              ))}
            </ul>

            <div className="fixed inset-x-0 bottom-0">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-2">
                  <ThemeSwitcher title="Theme" />
                  <LocaleSwitcher />
                </div>

                <div className="flex space-x-3">
                  <ButtonLink
                    className="font-bold"
                    label={t('M1')}
                    link="/auth/sign-in"
                  />

                  <ButtonLink
                    className="font-bold"
                    label={t('M2')}
                    link="/auth/sign-up"
                    buttonVariant="outline"
                  />
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
