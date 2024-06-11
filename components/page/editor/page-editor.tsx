'use client';

import { Heading } from '@/components/app/heading';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createPage, updatePage } from '@/lib/actions/page';
import { Page } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { CreatePageSchema, createPageSchema } from '@/lib/validations/page';
import { useRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function PageEditor({
  className,
  classNames,
  initialData,
  preview,
}: {
  className?: string;
  classNames?: {
    form?: string;
    preview?: string;
  };
  initialData?: Page;
  preview?: React.ReactNode;
}): React.JSX.Element {
  const t = useTranslations('Home');
  const router = useRouter();

  const form = useForm<CreatePageSchema>({
    defaultValues: {
      name: initialData?.name ?? '',
      image: (initialData?.image_page && initialData?.image_page[0]) ?? '',
      file: undefined,
      email: initialData?.email,
      phone: initialData?.phone,
      website: initialData?.website,
      address: initialData?.address,
      description: initialData?.description,
    },
    resolver: zodResolver(createPageSchema),
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    form.setValue('file', file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const image = e.target?.result;

      if (image && typeof image === 'string') {
        form.setValue('image', image);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit: SubmitHandler<CreatePageSchema> = async (values) => {
    const formData = new FormData();

    formData.append('name', values.name);
    values.image && formData.append('image', values.image);
    values.file && formData.append('image', values.file);

    if (initialData) {
      const response = await updatePage({ pageId: initialData?._id }, formData);

      if (!response.success) {
        toast.error(t('M15'));

        return;
      }

      toast.success(t('M159'));
    } else {
      const response = await createPage(formData);

      if (!response.success) {
        toast.error(t('M15'));

        return;
      }

      toast.success(t('M192'));
    }

    form.reset();
    router.refresh();
  };

  return (
    <Form {...form}>
      <div className={cn('space-y-8', className)}>
        <Card
          className={cn(
            'static z-10 mx-auto w-full max-w-lg p-3 md:p-4 xl:fixed xl:bottom-2 xl:right-2 xl:max-w-md',
            classNames?.form,
          )}
        >
          <Heading title={t('M180')} size={1} />

          <div className="mt-3 space-y-2 py-2">
            <Label>{t('M180')}</Label>
            <Input
              type="file"
              className="h-12"
              disabled={form.formState.isSubmitting}
              onChange={handleChangeImage}
            />
          </div>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2 md:space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field, formState }) => (
                <FormItem className="space-y-2">
                  <FormLabel required>{t('M181')}</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12"
                      placeholder={t('M182')}
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
                <FormItem className="space-y-2">
                  <FormLabel required>{t('M185')}</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12"
                      placeholder={t('M186')}
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
                <FormItem className="space-y-2">
                  <FormLabel>{t('M187')}</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12"
                      placeholder={t('M188')}
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
              name="website"
              render={({ field, formState }) => (
                <FormItem className="space-y-2">
                  <FormLabel>{t('M183')}</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12"
                      placeholder={t('M184')}
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
              name="address"
              render={({ field, formState }) => (
                <FormItem className="space-y-2">
                  <FormLabel>{t('M66')}</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12"
                      placeholder={t('M75')}
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
              name="description"
              render={({ field, formState }) => (
                <FormItem className="space-y-2">
                  <FormLabel>{t('M86')}</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={8}
                      spellCheck
                      className="h-12"
                      placeholder={t('M87')}
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

        <Card className={cn('p-3 md:p-4', classNames?.preview)}>{preview}</Card>
      </div>
    </Form>
  );
}
