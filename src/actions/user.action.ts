'use server';

import axiosInstance from '@/lib/AxiosInstance';

// Follow a user
export const followUser = async (postUserId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/users/${postUserId}/follow`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Unfollow a user
export const unfollowUser = async (postUserId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/users/${postUserId}/unfollow`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Add Favorite a post
export const addFavoritePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/users/${postId}/add-favourites`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Remove Favorite a post
export const removeFavoritePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/users/${postId}/remove-favourites`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Get me
export const getMe = async () => {
  try {
    const { data } = await axiosInstance.get(`/api/v1/users/me`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
