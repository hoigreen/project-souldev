import { z } from 'zod';
import { MONTH_YEAR_REGEX } from '../constants';

export const experienceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  from: z.string().regex(MONTH_YEAR_REGEX, 'Invalid date format MM/YYYY'),
  to: z.string().regex(MONTH_YEAR_REGEX, 'Invalid date format MM/YYYY'),
  current: z.boolean().default(true),
  description: z.string().optional(),
});

export type ExperienceSchema = z.infer<typeof experienceSchema>;
