'use client';

import { Editor } from '@/components/ui/app/editor';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createPost } from '@/lib/actions/posts';
import { ActionPost } from '@/lib/definitions';
import { htmlToMarkdown, markdownToHTML } from '@/lib/markdown';
import { cn } from '@/lib/utils';
import { PostSchema, postSchema } from '@/lib/validations/post';
import { usePathname, useRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { UploadMultipleFiles } from '../../upload-multi-files';

type PostFormProps = {
  action: ActionPost;
  postId?: string;
  className?: string;
  initialData?: string;
  onPostCreated?: () => void;
};

export default function PostForm({
  action,
  postId,
  className,
  initialData,
  onPostCreated,
}: PostFormProps): React.JSX.Element {
  const [files, setFiles] = React.useState<File[]>([]);
  const t = useTranslations('Post');
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: initialData,
    },
  });

  const onSubmit = async (values: PostSchema) => {
    const formData = new FormData();
    formData.append('content', values.content);
    files.forEach((file) => {
      formData.append('image', file);
    });

    if (action === ActionPost.Create) {
      await createPost(formData);
    } else {
      // await editThread({
      //   threadId,
      //   text: values.thread,
      //   path: pathname,
      // });
    }

    startTransition(() => {
      router.replace('/home');
      router.prefetch('/home');
    });

    if (onPostCreated) {
      onPostCreated();
    }
  };

  return (
    <form
      className={cn('space-y-4', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <Label htmlFor="content">{t('M32')}</Label>
        <Editor
          placeholder="Write something..."
          className=""
          value={markdownToHTML(getValues('content'))}
          onChange={(value) => {
            setValue('content', htmlToMarkdown(value) || '');
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">{t('M34')}</Label>
        <UploadMultipleFiles files={files} setFiles={setFiles} />
      </div>

      <Button type="submit" size="lg" disabled={isPending || isSubmitting}>
        {postId ? t('M16') : t('M11')}
      </Button>
    </form>
  );
}
