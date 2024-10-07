import { z } from 'zod';

const forgetPasswordValidationSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export default forgetPasswordValidationSchema;
