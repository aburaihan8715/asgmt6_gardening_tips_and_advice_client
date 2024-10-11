'use server';

import axiosInstance from '@/lib/AxiosInstance';
import { FieldValues } from 'react-hook-form';

// CREATE
export const createPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/posts', postData);
    return data;
  } catch (error: any) {
    // console.error('==🔥Full error response:==', error.response?.data);
    throw new Error(error.response?.data?.message || error.message);
  }
};

// GET ALL
export const getAllPosts = async ({
  page,
  limit,
  searchTerm,
}: {
  page?: number;
  limit?: number;
  searchTerm?: string;
}) => {
  try {
    let queryString = '/posts';

    const params = new URLSearchParams();

    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    if (searchTerm) params.append('searchTerm', searchTerm);

    if (params.toString()) queryString += `?${params.toString()}`;

    const { data } = await axiosInstance.get(queryString);
    return data;
  } catch (error: any) {
    // console.log('=======🔥🔥=======', error.response?.data);
    throw new Error(error.response?.data?.message || error.message);
  }
};

// GET MY POSTS
export const getMyPosts = async ({
  page,
  limit,
  searchTerm,
}: {
  page?: number;
  limit?: number;
  searchTerm?: string;
}) => {
  try {
    let queryString = '/posts/my-posts';

    const params = new URLSearchParams();

    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    if (searchTerm) params.append('searchTerm', searchTerm);

    if (params.toString()) queryString += `?${params.toString()}`;

    const { data } = await axiosInstance.get(queryString);
    return data;
  } catch (error: any) {
    // console.log('=======🔥🔥=======', error.response?.data);
    throw new Error(error.response?.data?.message || error.message);
  }
};

// GET NEW 5
export const getNewFivePosts = async () => {
  try {
    const { data } = await axiosInstance.get('/posts/new-5-posts');
    return data;
  } catch (error: any) {
    // console.error('==🔥Full error response:==', error.response?.data);
    throw new Error(error.response?.data?.message || error.message);
  }
};

// GET ONE
export const getPost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get(`/posts/${postId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// UPDATE
export const updatePost = async (
  postId: string,
  updatedPostData: FormData,
) => {
  try {
    const { data } = await axiosInstance.patch(
      `/posts/${postId}`,
      updatedPostData,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// UPDATE
export const deletePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${postId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// MAKE PREMIUM
export const makePostPremium = async (postId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/posts/${postId}/make-premium`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
