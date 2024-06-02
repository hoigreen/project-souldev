import { z } from 'zod';
import { MONTH_YEAR_REGEX } from '../constants';

export const educationSchema = z.object({
  school: z.string().min(1, 'School is required'),
  degree: z.string(),
  from: z.string().regex(MONTH_YEAR_REGEX, 'Invalid date format MM/YYYY'),
  to: z.string().regex(MONTH_YEAR_REGEX, 'Invalid date format MM/YYYY'),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

export type EducationSchema = z.infer<typeof educationSchema>;
