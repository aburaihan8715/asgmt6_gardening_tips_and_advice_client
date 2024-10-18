'use server';
import axiosInstance from '@/lib/AxiosInstance';

// UPDATE
export const updateComment = async (
  commentId: string,
  updatedCommentData: FormData,
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

// UPDATE
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
