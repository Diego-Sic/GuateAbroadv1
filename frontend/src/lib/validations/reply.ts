import { z } from 'zod';

export const createReplySchema = z.object({
  content: z
    .string()
    .min(10, 'Reply must be at least 10 characters')
    .max(5000, 'Reply must be less than 5,000 characters'),
  postId: z.string().min(1, 'Post ID is required'),
  parentReplyId: z.string().optional(),
});

export type CreateReplyFormData = z.infer<typeof createReplySchema>;
