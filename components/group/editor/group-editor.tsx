'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CreateGroupSchema, createGroupSchema } from '@/lib/validations/group';
import { useRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export function GroupEditor({
  className,
  preview,
}: {
  className?: string;
  preview?: React.ReactNode;
}): React.JSX.Element {
  const t = useTranslations('Home');
  const router = useRouter();

  const form = useForm<CreateGroupSchema>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(createGroupSchema),
  });

  const handleSubmit: SubmitHandler<CreateGroupSchema> = async (values) => {
    //   const { data, error } = await createJob(input);
    //   if (error) {
    //     console.log(error);
    //     toast.error(t('T_0418'));
    //     return;
    //   }
    //   toast.success(t('T_1068'));
    //   push(
    //     queryString.stringifyUrl({
    //       url: '/company',
    //       query: {
    //         jobId: data?.createJob?.id,
    //       },
    // }),
    // );
  };

  return (
    <Form {...form}>
      <div className={cn('space-y-8', className)}>
        <Card className="mx-auto w-full max-w-lg p-3 md:p-4">
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2 md:space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field, formState }) => (
                <FormItem className="space-y-2">
                  <FormLabel>{t('M146')}</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12"
                      placeholder={t('M147')}
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
              {t('M131')}
            </Button>
          </form>
        </Card>

        <Card className="p-3 md:p-4">
          <div className="rounded-lg border bg-neutral-50">{preview}</div>
        </Card>
      </div>
    </Form>
  );
}
