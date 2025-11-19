import { z } from 'zod';

export const postCategories = [
  'scholarships',
  'visa',
  'tests',
  'university',
  'general',
] as const;

export type PostCategory = (typeof postCategories)[number];

export const createPostSchema = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(200, 'Title must be less than 200 characters'),
  content: z
    .string()
    .min(50, 'Content must be at least 50 characters')
    .max(10000, 'Content must be less than 10,000 characters'),
  category: z
    .enum(postCategories)
    .refine((val) => postCategories.includes(val), {
      message: 'Please select a category',
    }),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;

export const categoryLabels: Record<PostCategory, string> = {
  scholarships: 'Scholarships',
  visa: 'Visa',
  tests: 'Tests',
  university: 'University',
  general: 'General',
};

export const categoryDescriptions: Record<PostCategory, string> = {
  scholarships: 'Fulbright, LASPAU, and other scholarship programs',
  visa: 'F-1, J-1, and other visa processes',
  tests: 'TOEFL, GRE, SAT preparation and tips',
  university: 'Admissions, campus life, and university selection',
  general: 'Other discussions and community topics',
};
