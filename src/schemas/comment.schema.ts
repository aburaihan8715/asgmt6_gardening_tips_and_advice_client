import { z } from 'zod';

const createCommentSchema = z.object({
  commentText: z.string().min(1, 'Comment is required'),
});
const updateCommentSchema = z.object({
  commentText: z.string().optional(),
});

export const CommentSchemas = {
  createCommentSchema,
  updateCommentSchema,
};
