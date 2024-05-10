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

export default function UserOnboarding() {
  const t = useTranslations('Onboarding');
  const { update } = useSession();
  const { data: session } = useSession();
  const user = session?.user as User;

  const form = useForm<UserOnboardingSchema>({
    resolver: zodResolver(userOnboardingSchema),
    mode: 'onSubmit',
    defaultValues: {
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      mobile: user.mobile,
    },
  });

  // const handleSave = async (data: UserOnboardingSchema) => {
  //   const { error } = await createEmployerOnboarding({
  //     createCompanyInput: omitBy(
  //       newCompanyProfile,
  //       isNil,
  //     ) as CreateCompanyInput,
  //     updateRecruiterProfileInput: { isOnboardingCompleted: true },
  //   });

  //   if (error) {
  //     return toast.error(error.message || t('T_0418'));
  //   } else {
  //     update({ isOnboardingCompleted: true }).then(() => {
  //       setOnboardingCompleted(true);
  //     });
  //   }
  // };

  // const handleLogoChange = (id: string | null, logoUrl?: string) => {
  //   setLogoUrl(logoUrl ? logoUrl : '');
  //   id && setValue('logoId', id, { shouldValidate: true });
  // };

  // if (onboardingCompleted) {
  //   return <EmployerOnboardingWelcome />;
  // }

  const onSubmit = async (formData: UserOnboardingSchema) => {
    // const blob = formData.profile_photo;
    // const hasImageChanged = isBase64Image(blob);
    // if (hasImageChanged) {
    //   const imgRes = await startUpload(files);
    //   if (imgRes && imgRes[0].fileUrl) {
    //     formData.profile_photo = imgRes[0].fileUrl;
    //   }
    // }
    // await updateUser({
    //   name: formData.name,
    //   path: pathname,
    //   username: formData.username,
    //   userId: user.id,
    //   bio: formData.bio,
    //   image: formData.profile_photo,
    // });
    // if (pathname === "/profile/edit") {
    //   router.back();
    // } else {
    //   router.push("/");
    // }
  };

  // const handleImage = (
  //   e: ChangeEvent<HTMLInputElement>,
  //   fieldChange: (value: string) => void
  // ) => {
  //   e.preventDefault();

  //   const fileReader = new FileReader();

  //   if (e.target.files && e.target.files.length > 0) {
  //     const file = e.target.files[0];
  //     setFiles(Array.from(e.target.files));

  //     if (!file.type.includes("image")) return;

  //     fileReader.onload = async (event) => {
  //       const imageDataUrl = event.target?.result?.toString() || "";
  //       fieldChange(imageDataUrl);
  //     };

  //     fileReader.readAsDataURL(file);
  //   }
  // };

  return (
    <SectionContainer className="w-full space-y-6 md:max-w-3xl">
      <Heading size={2} title={t('M7')} subtitle={t('M8')} />

      {/* Avatar */}

      {/* Form */}
      <Form {...form}>
        <form
          className="space-3 md:space-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
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
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('M17')}</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder={t('M18')} {...field} />
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

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </SectionContainer>
  );
}
