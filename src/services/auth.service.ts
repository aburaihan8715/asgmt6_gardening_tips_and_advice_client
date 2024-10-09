'use server';

import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '@/lib/AxiosInstance';

// register
export const registerUser = async (registerData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      '/auth/register',
      registerData,
    );

    // if (data.success) {
    //   cookies().set('accessToken', data?.data?.accessToken);
    //   cookies().set('refreshToken', data?.data?.refreshToken);
    // }

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// login
export const loginUser = async (loginData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', loginData);

    if (data.success) {
      cookies().set('accessToken', data?.data?.accessToken);
      cookies().set('refreshToken', data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// logout
export const logout = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
};

// change password
export const changePassword = async (passwordData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      '/auth/change-password',
      passwordData,
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// forget password
export const forgetPassword = async (emailData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      '/auth/forget-password',
      emailData,
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// reset password
export const resetPassword = async (passwordResetData: FieldValues) => {
  const bodyData = {
    id: passwordResetData.id,
    newPassword: passwordResetData.newPassword,
  };

  try {
    const { data } = await axiosInstance.patch(
      '/auth/reset-password',
      bodyData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${passwordResetData.passwordResetToken}`,
        },
      },
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// settings profile
export const settingsProfile = async (profileData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      '/auth/settings-profile',
      profileData,
    );

    if (data.success) {
      cookies().set('accessToken', data?.data?.accessToken);
      cookies().set('refreshToken', data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// get current user
export const getCurrentUser = async () => {
  const accessToken = cookies().get('accessToken')?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      _id: decodedToken._id,
      username: decodedToken.username,
      email: decodedToken.email,
      role: decodedToken.role,
      profilePicture: decodedToken.profilePicture,
      isVerified: decodedToken.isVerified,
      followers: decodedToken.followers,
      following: decodedToken.following,
      favourites: decodedToken.favourites,
    };
  }

  return decodedToken;
};
