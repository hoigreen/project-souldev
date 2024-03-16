'use client';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import type { HTMLAttributes } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { login } from '@/lib/actions';
import cookie from '@/lib/cookie';
import GOOGLE_SVG from '@/public/google.svg';
import type { LoginSchema } from '@/lib/validations/auth';
import { loginSchema } from '@/lib/validations/auth';
import { useSignInWithCredential } from '@/hooks/use-sign-in-with-credential';
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

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: LoginForm
 * ------------------------------------------------------------------------------------------------------------------ */

const loginFormVariants = cva('gap-7.5 flex w-full flex-col md:gap-10');

export type LoginFormProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof loginFormVariants>;

export function LoginForm({ className, ...props }: LoginFormProps) {
  const t = useTranslations('Auth');
  const { signInWithCredential } = useSignInWithCredential();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (formData) => {
    const data = await login({
      email: formData.email,
      password: formData.password,
    });

    if (!data.success) {
      toast.error(t('M8'));

      return;
    }

    cookie.set(
      process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string,
      data.data.token,
      7,
    );

    await signInWithCredential(formData);
  };

  return (
    <div {...props} className={loginFormVariants({ className })}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5">
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

            <FormField
              control={form.control}
              name="password"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{t('M11')}</FormLabel>
                  <FormControl>
                    <Input
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
            <Button disabled={form.formState.isSubmitting} type="submit">
              {t('M13')}
            </Button>
          </div>
          <div className="flex items-center justify-end">
            <Link
              className="mt-4 text-center text-sm font-semibold text-green-500"
              href=""
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
        <Button className="flex-1" variant="outline">
          <Image alt="Google" height={20} src={GOOGLE_SVG} width={20} />
          {t('M15')}
        </Button>
      </div>
    </div>
  );
}
