'use client';

import {
  UserOnboardingSchema,
  userOnboardingSchema,
} from '@/lib/validations/onboarding';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { SectionContainer } from './section-container';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Heading } from '../app/heading';
import { useTransition } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from '@/navigation';
import { completeOnboarding } from '@/lib/actions/user';
import { UploadAvatar } from '../app/upload-avatar';
import { createProfile } from '@/lib/actions/profile';

export default function UserOnboarding() {
  const t = useTranslations('Onboarding');
  const { update } = useSession();
  const { data: session } = useSession();
  const user = session?.user as User;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UserOnboardingSchema>({
    resolver: zodResolver(userOnboardingSchema),
    mode: 'onSubmit',
    defaultValues: {
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      mobile: user.mobile,
    },
  });

  const onSubmit = async (formData: UserOnboardingSchema) => {
    const response = await completeOnboarding(
      { _id: user._id },
      {
        ...formData,
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        mobile: formData.mobile.trim(),
        isOnboardingCompleted: true,
      },
    );

    if (!response.success) {
      toast.error(t('M24'));

      return;
    }

    await createProfile();
    await update({ isOnboardingCompleted: true });

    startTransition(() => {
      toast.success(t('M26'));
      router.push('/home');
    });
  };

  return (
    <SectionContainer className="w-full space-y-6 pb-8 md:max-w-3xl md:pb-0">
      <Heading size={2} title={t('M7')} subtitle={t('M8')} />

      <UploadAvatar user={user} />

      <Form {...form}>
        <form
          className="space-y-3 md:space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>{t('M9')}</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder={t('M10')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>{t('M11')}</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder={t('M12')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('M13')}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder={t('M14')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('M15')}</FormLabel>
                <FormControl>
                  <Textarea rows={10} placeholder={t('M16')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('M19')}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder={t('M20')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('M21')}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder={t('M22')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              loading={isPending || form.formState.isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </SectionContainer>
  );
}
