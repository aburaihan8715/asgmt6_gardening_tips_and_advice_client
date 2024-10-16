'use client';
import React from 'react';
import { useGetNewFivePosts } from '@/hooks/post.hook';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { IPost } from '@/types/postData.type';
import Post from '../allPosts/Post';
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '@/hooks/user.hook';
import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';

const PostInHome = () => {
  const { data, isLoading, isError, error } = useGetNewFivePosts();
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

export default PostInHome;
