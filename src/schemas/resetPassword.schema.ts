import { z } from 'zod';

// Zod schema for password validation
const resetPasswordValidationSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
});

export default resetPasswordValidationSchema;
