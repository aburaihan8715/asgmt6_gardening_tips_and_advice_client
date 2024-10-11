import { z } from 'zod';
const postValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  content: z.string().min(1, 'Content is required'),
  image: z.any().optional(),
});

const postUpdateValidationSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  category: z.string().min(1, 'Category is required').optional(),
  content: z.string().min(1, 'Content is required').optional(),
  image: z.any().optional(),
});
export const PostSchemas = {
  postValidationSchema,
  postUpdateValidationSchema,
};
