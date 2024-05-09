import { z } from 'zod';
import {
  FACEBOOK_URL_REGEX,
  GITHUB_URL_REGEX,
  TWITTER_URL_REGEX,
} from '../constants';

export const twitterUrlSchema = z
  .string()
  .regex(TWITTER_URL_REGEX, 'M1')
  .nullish();
export const facebookUrlSchema = z
  .string()
  .regex(FACEBOOK_URL_REGEX, 'M2')
  .nullish();
export const githubUrlSchema = z
  .string()
  .regex(GITHUB_URL_REGEX, 'M3')
  .nullish();

export const userOnboardingSchema = z.object({
  first_name: z.string().min(1, 'M5').max(128),
  last_name: z.string().min(1, 'M6').max(128),
  mobile: z.string().min(1, 'M4'),
  image: z.string().nullish(),
  twitter: twitterUrlSchema,
  facebook: facebookUrlSchema,
  github: githubUrlSchema,
  bio: z.string().optional(),
});

export type UserOnboardingSchema = z.infer<typeof userOnboardingSchema>;
