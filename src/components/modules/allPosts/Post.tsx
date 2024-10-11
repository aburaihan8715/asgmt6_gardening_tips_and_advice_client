'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentAlt,
  FaShareAlt,
  FaHeart, // Importing FaHeart icon for the favorite button
} from 'react-icons/fa';
import Link from 'next/link';
import { IPost } from '@/types/postData.type';

interface IProps {
  post: IPost;
}

const Post = ({ post }: IProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // State for favorite button

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

  return (
    <li className="group relative mx-auto mb-6 max-w-4xl rounded-lg border bg-white p-6 shadow-md">
      {/* Post Image with Hover Overlay */}
      <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-lg">
        <Image
          src={
            post?.image
              ? post?.image
              : 'https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png'
          }
          alt={`banner image`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay with Details Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link
            href={`/posts/${post._id}`}
            className="rounded-md bg-white px-4 py-2 font-semibold text-gray-900 shadow-md hover:bg-gray-100"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Category and Premium Badge */}
      <div className="mt-4 flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            post?.isPremium
              ? 'bg-yellow-300 text-yellow-900'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {post.category}
        </span>
        {post?.isPremium && (
          <span className="text-xs font-bold uppercase text-yellow-500">
            Premium
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="mt-3 text-2xl font-semibold text-gray-900">
        {post?.title}
      </h2>

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
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
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

      {/* Content Preview */}
      <p className="mt-4 line-clamp-3 text-sm text-gray-700">
        {post?.description}
      </p>

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
            {post?.numberOfComments ? post?.numberOfComments : 0} Comments
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
    </li>
  );
};

export default Post;
