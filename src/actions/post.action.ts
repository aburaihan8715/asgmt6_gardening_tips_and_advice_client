'use server';

import axiosInstance from '@/lib/AxiosInstance';
import { FieldValues } from 'react-hook-form';

// CREATE
export const createPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/api/v1/posts', postData);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// GET ALL
export const getAllPosts = async ({
  page,
  limit,
  searchTerm,
  category,
  voteFilter,
}: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  category?: string;
  voteFilter?: string;
}) => {
  try {
    let queryString = '/api/v1/posts';

    const params = new URLSearchParams();

    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    if (searchTerm) params.append('searchTerm', searchTerm);
    if (category) params.append('category', category);
    if (voteFilter && voteFilter === 'upvotesCount') {
      params.append('sort', '-upvotesCount');
    } else if (voteFilter && voteFilter === 'downvotesCount') {
      params.append('sort', '-downvotesCount');
    }

    if (params.toString()) queryString += `?${params.toString()}`;

    console.log('queryString🔥🔥', queryString);

    const { data } = await axiosInstance.get(queryString);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// GET INFINITE POSTS.
// NOTE: It does not work
export const getInfinitePosts = async ({
  searchTerm,
  limit = 10,
  page,
}: {
  searchTerm?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    let queryString = '/api/v1/posts';

    const params = new URLSearchParams();

    if (searchTerm) params.append('searchTerm', searchTerm);
    if (page) params.append('page', String(page));
    if (limit) params.append('limit', String(limit));

    if (params.toString()) queryString += `?${params.toString()}`;

    // console.log('🔥params====🔥', params);

    const { data } = await axiosInstance.get(queryString);

    return data;
  } catch (error: any) {
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
    let queryString = '/api/v1/posts/my-posts';

    const params = new URLSearchParams();

    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    if (searchTerm) params.append('searchTerm', searchTerm);

    if (params.toString()) queryString += `?${params.toString()}`;

    const { data } = await axiosInstance.get(queryString);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// GET NEW 5
export const getTopFivePosts = async () => {
  try {
    const { data } = await axiosInstance.get('/api/v1/posts/top-5-posts');
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// GET ONE
export const getPost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get(`/api/v1/posts/${postId}`);
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
      `/api/v1/posts/${postId}`,
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
    const { data } = await axiosInstance.delete(`/api/v1/posts/${postId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// MAKE PREMIUM
export const makePostPremium = async (postId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/posts/${postId}/make-premium`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Upvote a post
export const upvotePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/posts/${postId}/upvote`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const removeUpvotePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/posts/${postId}/upvote-remove`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Downvote a post
export const downvotePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/posts/${postId}/downvote`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const removeDownvotePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1/posts/${postId}/downvote-remove`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Comment on a post
export const createCommentOnPost = async (
  postId: string,
  content: string,
) => {
  try {
    const { data } = await axiosInstance.post(
      `/api/v1/posts/${postId}/comments`,
      { content },
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Comment on a post (specific post)
export const getCommentsOfPost = async ({
  page,
  limit,
  searchTerm,
  postId,
}: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  postId?: string;
}) => {
  try {
    let queryString = `/api/v1/posts/${postId}/comments`;

    const params = new URLSearchParams();

    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    if (searchTerm) params.append('searchTerm', searchTerm);

    if (params.toString()) queryString += `?${params.toString()}`;

    const { data } = await axiosInstance.get(queryString);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
