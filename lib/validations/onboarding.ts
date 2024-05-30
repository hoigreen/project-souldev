import { z } from 'zod';
import { facebookUrlSchema, githubUrlSchema } from '../constants';

export const userOnboardingSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(128),
  last_name: z.string().min(1, 'Last name is required').max(128),
  mobile: z.string().min(1, 'M4'),
  facebook: facebookUrlSchema,
  github: githubUrlSchema,
  bio: z.string().optional(),
});

export type UserOnboardingSchema = z.infer<typeof userOnboardingSchema>;
