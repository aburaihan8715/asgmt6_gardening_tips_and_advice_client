'use client';
import React from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { IPost } from '@/types/postData.type';
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '@/hooks/user.hook';
import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';
import Post from '../posts/_components/Post';
import { useGetTopFivePosts } from '@/hooks/post.hook';

const PostOfHome = () => {
  const { data, isLoading, isError, error } = useGetTopFivePosts();
  const posts = data?.data;
  const { isPending: followPending } = useFollowUserMutation();
  const { isPending: unfollowPending } = useUnfollowUserMutation();

  // useEffect(() => {
  //   if (data && !data?.success) {
  //     toast.error(data?.message as string);
  //   }
  // }, [data]);

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
