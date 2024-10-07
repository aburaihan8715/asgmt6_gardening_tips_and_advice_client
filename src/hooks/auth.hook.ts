import {
  changePassword,
  forgetPassword,
  loginUser,
  registerUser,
  resetPassword,
} from '@/services/AuthService';
import { useMutation } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

export const useRegisterMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['USER_REGISTRATION'],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success('User registration successful.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useLoginMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['USER_LOGIN'],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success('User login successful.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['CHANGE_PASSWORD'],
    mutationFn: async (passwordData) => await changePassword(passwordData),
    onSuccess: () => {
      toast.success('Password changed successful.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useForgetPasswordMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['FORGET_PASSWORD'],
    mutationFn: async (emailData) => await forgetPassword(emailData),
    onSuccess: async () => {
      toast.success('Please check your email!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['RESET_PASSWORD'],
    mutationFn: async (passwordResetData) =>
      await resetPassword(passwordResetData),
    onSuccess: async () => {
      toast.success('Password reset successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
