import { z } from 'zod';
import { fileSchema } from '../constants';

export const createGroupSchema = z.object({
  name: z
    .string({
      required_error: 'Please enter the group name.',
    })
    .min(1, 'Please enter the group name.'),
  image: fileSchema,
});

export type CreateGroupSchema = z.infer<typeof createGroupSchema>;
