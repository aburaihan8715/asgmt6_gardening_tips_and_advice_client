'use server';

import axiosInstance from '@/lib/AxiosInstance';

// ==========INFO: Query=============
// GET ME
export const getTopFiveUsers = async () => {
  try {
    const { data } = await axiosInstance.get(`/api/v1/users/top-5-users`);
    return data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.message || error.message);
    return error.response?.data?.message || error.message;
  }
};
// GET ALL USERS
export const getAllUsers = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    let queryString = '/api/v1/users';

    const params = new URLSearchParams();

    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());

    if (params.toString()) queryString += `?${params.toString()}`;

    const { data } = await axiosInstance.get(queryString);
    return data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.message || error.message);
    return error.response?.data?.message || error.message;
  }
};

// GET ME
export const getMe = async () => {
  try {
    const { data } = await axiosInstance.get(`/api/v1/users/me`);
    return data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.message || error.message);
    return error.response?.data?.message || error.message;
  }
};

// CHECK PREMIUM STATUS
export const checkPremiumStatus = async () => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1/users/check-premium-status`,
    );
    return data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.message || error.message);
    return error.response?.data?.message || error.message;
  }
};

// GET FAVOURITE POSTS
export const getFavouritePosts = async () => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1/users/favourite-posts`,
    );
    return data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.message || error.message);
    return error.response?.data?.message || error.message;
  }
};

// GET USERS STATS
export const getUserStats = async () => {
  try {
    const { data } = await axiosInstance.get(`/api/v1/users/user-stats`);
    return data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.message || error.message);
    return error.response?.data?.message || error.message;
  }
};

// GET REVENUE
export const getRevenue = async () => {
  try {
    const { data } = await axiosInstance.get(`/api/v1/users/revenue`);
    return data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.message || error.message);
    return error.response?.data?.message || error.message;
  }
};

// ==========INFO: Mutation=============
// FOLLOW USER
export const followUser = async (postUserId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/users/${postUserId}/follow`,
    );
    return data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.message || error.message);
    return error.response?.data?.message || error.message;
  }
};

// UNFOLLOW USER
export const unfollowUser = async (postUserId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/users/${postUserId}/unfollow`,
    );
    return data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.message || error.message);
    return error.response?.data?.message || error.message;
  }
};

// ADD TO FAVOURITE
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

// REMOVE FROM FAVOURITE
export const removeFavoritePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/users/${postId}/remove-favourites`,
    );
    return data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.message || error.message);
    return error.response?.data?.message || error.message;
  }
};

// DELETE USER
export const deleteUser = async (userId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/api/v1/users/${userId}`);
    return data;
  } catch (error: any) {
    // throw new Error(error.response?.data?.message || error.message);
    return error.response?.data?.message || error.message;
  }
};
