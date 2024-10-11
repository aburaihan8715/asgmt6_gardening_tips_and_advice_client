'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentAlt,
  FaShareAlt,
  FaHeart,
} from 'react-icons/fa';
import { useGetPost } from '@/hooks/post.hook';
import QuillContent from '@/components/ui/QuillContent';

interface IProps {
  params: {
    postId: string;
  };
}

const PostDetails = ({ params }: IProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { data, isLoading, isError } = useGetPost(params.postId);
  const post = data?.data;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post?.title,
          text: post?.content,
          url: window.location.href,
        });
      } else {
        alert('Share API is not supported in your browser.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite); // Toggle the favorite state
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !post) {
    return <div>Error fetching post data or post does not exist.</div>;
  }

  return (
    <section className="mt-[80px]">
      <div className="mx-auto max-w-5xl p-6">
        {/* Header */}
        <div className="relative mb-6 rounded-lg">
          <Image
            src={
              post?.image
                ? post?.image
                : 'https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png'
            }
            alt={`banner image`}
            width={800}
            height={400}
            layout="responsive"
            objectFit="cover"
            className="rounded-lg"
          />
          {/* Title */}
          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            {post?.title}
          </h1>
          {/* Category and Premium Badge */}
          <div className="mt-2 flex items-center justify-between">
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                post?.isPremium
                  ? 'bg-yellow-300 text-yellow-900'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {post?.category}
            </span>
            {post?.isPremium && (
              <span className="text-xs font-bold uppercase text-yellow-500">
                Premium
              </span>
            )}
          </div>
        </div>

        {/* Author Information */}
        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <div className="relative mr-3 h-10 w-10 rounded-full object-cover">
              <Image
                fill
                src={
                  post?.user?.profilePicture
                    ? post?.user?.profilePicture
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                }
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={post?.user?.username}
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center">
                <span>by {post?.user?.username}</span>
                <span className="mx-2">•</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                {post?.user?.followers.length > 0
                  ? post?.user?.followers.length
                  : '0'}{' '}
                Followers
                {post.user.isVerified && (
                  <span className="ml-2 rounded-full bg-yellow-400 px-2 py-1 text-xs font-semibold text-yellow-900">
                    Premium User 💎
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Follow Button */}
          <button
            onClick={handleFollow}
            className={`rounded-full px-4 py-1 text-xs font-semibold ${
              isFollowing
                ? 'bg-gray-300 text-gray-800'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>

        {/* Main Content */}
        <QuillContent content={post?.content} />

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-green-500">
              <FaThumbsUp />
              <span>
                {post?.upvotes.length > 0 ? post?.upvotes.length : '0'}
              </span>
            </button>
            <button className="flex items-center space-x-1 text-red-500">
              <FaThumbsDown />
              <span>
                {post?.downvotes.length > 0 ? post?.downvotes.length : '0'}
              </span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <FaCommentAlt className="text-gray-400" />
            <span className="text-gray-500">
              {post?.numberOfComments ? post?.numberOfComments : 0}{' '}
              Comments
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Favorite Button Icon */}
            <button
              onClick={handleFavorite}
              className={`text-lg ${
                isFavorite ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              <FaHeart />
            </button>

            {/* Share Button Icon */}
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 text-green-500 hover:text-green-600"
            >
              <FaShareAlt />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetails;
