'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { register } from '@/lib/actions';
import { SignupSchema, signupSchema } from '@/lib/validations/auth';
import { useRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { VariantProps, cva } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import { HTMLAttributes, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: SignUpForm
 * ------------------------------------------------------------------------------------------------------------------ */

const signUpFormVariants = cva('gap-7.5 flex w-full flex-col md:gap-10');

export type SignUpFormProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof signUpFormVariants>;

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignupSchema>({
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      phone: '',
    },
    mode: 'all',
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupSchema> = async (formData) => {
    const data = await register(formData);

    if (!data.success) {
      toast.error(t('M20'));

      return;
    }

    toast.success(t('M21'));

    startTransition(() => {
      router.push('/auth/sign-in');
    });
  };

  return (
    <div {...props} className={signUpFormVariants({ className })}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full space-y-5">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{t('M22')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('M23')}
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
              name="last_name"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{t('M24')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('M25')}
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
              name="phone"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>{t('M26')}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t('M27')}
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
                      type="password"
                      placeholder={t('M12')}
                      {...field}
                      disabled={formState.isSubmitting || isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full"
              data-testid="submit"
              disabled={!form.formState.isValid || isPending}
              type="submit"
            >
              {t('M3')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}