import { z } from 'zod';

export const contactSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});

export type ContactSchema = z.infer<typeof contactSchema>;
