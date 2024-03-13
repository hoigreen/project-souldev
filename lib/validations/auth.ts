import { z } from 'zod';

/* -----------------------------------------------------------------------------
 * Login Schema
 * -------------------------------------------------------------------------- */

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter your email address.',
    })
    .min(1)
    .email({
      message: 'Please enter a valid email address.',
    }),
  password: z
    .string({
      required_error: 'Please enter your password.',
    })
    .min(1, 'Please enter your password.'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
