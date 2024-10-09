'use server';
import axiosInstance from '@/lib/AxiosInstance';
import { FieldValues } from 'react-hook-form';

export const createPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/posts', postData);
    return data;
  } catch (error: any) {
    // console.error('Validation Error:', error);
    console.error(
      '======🔥Full error response:=======',
      error.response?.data,
    );
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllPosts = async () => {
  try {
    const { data } = await axiosInstance.get('/posts');
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
