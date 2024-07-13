'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SharePostSchema, sharePostSchema } from '@/lib/validations/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from '@/navigation';
import { useSession } from 'next-auth/react';
import { sharePost } from '@/lib/actions/post';
import { Textarea } from '@/components/ui/textarea';
import { getFullName } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import PostCard from '../post-card';
import { ErrorStage, ErrorStageType } from '@/components/app/error-stage';
import useQueryPost from '@/hooks/use-query-post';
import { SharePostFormLoading } from '../loading';

type SharePostFormProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  postId: string;
  onSharedSuccess?: () => void;
};

export default function SharePostForm({
  postId,
  onSharedSuccess,
}: SharePostFormProps) {
  const t = useTranslations('Home');
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SharePostSchema>({
    resolver: zodResolver(sharePostSchema),
  });

  const { data, isLoading } = useQueryPost({ postId });

  if (!user) {
    return <SharePostFormLoading />;
  }

  if (isLoading) {
    return <SharePostFormLoading />;
  }

  if (!data) {
    return <ErrorStage stage={ErrorStageType.ServerError} />;
  }

  const onSubmit = async (values: SharePostSchema) => {
    const response = await sharePost({ postId }, values);

    if (!response.success) {
      toast.error(t('M15'));
      return;
    }

    toast.success(t('M16'));

    router.refresh();
    onSharedSuccess && onSharedSuccess();
  };

  return (
    <form
      className="space-y-2 md:space-y-4 lg:p-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-3">
        <Avatar className="size-10 border">
          <AvatarImage src={user.image} alt="Avatar" />
          <AvatarFallback>{user.first_name}</AvatarFallback>
        </Avatar>

        <p className="text-base font-semibold lg:text-lg">
          {getFullName(user.first_name, user.last_name)}
        </p>
      </div>

      <div className="relative">
        <div className="relative grow">
          <Textarea
            name="description"
            placeholder={t('M17')}
            className="size-full border-none"
            onChange={(e) => setValue('description', e.target.value)}
            rows={8}
          />
        </div>

        <Button
          className="absolute bottom-2 right-2 h-10 rounded-full md:block"
          size="lg"
          type="submit"
          disabled={isSubmitting}
        >
          {t('M7')}
        </Button>
      </div>

      <Card className="p-3">
        <PostCard
          id={data.post_data._id}
          likes={data.post_data.likes}
          group={data.post_data.group_id}
          content={data.post_data.content}
          author={data.post_data.user_id}
          created={data.post_data.created}
          images={data.post_data.images}
          currentUserId={user._id}
          shares={data.post_data.shares}
        />
      </Card>
    </form>
  );
}
