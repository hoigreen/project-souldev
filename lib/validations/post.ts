import { z } from 'zod';

export const postSchema = z.object({
  content: z
    .string({
      required_error: 'Please enter title.',
    })
    .min(1, 'Please enter title.'),
});

export type PostSchema = z.infer<typeof postSchema>;

export const commentSchema = z.object({
  content: z
    .string({
      required_error: 'Please enter comment.',
    })
    .min(1, 'Please enter comment.'),
});

export type CommentSchema = z.infer<typeof commentSchema>;
