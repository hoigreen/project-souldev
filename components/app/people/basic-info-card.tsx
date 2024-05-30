'use client';

import { AuthType, Profile } from '@/lib/definitions';
import React from 'react';
import { cn, getFullName } from '@/lib/utils';
import {
  GitCommitHorizontal,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  PhoneCall,
} from 'lucide-react';
import { TickCircle } from 'iconsax-react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import AvatarUser from '@/components/ui/app/avatar-user';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ViewImageDialog } from '@/components/ui/dialogs/view-image-dialog';

type BasicInfoCardProps = React.HTMLAttributes<HTMLDivElement> & {
  profile: Profile;
};

export default function BasicInfoCard({
  className,
  profile,
  ...props
}: BasicInfoCardProps) {
  const t = useTranslations('Home');

  const basicInfo = [
    {
      icon: PhoneCall,
      text: profile.user_id.mobile,
    },
    {
      icon: Mail,
      text: profile.user_id.email,
    },
    {
      icon: MapPin,
      text: 'Ho Chi Minh',
    },
    {
      icon: Globe,
      text: profile.website,
    },
    {
      icon: Linkedin,
      text: profile.linkedIn,
    },
    {
      icon: GitCommitHorizontal,
      text: profile.user_id.github,
    },
  ];

  return (
    <Card className={cn('space-y-6 p-4 md:p-6', className)} {...props}>
      <div className="flex flex-col justify-center gap-3 md:gap-4">
        <div className="relative mx-auto">
          {profile.user_id.image ? (
            <ViewImageDialog src={profile.user_id.image} alt="Profile">
              <AvatarUser
                src={profile.user_id.image}
                alt="profile"
                fallback={profile.user_id.first_name}
                className="size-36 border md:size-48"
              />
            </ViewImageDialog>
          ) : (
            <AvatarUser
              src={profile.user_id.image}
              alt="profile"
              fallback={profile.user_id.first_name}
              className="size-36 border md:size-48"
            />
          )}
          <span className="absolute bottom-1 right-2">
            <TickCircle variant="Bold" className="size-8 text-green-500" />
          </span>
        </div>

        {profile.user_id.authType !== AuthType.Local && (
          <Badge
            variant="success"
            className="mx-auto flex w-fit items-center gap-1"
          >
            {t('M26')}
            <span className="capitalize">{profile.user_id.authType}</span>
          </Badge>
        )}

        <h2 className="text-center text-2xl font-bold md:text-3xl lg:text-4xl">
          {getFullName(profile.user_id.first_name, profile.user_id.last_name)}
        </h2>
      </div>

      <div className="space-y-2">
        <Label className="md:hidden">{t('M31')}</Label>
        <div className="mx-auto w-full space-y-1 md:grid md:max-w-lg md:grid-cols-2 md:place-items-center md:gap-2 md:space-y-0 lg:max-w-3xl">
          {basicInfo.map(
            (info, index) =>
              info.text && (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm md:text-base"
                >
                  {info.icon && <info.icon className="size-4 md:size-5" />}
                  <span>{info.text}</span>
                </div>
              ),
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-1 md:mx-auto md:max-w-md md:gap-2">
        <Button className="w-full">{t('M53')}</Button>
        <Button className="w-full" variant="outline">
          {t('M52')}
        </Button>
      </div>
    </Card>
  );
}
