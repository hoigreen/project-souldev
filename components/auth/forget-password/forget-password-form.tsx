'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  ForgetPasswordSchema,
  forgetPasswordSchema,
} from '@/lib/validations/auth';
import toast from 'react-hot-toast';
import { forgetPassWord } from '@/lib/actions';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: ForgetPasswordForm
 * ------------------------------------------------------------------------------------------------------------------ */

const forgetPasswordFormVariants = cva(
  'flex w-full flex-col gap-7.5 md:gap-10',
);

export type ForgetPasswordFormProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof forgetPasswordFormVariants>;

export function ForgetPasswordForm({
  className,
  ...props
}: ForgetPasswordFormProps) {
  const t = useTranslations('Auth');

  const form = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<ForgetPasswordSchema> = async (formData) => {
    const data = await forgetPassWord({
      email: formData.email,
    });

    if (!data.success) {
      toast.error(data.msg ? data.msg : t('M8'));

      return;
    }

    toast.success(t('M42'), {
      duration: 10000,
      className: 'max-w-lg',
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
        className={forgetPasswordFormVariants({ className })}
      >
        {form.formState.isSubmitted ? (
          <div className="w-full space-y-4">
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-200 lg:text-base">
              {t('M44')}
            </p>
          </div>
        ) : (
          <div className="w-full space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{t('M9')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('M10')}
                      type="email"
                      {...field}
                      disabled={formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full"
              disabled={form.formState.isSubmitting}
              type="submit"
            >
              {t('M43')}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
