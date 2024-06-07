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
import { Label } from '@/components/ui/label';
import { createGroup, updateGroup } from '@/lib/actions/group';
import { Group } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { CreateGroupSchema, createGroupSchema } from '@/lib/validations/group';
import { useRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function GroupEditor({
  className,
  initialData,
  preview,
}: {
  className?: string;
  initialData?: Group;
  preview?: React.ReactNode;
}): React.JSX.Element {
  const t = useTranslations('Home');
  const router = useRouter();

  const form = useForm<CreateGroupSchema>({
    defaultValues: {
      name: initialData?.name ?? '',
      image: (initialData?.image_group && initialData?.image_group[0]) ?? '',
      file: undefined,
    },
    resolver: zodResolver(createGroupSchema),
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

  const handleSubmit: SubmitHandler<CreateGroupSchema> = async (values) => {
    const formData = new FormData();

    formData.append('name', values.name);
    values.image && formData.append('image', values.image);
    values.file && formData.append('image', values.file);

    if (initialData) {
      const response = await updateGroup(
        { groupId: initialData?._id },
        formData,
      );

      if (!response.success) {
        toast.error(t('M15'));

        return;
      }

      toast.success(t('M159'));
    } else {
      const response = await createGroup(formData);

      if (!response.success) {
        toast.error(t('M15'));

        return;
      }

      toast.success(t('M153'));
    }

    form.reset();
    router.refresh();
  };

  return (
    <Form {...form}>
      <div className={cn('space-y-8', className)}>
        <Card className="mx-auto w-full max-w-lg p-3 md:p-4">
          <div className="space-y-2">
            <Label>{t('M152')}</Label>
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

        <Card className="p-3 md:p-4">{preview}</Card>
      </div>
    </Form>
  );
}
