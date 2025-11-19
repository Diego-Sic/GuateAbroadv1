import { z } from 'zod';

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  full_name: z
    .string()
    .max(100, 'Full name must be at most 100 characters')
    .optional()
    .or(z.literal('')),
  bio: z
    .string()
    .max(500, 'Bio must be at most 500 characters')
    .optional()
    .or(z.literal('')),
  location: z
    .string()
    .max(100, 'Location must be at most 100 characters')
    .optional()
    .or(z.literal('')),
  education_level: z
    .enum(['high_school', 'undergraduate', 'graduate', 'postgraduate', 'other'])
    .optional()
    .nullable(),
  field_of_interest: z
    .string()
    .max(100, 'Field of interest must be at most 100 characters')
    .optional()
    .or(z.literal('')),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
