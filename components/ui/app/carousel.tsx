'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
// import type { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

export default function Carousel({
  autoPlay = false,
  children,
  classNames,
  className,
  options,
}: {
  autoPlay?: boolean;
  children?: React.ReactNode;
  className?: string;
  classNames?: {
    viewport?: string;
    container?: string;
  };
  options?: any;
}): React.JSX.Element {
  const [emblaRef] = useEmblaCarousel(options, [
    Autoplay({
      delay: 3000,
      active: autoPlay,
    }),
  ]);

  return (
    <div className={cn(className)} data-slot="embla">
      <div
        className={cn('overflow-hidden', classNames?.viewport)}
        data-slot="viewport"
        ref={emblaRef}
      >
        <div
          className={cn(
            'flex touch-pan-y [backface-visibility:hidden]',
            classNames?.container,
          )}
          data-slot="container"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
