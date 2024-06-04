'use client';

import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import { Heading } from '@/components/app/heading';
import { UploadAvatar } from '@/components/app/upload-avatar';
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
import { Textarea } from '@/components/ui/textarea';
import { updateInfoBasic } from '@/lib/actions/user';
import { UserProfile } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import {
  ProfileBasicSchema,
  profileBasicSchema,
} from '@/lib/validations/profile';
import { useRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileTick } from 'iconsax-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useCallback, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function ProfileBasicInfoForm({
  className,
  initialData,
}: {
  className?: string;
  initialData: UserProfile;
}): React.JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('Home');
  const { data: session } = useSession();
  const user = session?.user as User;

  const form = useForm<ProfileBasicSchema>({
    defaultValues: {
      bio: initialData.bio,
      facebook: initialData.facebook,
      first_name: initialData.first_name,
      github: initialData.github,
      last_name: initialData.last_name,
      mobile: initialData.mobile,
    },
    resolver: zodResolver(profileBasicSchema),
  });

  const handleSubmit = useCallback<SubmitHandler<ProfileBasicSchema>>(
    async (values): Promise<void> => {
      try {
        const response = await updateInfoBasic(values);

        if (!response.success) {
          toast.error(t('M15'));
          return;
        }

        startTransition(() => {
          toast.success(t('M48'));
          router.refresh();
        });
      } catch (error) {
        toast.error(t('M15'));
      }
    },
    [t, router],
  );

  if (!user) {
    return <ErrorStage stage={ErrorStageType.Unauthorized} />;
  }

  return (
    <Form {...form}>
      <form
        className={cn(
          'space-y-8 rounded-lg bg-white p-4 shadow-lg dark:bg-neutral-950',
          className,
        )}
        onSubmit={
          form.handleSubmit(
            handleSubmit,
          ) as React.FormEventHandler<HTMLFormElement>
        }
      >
        <div className="flex items-center justify-between">
          <Heading size={1} title={t('M31')} />

          <div className="flex items-center gap-2">
            <Button type="submit" className="flex items-center">
              <ProfileTick
                variant="TwoTone"
                className="hidden size-6 md:block"
              />
              {t('M32')}
            </Button>

            {form.formState.isDirty && (
              <Button variant="outline" onClick={() => form.reset()}>
                {t('M33')}
              </Button>
            )}
          </div>
        </div>

        <UploadAvatar user={user} />

        <div className="w-full gap-4 space-y-3 md:grid md:grid-cols-2 md:space-y-0">
          {/* First name */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{t('M34')}</FormLabel>
                <FormControl>
                  <Input
                    className="h-14 rounded-lg"
                    placeholder={t('M35')}
                    {...field}
                    disabled={isPending || formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last name */}
          <FormField
            control={form.control}
            name="last_name"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{t('M36')}</FormLabel>
                <FormControl>
                  <Input
                    className="h-14 rounded-lg"
                    placeholder={t('M37')}
                    {...field}
                    disabled={isPending || formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Facebook */}
          <FormField
            control={form.control}
            name="facebook"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{t('M38')}</FormLabel>
                <FormControl>
                  <Input
                    className="h-14 rounded-lg"
                    placeholder={t('M39')}
                    {...field}
                    disabled={isPending || formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Github link */}
          <FormField
            control={form.control}
            name="github"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{t('M40')}</FormLabel>
                <FormControl>
                  <Input
                    className="h-14 rounded-lg"
                    placeholder={t('M41')}
                    {...field}
                    disabled={isPending || formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone number */}
          <FormField
            control={form.control}
            name="mobile"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>{t('M42')}</FormLabel>
                <FormControl>
                  <Input
                    className="h-14 rounded-lg"
                    disabled={isPending || formState.isSubmitting}
                    type="text"
                    placeholder={t('M43')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('M44')}</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder={t('M45')}
                    className="rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
