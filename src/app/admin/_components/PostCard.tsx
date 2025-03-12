'use client';
import React from 'react';
import Card from './Card';
import { FaPaperPlane } from 'react-icons/fa';
import { useGetAllPosts } from '@/hooks/post.hook';

const PostCard = () => {
  const { data, isLoading } = useGetAllPosts({});
  const posts = data?.data || [];
  const count = posts.length || 0;

  if (isLoading) return 'loading...';

  return <Card title="Posts" count={count} icon={<FaPaperPlane />} />;
};

export default PostCard;
