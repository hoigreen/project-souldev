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
import toast from 'react-hot-toast';
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from '@/lib/validations/auth';
import { useRouter } from '@/navigation';
import { resetPassWord } from '@/lib/actions/users';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: ResetPasswordForm
 * ------------------------------------------------------------------------------------------------------------------ */

const resetPasswordFormVariants = cva('flex w-full flex-col gap-7.5 md:gap-10');

export type ResetPasswordFormProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof resetPasswordFormVariants> & {
    resetToken: string;
  };

export function ResetPasswordForm({
  className,
  resetToken,
  ...props
}: ResetPasswordFormProps) {
  const t = useTranslations('Auth');
  const router = useRouter();

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      resetToken,
      password: '',
      confirm_password: '',
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = async (formData) => {
    const data = await resetPassWord({
      token: resetToken,
      password: formData.password,
    });

    if (!data.success) {
      toast.error(data.msg ? data.msg : t('M8'));

      return;
    }

    toast.success(t('M63'), {
      duration: 10000,
      className: 'max-w-lg',
    });

    setTimeout(() => {
      router.replace('/auth/sign-in');
    }, 5000);

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
        className={resetPasswordFormVariants({ className })}
      >
        <div className="w-full space-y-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{t('M47')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('M48')}
                    type="password"
                    {...field}
                    disabled={formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{t('M49')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('M50')}
                    type="password"
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
            {t('M52')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
