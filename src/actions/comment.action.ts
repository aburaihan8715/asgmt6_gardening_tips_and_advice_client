'use server';
import axiosInstance from '@/lib/AxiosInstance';

// UPDATE
export const updateComment = async (
  commentId: string,
  updatedCommentData: { content: string },
) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/comments/${commentId}`,
      updatedCommentData,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// DELETE
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

// GET ONE
export const getComment = async (commentId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1/comments/${commentId}`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
