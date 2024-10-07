import { z } from 'zod';

const passwordValidationSchema = z.object({
  currentPassword: z
    .string()
    .min(8, 'Current password must be at least 8 characters long'),
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters long'),
});

export default passwordValidationSchema;
