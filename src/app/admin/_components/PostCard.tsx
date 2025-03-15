'use client';
import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useGetAllPosts } from '@/hooks/post.hook';
import InfoCard from './InfoCard';

const PostCard = () => {
  const { data, isLoading } = useGetAllPosts({});
  const posts = data?.data || [];
  const count = posts.length || 0;

  if (isLoading) return 'loading...';

  return (
    <InfoCard
      bg="bg-blue-100"
      title="Posts"
      count={count}
      icon={<FaPaperPlane />}
    />
  );
};

export default PostCard;
