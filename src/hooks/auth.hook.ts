import {
  changePassword,
  forgetPassword,
  loginUser,
  registerUser,
  resetPassword,
  settingsProfile,
} from '@/actions/auth.action';
import { useAuth } from '@/context/user.provider';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

export const useRegisterMutation = () => {
  const router = useRouter();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['USER_REGISTRATION'],
    mutationFn: async (registerData) => await registerUser(registerData),
    onSuccess: () => {
      toast.success('User registration successful.');
      router.push('/login');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useLoginMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['USER_LOGIN'],
    mutationFn: async (loginData) => await loginUser(loginData),
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
  const router = useRouter();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['RESET_PASSWORD'],
    mutationFn: async (passwordResetData) =>
      await resetPassword(passwordResetData),
    onSuccess: async () => {
      toast.success('Password reset successfully');
      router.push('/login');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useSettingsProfileMutation = () => {
  const { setIsLoading } = useAuth();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['SETTINGS_PROFILE'],
    mutationFn: async (profileData) => await settingsProfile(profileData),
    onSuccess: async () => {
      toast.success('Profile updated successfully');
      setIsLoading(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
