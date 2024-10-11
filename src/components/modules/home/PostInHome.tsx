'use client';
import React from 'react';
import { useGetNewFivePosts } from '@/hooks/post.hook';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { IPost } from '@/types/postData.type';
import Post from '../allPosts/Post';

const PostInHome = () => {
  const { data, isLoading, isError, error } = useGetNewFivePosts();
  const posts = data?.data;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  }

  return (
    <>{posts?.map((post: IPost) => <Post key={post._id} post={post} />)}</>
  );
};

export default PostInHome;
