import { z } from 'zod';

// NOTE: need to update
const registerValidationSchema = z.object({
  username: z.string().min(1, 'Please enter your name!'),
  email: z.string().email('Please enter a valid email address!'),
  password: z.string().min(6, 'Must be at least 6 characters.'),
});

export default registerValidationSchema;
