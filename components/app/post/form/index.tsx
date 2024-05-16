'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { createPost } from '@/lib/actions/posts';
import { ActionPost } from '@/lib/definitions';
import { PostSchema, postSchema } from '@/lib/validations/post';
import { usePathname, useRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';

type PostFormProps = {
  action: ActionPost;
};

export default function PostForm({ action }: PostFormProps): React.JSX.Element {
  const [files, setFiles] = React.useState<File[]>([]);
  const t = useTranslations('Post');
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (values: PostSchema) => {
    const formData = new FormData();
    formData.append('content', values.content);
    formData.append('image', files[0]);

    if (action === ActionPost.Create) {
      await createPost(formData);
    } else {
      // await editThread({
      //   threadId,
      //   text: values.thread,
      //   path: pathname,
      // });
    }

    router.push('/home');
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-light-2 text-base font-semibold">
                Content
              </FormLabel>
              <FormControl className="no-focus border-dark-4 bg-dark-3 text-light-1 border">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="">
          Create
          {/* {threadId ? "Edit" : "Create"} Thread */}
        </Button>
      </form>
    </Form>
  );
}
