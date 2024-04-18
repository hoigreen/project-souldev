'use client';

import { VariantProps, cva } from 'class-variance-authority';
import React, { useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ContactSchema, contactSchema } from '@/lib/validations/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: ContactForm
 * ------------------------------------------------------------------------------------------------------------------ */

const contactFormVariants = cva('');

type ContactFormProps = React.FormHTMLAttributes<HTMLElement> &
  VariantProps<typeof contactFormVariants>;

export default function ContactForm({
  className,
  ...props
}: ContactFormProps): React.JSX.Element {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('Landing');

  const form = useForm<ContactSchema>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(contactSchema),
    disabled: isPending,
  });

  const handleSubmit: SubmitHandler<ContactSchema> = () => {
    startTransition(async () => {
      try {
        toast.success(t('M27'));
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className={contactFormVariants({ className })}
        onSubmit={
          form.handleSubmit(
            handleSubmit,
          ) as React.FormEventHandler<HTMLFormElement>
        }
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mx-auto flex w-full max-w-sm grow flex-col gap-2 text-left md:max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="relative flex h-12 flex-col items-center md:h-14 lg:h-16 xl:h-20">
                <FormControl>
                  <Input
                    className="h-full indent-1 text-base md:indent-2 md:text-lg lg:indent-3 lg:text-xl xl:text-2xl"
                    placeholder={t('M25')}
                    {...field}
                  />
                </FormControl>

                <Button
                  className="absolute inset-y-1 right-1 md:inset-y-2 md:right-2 lg:inset-y-3  lg:right-3"
                  disabled={isPending}
                  size="xl"
                  type="submit"
                >
                  <span className="text-base md:text-lg lg:text-xl xl:text-2xl">
                    {t('M26')}
                  </span>
                </Button>
              </div>

              <FormMessage className="text-sm md:text-base lg:text-lg" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
