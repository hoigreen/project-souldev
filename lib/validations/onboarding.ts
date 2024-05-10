import { z } from 'zod';
import {
  FACEBOOK_URL_REGEX,
  GITHUB_URL_REGEX,
  TWITTER_URL_REGEX,
} from '../constants';

export const twitterUrlSchema = z
  .string()
  .regex(TWITTER_URL_REGEX, 'Please enter a valid Twitter URL')
  .optional();
export const facebookUrlSchema = z
  .string()
  .regex(FACEBOOK_URL_REGEX, 'Please enter a valid Facebook URL')
  .optional();
export const githubUrlSchema = z
  .string()
  .regex(GITHUB_URL_REGEX, 'Please enter a valid GitHub URL')
  .optional();

export const userOnboardingSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(128),
  last_name: z.string().min(1, 'Last name is required').max(128),
  mobile: z.string().min(1, 'M4'),
  twitter: twitterUrlSchema,
  facebook: facebookUrlSchema,
  github: githubUrlSchema,
  bio: z.string().optional(),
});

export type UserOnboardingSchema = z.infer<typeof userOnboardingSchema>;
