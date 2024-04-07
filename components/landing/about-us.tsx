import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import Container from '../ui/containter';
import Image from 'next/image';
import HERO_IMAGE from '@/public/svg/landing-page/hero.svg';
import { useTranslations } from 'next-intl';
import { EmphasizedTextBold } from '../ui/emphasize';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: AboutUs
 * ------------------------------------------------------------------------------------------------------------------ */

const aboutUsVariants = cva('mt-12 md:mt-0');

export type AboutUsProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof aboutUsVariants>;

export default function AboutUs({
  className,
  ...props
}: AboutUsProps): React.JSX.Element {
  const t = useTranslations('Landing');

  return (
    <section className={aboutUsVariants({ className })} {...props}>
      <Container className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="w-full flex-1 space-y-6 md:max-w-md md:space-y-9 lg:max-w-lg lg:space-y-12 xl:max-w-2xl 2xl:max-w-3xl">
          <div className="w-full space-y-3 md:space-y-4">
            <h1 className="xs:text-3xl text-center text-xl font-bold leading-snug md:text-left md:text-4xl md:leading-snug lg:text-5xl lg:leading-snug xl:text-6xl xl:leading-snug">
              {t('M13')}
            </h1>
            <p className="xs:text-base text-center text-xs md:text-justify md:text-lg lg:text-xl">
              {t.rich('M14', {
                emphasize: EmphasizedTextBold,
              })}
            </p>
          </div>
          <div className="flex w-full items-center justify-center gap-2 md:justify-start md:gap-4">
            <Link
              href="/auth/sign-in"
              className={buttonVariants({ size: 'xl' })}
            >
              <span className="text-base font-bold md:text-lg lg:text-xl">
                {t('M15')}
              </span>
            </Link>
            <Link
              href="/auth/sign-in"
              className={buttonVariants({ size: 'xl', variant: 'ghost' })}
            >
              <span className="text-base font-bold md:text-lg lg:text-xl">
                {t('M16')}
              </span>
            </Link>
          </div>
        </div>

        <Image
          alt="Hero Image"
          className="aspect-square h-full w-full md:max-w-md lg:max-w-xl xl:max-w-3xl"
          priority
          src={HERO_IMAGE}
        />
      </Container>
    </section>
  );
}
