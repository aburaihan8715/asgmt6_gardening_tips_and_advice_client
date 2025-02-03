'use server';

import axiosInstance from '@/lib/AxiosInstance';

export const createComment = async (postId: string, comment: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/api/v1/posts/${postId}/comments`,
      { comment },
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllCommentsOnPost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1/posts/${postId}/comments`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getSingleComment = async (commentId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1/comments/${commentId}`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const { data } = await axiosInstance.delete(
      `/api/v1/comments/${commentId}`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateComment = async (
  commentId: string,
  payload: { comment: string },
) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/comments/${commentId}`,
      payload,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
