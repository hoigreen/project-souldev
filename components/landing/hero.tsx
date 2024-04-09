import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import Container from '../ui/containter';
import Image from 'next/image';
import BANNER_IMAGE from '@/public/image/landing/banner.webp';
import { useTranslations } from 'next-intl';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: Hero
 * ------------------------------------------------------------------------------------------------------------------ */

const heroVariants = cva('bg-foreground py-6 md:py-0');

type HeroProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof heroVariants>;

export default function Hero({
  className,
  ...props
}: HeroProps): React.JSX.Element {
  const t = useTranslations('Landing');

  return (
    <section className={heroVariants({ className })} {...props}>
      <Container className="flex w-full flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-0">
        <Image
          alt="Hero"
          className="aspect-[4/3] h-full w-full md:max-w-xl lg:max-w-4xl xl:max-w-6xl"
          priority
          src={BANNER_IMAGE}
        />

        <div className="w-full flex-1 space-y-6 text-background md:max-w-md md:space-y-9 lg:max-w-lg lg:space-y-12 xl:max-w-2xl 2xl:max-w-3xl">
          <div className="w-full space-y-3 md:space-y-4">
            <h1 className="xs:text-3xl text-center text-2xl font-bold leading-snug md:text-left md:text-4xl md:leading-snug lg:text-5xl lg:leading-snug xl:text-6xl xl:leading-snug">
              {t('M17')}
            </h1>
            <p className="xs:text-base text-center text-sm md:text-justify md:text-lg lg:text-xl">
              {t('M18')}
            </p>
          </div>
          <p className="text-center text-xs italic md:text-left md:text-sm">
            {t('M19')}
          </p>
        </div>
      </Container>
    </section>
  );
}
