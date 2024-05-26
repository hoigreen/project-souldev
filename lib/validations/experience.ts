import { z } from 'zod';

export const experienceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().nullish(),
  from: z.string(),
  to: z.string(),
  current: z.boolean().default(true),
  description: z.string().optional(),
});

export type ExperienceSchema = z.infer<typeof experienceSchema>;
