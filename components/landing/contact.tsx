import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import Container from '../ui/containter';
import { useTranslations } from 'next-intl';
import ContactForm from './contact-form';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: Contact
 * ------------------------------------------------------------------------------------------------------------------ */

const contactVariants = cva(
  'bg-foreground py-6 md:py-[4rem] lg:py-[5rem] xl:py-[6rem] 2xl:py-[8rem]',
);

type ContactProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof contactVariants>;

export default function Contact({
  className,
  ...props
}: ContactProps): React.JSX.Element {
  const t = useTranslations('Landing');

  return (
    <section className={contactVariants({ className })} id="contact" {...props}>
      <Container>
        <div className="flex w-full flex-col justify-center gap-y-12 md:gap-y-16 lg:gap-y-20">
          <div className="w-full space-y-4 md:space-y-6 lg:space-y-8">
            <h1 className="xs:text-3xl text-center text-2xl font-bold leading-snug text-background md:text-4xl md:leading-snug lg:text-5xl lg:leading-snug xl:text-6xl xl:leading-snug">
              {t('M23')}
            </h1>
            <p className="mx-auto text-center text-xs italic text-background md:max-w-lg md:text-sm lg:max-w-lg lg:text-base xl:max-w-xl xl:text-lg">
              {t('M24')}
            </p>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
