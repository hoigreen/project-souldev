'use client';

import { useTranslations } from 'next-intl';
import { Edit2, Profile } from 'iconsax-react';
import React, { ChangeEvent, useEffect } from 'react';
import { Label } from '../ui/label';
import { cn, isBase64Image } from '@/lib/utils';
import { Input } from '../ui/input';
import { updateAvatar } from '@/lib/actions/users';
import { User } from 'next-auth';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import AvatarUser from '../ui/app/avatar-user';

export type UploadAvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  user: User;
};

export function UploadAvatar({ user, className, ...props }: UploadAvatarProps) {
  const [isHover, setIsHover] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const t = useTranslations('Home');
  const { update } = useSession();

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

  const handleUploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const imgRes = await updateAvatar({ _id: user._id }, formData);

    if (!imgRes.success) {
      toast.error(t('M15'));
      return;
    }

    toast.success(t('M47'));

    await update({ image: imgRes.userData.image });
  };

  useEffect(() => {
    setImageUrl(user.image);
  }, [user.image]);

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3',
        className,
      )}
      {...props}
    >
      <Label
        htmlFor="image"
        className="relative overflow-hidden rounded-full"
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        {imageUrl ? (
          <AvatarUser
            src={imageUrl}
            alt="Profile avatar"
            className="size-30"
            fallback={user.first_name}
          />
        ) : (
          <Profile
            className="size-30 rounded-full border bg-neutral-50 text-neutral-400"
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
              {t('M46')}
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
  );
}
