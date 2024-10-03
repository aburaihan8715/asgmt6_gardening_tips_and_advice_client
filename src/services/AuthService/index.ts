/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '@/lib/AxiosInstance';

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/auth/register', userData);

    // if (data.success) {
    //   cookies().set('accessToken', data?.data?.accessToken);
    //   cookies().set('refreshToken', data?.data?.refreshToken);
    // }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', userData);

    if (data.success) {
      cookies().set('accessToken', data?.data?.accessToken);
      cookies().set('refreshToken', data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
};

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
      verified: decodedToken.verified,
      followers: decodedToken.followers,
      following: decodedToken.following,
      favourites: decodedToken.favourites,
    };
  }

  return decodedToken;
};
