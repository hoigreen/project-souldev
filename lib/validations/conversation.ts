import { z } from 'zod';

export const messageSchema = z.object({
  text: z
    .string({ required_error: 'Please input your message' })
    .min(1, 'Please input your message'),
});

export type MessageSchema = z.infer<typeof messageSchema>;
