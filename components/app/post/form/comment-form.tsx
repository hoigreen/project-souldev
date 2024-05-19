import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CommentSchema, commentSchema } from '@/lib/validations/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'next-auth';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { UploadMultipleFiles } from '../../upload-multi-files';
import { Image } from 'iconsax-react';
import { addComment } from '@/lib/actions/comment';
import toast from 'react-hot-toast';
import { useRouter } from '@/navigation';

type CommentFormProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  user?: User;
  postId: string;
  onCommentCreated?: () => void;
};

export default function CommentForm({
  user,
  postId,
  onCommentCreated,
}: CommentFormProps) {
  const t = useTranslations('Post');
  const [files, setFiles] = React.useState<File[]>([]);
  const [showAddImages, setShowAddImages] = React.useState<boolean>(false);
  const router = useRouter();

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
    },
  });

  if (!user) {
    return <> </>;
  }
  const onSubmit = async (values: CommentSchema) => {
    const formData = new FormData();
    formData.append('text', values.content);
    files.forEach((file) => {
      formData.append('image', file);
    });

    const response = await addComment({ postId }, formData);

    if (!response.success) {
      toast.error(t('M25'));
      return;
    }

    toast.success(t('M31'));

    handleCreatedComment();
    router.refresh();

    if (onCommentCreated) {
      onCommentCreated();
    }
  };

  const handleCreatedComment = () => {
    setFiles([]);
    setShowAddImages(false);
    reset();
  };

  return (
    <form
      className="flex items-start gap-3 px-3 py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Avatar className="size-10 border">
        <AvatarImage src={user.image} alt="Avatar" />
        <AvatarFallback>{user.first_name}</AvatarFallback>
      </Avatar>

      <div className="flex grow flex-col items-center gap-2">
        <div className="flex w-full gap-2">
          <div className="relative grow">
            <Input
              type="text"
              name="content"
              placeholder={t('M6')}
              className="size-full border-none"
              onChange={(e) => setValue('content', e.target.value)}
            />

            <Image // eslint-disable-line jsx-a11y/alt-text -- Image at here is icon
              className="absolute inset-y-1 right-2 size-8 rounded-full border bg-neutral-50 p-0.75"
              onClick={() => setShowAddImages(!showAddImages)}
            />
          </div>

          <Button
            className="hidden h-10 rounded-full md:block"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            {t('M7')}
          </Button>
        </div>

        {showAddImages && (
          <div className="flex w-full">
            <UploadMultipleFiles files={files} setFiles={setFiles} />
          </div>
        )}
      </div>
    </form>
  );
}
