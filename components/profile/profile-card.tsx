import { AuthType, Profile } from '@/lib/definitions';
import React from 'react';
import { Card } from '../ui/card';
import { cn, getFullName } from '@/lib/utils';
import AvatarUser from '../ui/app/avatar-user';
import { Mail, PhoneCall } from 'lucide-react';
import { Link } from '@/navigation';
import { Setting2, TickCircle } from 'iconsax-react';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';

type ProfileCardProps = React.HTMLAttributes<HTMLDivElement> & {
  profile: Profile;
  countPosts: number;
};

export default function ProfileCard({
  className,
  profile,
  countPosts,
  ...props
}: ProfileCardProps) {
  const t = useTranslations('Home');

  return (
    <Card className={cn('space-y-6 p-4 md:p-6', className)} {...props}>
      <div className="flex flex-col-reverse gap-4 md:flex-row md:items-start md:justify-between md:gap-0">
        <div className="flex gap-3 md:gap-4 lg:gap-6">
          <div className="relative">
            <AvatarUser
              src={profile.user_id.image}
              alt="profile"
              fallback={profile.user_id.first_name}
              className="size-28 md:size-36"
            />
            <span className="absolute bottom-1 right-2">
              <TickCircle variant="Bold" className="size-8 text-green-500" />
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold md:text-2xl lg:text-3xl xl:text-4xl">
              {getFullName(
                profile.user_id.first_name,
                profile.user_id.last_name,
              )}
            </h2>
            <p className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
              <Mail className="size-4" />
              {profile.user_id.email}
            </p>
            <p className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
              <PhoneCall className="size-4" />
              {profile.user_id.mobile}
            </p>

            {profile.user_id.authType !== AuthType.Local && (
              <Badge
                variant="success"
                className="flex w-fit items-center gap-1"
              >
                {t('M26')}
                <span className="capitalize">{profile.user_id.authType}</span>
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 md:gap-4">
          <Link href="/profile/edit">
            <Button size="lg">{t('M20')}</Button>
          </Link>

          <Link href="/account-setting">
            <Setting2 variant="TwoTone" size={26} />
          </Link>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-6 md:flex-row md:justify-between md:gap-0">
        {profile.user_id.bio && (
          <div className="w-full max-w-md space-y-2">
            <Label>{t('M21')}</Label>
            <p className="text-base">{profile.user_id.bio}</p>
          </div>
        )}

        <div className="flex items-center gap-4 md:gap-6">
          <p className="text-xs sm:text-sm md:text-base">
            <span className="text-lg font-semibold">{countPosts}</span>{' '}
            {t('M22')}
          </p>
          <p className="text-xs sm:text-sm md:text-base">
            <span className="text-lg font-semibold">
              {profile.friends.length}
            </span>{' '}
            {t('M25')}
          </p>
          <p className="text-xs sm:text-sm md:text-base">
            <span className="text-lg font-semibold">
              {profile.followers.length}
            </span>{' '}
            {t('M23')}
          </p>
          <p className="text-xs sm:text-sm md:text-base">
            <span className="text-lg font-semibold">
              {profile.followings.length}
            </span>{' '}
            {t('M24')}
          </p>
        </div>
      </div>
    </Card>
  );
}
