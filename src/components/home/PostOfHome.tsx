'use client';
import React from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { IPost } from '@/types/postData.type';
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '@/hooks/user.hook';
import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';

import { useGetTopFivePosts } from '@/hooks/post.hook';
import Post from '@/app/(post)/_components/Post';

const PostOfHome = () => {
  const { data, isLoading, isError, error } = useGetTopFivePosts();
  const posts = data?.data;
  const { isPending: followPending } = useFollowUserMutation();
  const { isPending: unfollowPending } = useUnfollowUserMutation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  }

  return (
    <>
      {(followPending || unfollowPending) && <LoadingWithOverlay />}
      {posts?.map((post: IPost) => <Post key={post._id} post={post} />)}
    </>
  );
};

export default PostOfHome;
