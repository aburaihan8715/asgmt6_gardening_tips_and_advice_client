'use client';
import { useGetAllPosts } from '@/hooks/post.hook';
import { IPost } from '@/types/postData.type';
import React from 'react';
import Post from './Post';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

const PostList = () => {
  const { data: postData, isLoading, isError } = useGetAllPosts({});
  const posts = postData?.data;

  // console.log(posts);

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return <ErrorMessage>{`Failed to fetch posts data!`}</ErrorMessage>;
  }
  return (
    <ul className="space-y-10 md:p-5">
      {posts?.map((post: IPost) => <Post key={post._id} post={post} />)}
    </ul>
  );
};

export default PostList;
