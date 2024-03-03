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
import { redirect } from '@/navigation';
import GOOGLE_SVG from '@/public/google.svg';
import Image from 'next/image';
import Link from 'next/link';
/* ---------------------------------------------------------------------------------------------------------------------
 * Component: LoginForm
 * ------------------------------------------------------------------------------------------------------------------ */

const loginFormVariants = cva('flex w-full flex-col gap-7.5');

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
        error.message === 'Invalid account' ? t('M8') : error.message,
      );

      return;
    }

    cookie.set(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string, token, 7);
    redirect('/');
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
                  <FormLabel>{t('M11')}</FormLabel>
                  <FormControl>
                    <InputPassword
                      placeholder={t('M12')}
                      {...field}
                      disabled={formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-8">
            <Button block type="submit" loading={form.formState.isSubmitting}>
              {t('M13')}
            </Button>
          </div>
          <div className="flex items-center justify-end">
            <Link
              href={''}
              className="mt-4 text-center text-sm font-semibold text-green-500"
            >
              {t('M16')}
            </Link>
          </div>
        </form>
      </Form>

      <div className="flex items-center gap-3 px-2">
        <div className="h-[1px] w-full flex-1 border" />
        <span className="text-base font-bold uppercase text-neutral-400">
          {t('M14')}
        </span>
        <div className="h-[1px] w-full flex-1 border" />
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          className="flex-1"
          startIcon={
            <Image src={GOOGLE_SVG} alt="Google" width={20} height={20} />
          }
        >
          {t('M15')}
        </Button>
      </div>
    </div>
  );
}
