import { z } from 'zod';

export const educationSchema = z.object({
  school: z.string().min(1, 'School is required'),
  degree: z.string(),
  from: z.string(),
  to: z.string(),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

export type EducationSchema = z.infer<typeof educationSchema>;
