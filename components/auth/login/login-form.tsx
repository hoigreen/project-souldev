'use client';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputPassword,
} from '@codefixlabs/ui';
import { VariantProps, cva } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import { HTMLAttributes } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { login } from '@/lib/actions';
import cookie from '@/lib/cookie';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: LoginForm
 * ------------------------------------------------------------------------------------------------------------------ */

const loginFormVariants = cva('');

export type LoginFormProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof loginFormVariants>;

export function LoginForm({ className, ...props }: LoginFormProps) {
  const t = useTranslations('Auth');

  const loginSchema = z.object({
    email: z.string().email(t('M4')),
    password: z
      .string({ required_error: t('M5') })
      .min(8, t('M6'))
      .max(16, t('M7')),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (
    formData,
  ) => {
    const {
      data: { token },
      error,
    } = await login({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast.error(
        error.message === 'Invalid account' ? t('T_0975') : error.message,
      );

      return;
    }

    cookie.set(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string, token, 7);
  };

  return (
    <div {...props} className={loginFormVariants({ className })}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-5 space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{t('M9')}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t('M10')}
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
              name="password"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{t('T_0978')}</FormLabel>
                  <FormControl>
                    <InputPassword
                      placeholder={t('T_0979')}
                      {...field}
                      disabled={formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* <div className="mt-3">
            <p className="text-sm text-neutral-600">
              <Link
                className="text-info-600 font-medium hover:underline"
                href="/auth/company/forgot-password"
              >
                {t('T_0977')}
              </Link>
            </p>
          </div> */}

          <div className="mt-8">
            <Button block type="submit" loading={form.formState.isSubmitting}>
              {t('T_0976')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
