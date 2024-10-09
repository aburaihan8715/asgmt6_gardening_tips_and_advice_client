import { z } from 'zod';

const forgetPasswordValidationSchema = z.object({
  email: z.string().email('Invalid email address'),
});

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

const passwordChangeValidationSchema = z.object({
  currentPassword: z
    .string()
    .min(8, 'Current password must be at least 8 characters long'),
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters long'),
});

const registerValidationSchema = z.object({
  username: z.string().min(1, 'Please enter your name!'),
  email: z.string().email('Please enter a valid email address!'),
  password: z.string().min(6, 'Must be at least 6 characters.'),
});

const resetPasswordValidationSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
});

const userSettingsSchema = z.object({
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
});

export const AuthSchemas = {
  forgetPasswordValidationSchema,
  loginValidationSchema,
  passwordChangeValidationSchema,
  registerValidationSchema,
  resetPasswordValidationSchema,
  userSettingsSchema,
};
