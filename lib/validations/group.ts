import { z } from 'zod';

export const createGroupSchema = z.object({
  name: z
    .string({
      required_error: 'Please enter the group name.',
    })
    .min(1, 'Please enter the group name.'),
});

export type CreateGroupSchema = z.infer<typeof createGroupSchema>;
