'use client';

import { useTranslations } from 'next-intl';
import type { HTMLAttributes } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from '@/lib/validations/auth';
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
import { cn } from '@/lib/utils';
import { updatePassword } from '@/lib/actions/user';
import { useModalActions } from '@/hooks/use-modal';
import { Modals } from '@/lib/constants';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: LoginForm
 * ------------------------------------------------------------------------------------------------------------------ */

export type ChangePasswordFormProps = HTMLAttributes<HTMLElement>;

export function ChangePasswordForm({
  className,
  ...props
}: ChangePasswordFormProps) {
  const t = useTranslations('Auth');
  const { onClose } = useModalActions(Modals.ChangePassword);

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordSchema> = async (formData) => {
    const response = await updatePassword({ password: formData.new_password });

    if (!response.success) {
      toast.error(t('M58'));

      return;
    }

    toast.success(t('M59'));

    onClose();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
        className={cn('p-2', className)}
      >
        <div className="w-full space-y-5">
          <FormField
            control={form.control}
            name="current_password"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{t('M11')}</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 w-full"
                    placeholder={t('M12')}
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
            name="new_password"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{t('M47')}</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 w-full"
                    type="password"
                    placeholder={t('M48')}
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
                    className="h-12 w-full"
                    type="password"
                    placeholder={t('M50')}
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
            {t('M13')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
