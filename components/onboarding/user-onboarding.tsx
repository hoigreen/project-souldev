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
import Image from 'next/image';
import { Edit2, Profile } from 'iconsax-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { cn, isBase64Image } from '@/lib/utils';
import toast from 'react-hot-toast';
import { updateAvatar } from '@/lib/actions';
import { Label } from '../ui/label';

export default function UserOnboarding() {
  const [isHover, setIsHover] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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

  const onSubmit = async (formData: UserOnboardingSchema) => {
    // if (file) {
    //   console.log(imgRes)
    //   if (!imgRes.success) {
    //     toast.error(t('M26'));
    //     return
    //   }
    // }
    // const response = await completeOnboarding({
    //   ...formData,
    //   isOnboardingCompleted: true,
    // });
    // if (!response.success) {
    //   return toast.error(t('M24'));
    // } else {
    // await update({ isOnboar: true })
    // }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!file.type.includes('image')) return;

      fileReader.onload = () => {
        const base64 = fileReader.result as string;
        if (isBase64Image(base64)) {
          setImageUrl(base64);
        }
        handleUploadImage(file);
      };

      fileReader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setImageUrl(user.image);
  }, []);

  const handleUploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const imgRes = await updateAvatar({ _id: user._id }, formData);

    if (!imgRes.success) {
      toast.error(t('M26'));
      return;
    }

    toast.success(t('M25'));

    await update({ image: imgRes.userData.image });
  };

  return (
    <SectionContainer className="w-full space-y-6 pb-8 md:max-w-3xl md:pb-0">
      <Heading size={2} title={t('M7')} subtitle={t('M8')} />

      {/* Avatar */}
      <div
        className=" flex flex-col items-center justify-center gap-3"
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        <Label
          htmlFor="image"
          className="relative overflow-hidden rounded-full"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="profile"
              width={120}
              height={120}
              priority
              className="aspect-square border object-fill"
            />
          ) : (
            <Profile
              className="h-30 w-30 rounded-full border bg-neutral-50 text-neutral-400"
              variant="Bold"
            />
          )}
          <div
            className={cn(
              'absolute bottom-0 z-10 flex w-full items-center justify-center gap-1 text-neutral-100',
              'top-2/3',
              isHover ? 'bg-neutral-800/70 opacity-100' : 'opacity-0',
            )}
          >
            <Edit2 variant="TwoTone" size={16} />
            {isHover && (
              <span className="text-xs font-semibold text-background">
                {t('M23')}
              </span>
            )}
          </div>
        </Label>

        <Input
          id="image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImage(e)}
        />
      </div>

      {/* Form */}
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

          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </SectionContainer>
  );
}
