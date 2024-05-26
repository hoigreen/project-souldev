import React from 'react';
import { Like, Locale, Share, UserProfile } from '@/lib/definitions';
import { useLocale, useTranslations } from 'next-intl';
import PostCard from './post-card';
import AvatarUser from '@/components/ui/app/avatar-user';
import { useSession } from 'next-auth/react';
import { ErrorStage, ErrorStageType } from '../error-stage';
import { calculateTime, cn, getFullName } from '@/lib/utils';
import { Clock } from 'iconsax-react';
import toast from 'react-hot-toast';

export type SharedPostCardProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  content?: string;
  author: UserProfile;
  created?: string;
  likes: Like[];
  currentUserId: string;
  images: string[];
  shares: Share[];
};

export default function ShardPostCard({
  className,
  id,
  content,
  author,
  created,
  likes,
  currentUserId,
  images,
  shares,
}: SharedPostCardProps): React.JSX.Element {
  const locale = useLocale();
  const t = useTranslations('Home');
  const { data: session } = useSession();

  const user = session?.user;

  if (!user) return <ErrorStage stage={ErrorStageType.Unauthorized} />;

  const infoShare = shares.find((share) => share.user_id === user._id);

  const handleClickShare = () => {
    toast.error(t('M30'));
  };

  return (
    <div
      className={cn(
        'clear-start space-y-3 rounded-lg bg-white px-3 py-4 dark:bg-black',
        className,
      )}
    >
      <div className="flex gap-2">
        <AvatarUser
          src={user.image}
          alt="User"
          fallback={user.first_name}
          className="size-15"
        />
        <div className="space-y-3">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold md:text-base">
              {getFullName(user.first_name, user.last_name)}
            </h4>
            <span className="flex items-center gap-2 text-xs font-light italic">
              <Clock className="size-3" variant="TwoTone" />
              {infoShare?.createdAt
                ? calculateTime(infoShare.createdAt, locale as Locale)
                : t('M8')}
            </span>
          </div>

          <p className="text-sm">{infoShare?.description}</p>
        </div>
      </div>

      <PostCard
        className="border"
        id={id}
        content={content}
        author={author}
        created={created}
        likes={likes}
        currentUserId={currentUserId}
        images={images}
        shares={shares}
        onClickShare={handleClickShare}
      />
    </div>
  );
}
