import { z } from 'zod';
import {
  facebookUrlSchema,
  githubUrlSchema,
  linkedInUrlSchema,
  websiteUrlSchema,
} from '../constants';
import { educationSchema } from './education';
import { experienceSchema } from './experience';
import { addressSchema } from './address';

export const profileBasicSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(128),
  last_name: z.string().min(1, 'Last name is required').max(128),
  mobile: z.string().min(1, 'M4'),
  facebook: facebookUrlSchema,
  github: githubUrlSchema,
  bio: z.string().optional(),
});

export type ProfileBasicSchema = z.infer<typeof profileBasicSchema>;

export const profileAdvanceSchema = z.object({
  skills: z.array(z.object({ skill: z.string() })),
  linkedIn: linkedInUrlSchema,
  website: websiteUrlSchema,
  address: z.array(addressSchema),
  education: z.array(educationSchema),
  experience: z.array(experienceSchema),
});

export type ProfileAdvanceSchema = z.infer<typeof profileAdvanceSchema>;
