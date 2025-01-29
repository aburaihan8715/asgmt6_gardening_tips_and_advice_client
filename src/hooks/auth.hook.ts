import {
  changePassword,
  forgetPassword,
  getCurrentUser,
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
  const { setUser } = useAuth();
  return useMutation<any, Error, FieldValues>({
    mutationFn: async (loginData) => await loginUser(loginData),
    onSuccess: async () => {
      toast.success('User login successful.');
      const userData = await getCurrentUser();
      setUser(userData?.data);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationFn: async (passwordData) => await changePassword(passwordData),
    onSuccess: () => {
      toast.success('Password changed successful.');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useForgetPasswordMutation = () => {
  return useMutation<any, Error, FieldValues>({
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
  return useMutation<any, Error, FieldValues>({
    mutationFn: async (profileData) => await settingsProfile(profileData),
    onSuccess: async () => {
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
