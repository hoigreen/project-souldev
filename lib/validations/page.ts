import { z } from 'zod';
import { fileSchema, websiteUrlSchema } from '../constants';

export const createPageSchema = z.object({
  image: z.string().nullable(),
  file: fileSchema,
  name: z
    .string({
      required_error: 'Please enter the page name.',
    })
    .min(1, 'Please enter the page name.'),
  email: z
    .string({
      required_error: 'Please enter your email address.',
    })
    .min(1)
    .email({
      message: 'Please enter a valid email address.',
    }),
  phone: z
    .string({
      required_error: 'Phone is required!',
    })
    .min(10, 'Phone number is too short')
    .max(10, 'Phone number cannot be longer than 15 digits'),
  website: websiteUrlSchema,
  address: z.string(),
  description: z.string(),
});

export type CreatePageSchema = z.infer<typeof createPageSchema>;
