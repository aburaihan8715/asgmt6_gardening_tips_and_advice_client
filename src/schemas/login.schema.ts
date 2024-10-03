import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .min(1, { message: 'Password is required' }),
});

export default loginValidationSchema;
