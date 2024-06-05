import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import Container from '../ui/containter';
import Image from 'next/image';
import FEATURE_IMAGE_1 from '@/public/svg/landing-page/feature-1.svg';
import FEATURE_IMAGE_2 from '@/public/svg/landing-page/feature-2.svg';
import FEATURE_IMAGE_3 from '@/public/svg/landing-page/feature-3.svg';
import FEATURE_IMAGE_4 from '@/public/svg/landing-page/feature-4.svg';
import FEATURE_IMAGE_5 from '@/public/svg/landing-page/feature-5.svg';
import FEATURE_IMAGE_6 from '@/public/svg/landing-page/feature-6.svg';
import { useTranslations } from 'next-intl';
import { FeatureItem } from '@/lib/definitions';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: Features
 * ------------------------------------------------------------------------------------------------------------------ */

const featuresVariants = cva('py-6 md:py-0');

type FeaturesProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof featuresVariants>;

export default function Features({
  className,
  ...props
}: FeaturesProps): React.JSX.Element {
  const t = useTranslations('Landing');
  const tf = useTranslations('Landing.M22');

  const items: FeatureItem[] = [
    {
      title: tf('featuredItem1.title'),
      description: tf('featuredItem1.description'),
      icon: FEATURE_IMAGE_1,
    },
    {
      title: tf('featuredItem2.title'),
      description: tf('featuredItem2.description'),
      icon: FEATURE_IMAGE_2,
    },
    {
      title: tf('featuredItem3.title'),
      description: tf('featuredItem3.description'),
      icon: FEATURE_IMAGE_3,
    },
    {
      title: tf('featuredItem4.title'),
      description: tf('featuredItem4.description'),
      icon: FEATURE_IMAGE_4,
    },
    {
      title: tf('featuredItem5.title'),
      description: tf('featuredItem5.description'),
      icon: FEATURE_IMAGE_5,
    },
    {
      title: tf('featuredItem6.title'),
      description: tf('featuredItem6.description'),
      icon: FEATURE_IMAGE_6,
    },
  ];

  return (
    <section
      className={featuresVariants({ className })}
      id="features"
      {...props}
    >
      <Container className="w-full space-y-12 md:space-y-16 lg:space-y-20">
        <div className="mx-auto w-full flex-1 space-y-4 md:max-w-md md:space-y-6 lg:max-w-lg lg:space-y-8 xl:max-w-2xl 2xl:max-w-3xl">
          <h1 className="text-center text-2xl font-bold leading-snug xs:text-3xl md:text-4xl md:leading-snug lg:text-5xl lg:leading-snug xl:text-6xl xl:leading-snug">
            {t('M20')}
          </h1>
          <p className="text-center text-sm xs:text-base md:text-lg lg:text-xl">
            {t('M21')}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2 md:gap-x-4 md:gap-y-8 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="space-y-2 md:mx-auto md:space-y-3 lg:space-y-4 xl:space-x-6 2xl:space-y-8"
            >
              <div className="max-w-32 md:mx-auto md:max-w-40 lg:max-w-44 xl:max-w-48 2xl:max-w-52">
                <Image
                  alt={item.title}
                  className="aspect-square size-full"
                  src={item.icon}
                />
              </div>
              <h2 className="text-lg font-bold md:text-center md:text-xl lg:text-2xl">
                {item.title}
              </h2>
              <p className="text-sm font-light md:text-center md:text-base lg:text-lg">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
