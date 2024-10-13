'use server';

import axiosInstance from '@/lib/AxiosInstance';

// Follow a user
export const followUser = async (
  currentUserId: string,
  postUserId: string,
) => {
  try {
    const { data } = await axiosInstance.patch(
      `/users/${postUserId}/follow`,
      { currentUserId },
    );
    return data;
  } catch (error: any) {
    console.log('=======followUser error🔥', error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Unfollow a user
export const unfollowUser = async (
  currentUserId: string,
  postUserId: string,
) => {
  try {
    const { data } = await axiosInstance.patch(
      `/users/${postUserId}/unfollow`,
      { currentUserId },
    );
    return data;
  } catch (error: any) {
    console.log('=======unFollowUser error🔥', error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Favorite a post
export const favoritePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/posts/${postId}/favorite`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
// export const UserServices = { followUser, unfollowUser, favoritePost };
