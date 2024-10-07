'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentAlt,
  FaShareAlt,
} from 'react-icons/fa';
import Link from 'next/link';

const Post = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const postData = {
    title: 'Top 10 Tips for Growing Tomatoes',
    content:
      'Tomatoes are one of the most popular vegetables in home gardens. They are relatively easy to grow and provide a bountiful harvest.',
    category: 'Vegetable Gardening',
    isPremium: true,
    upvotes: 120,
    downvotes: 10,
    author: {
      _id: '64c8e9f23c1f8a123abc4567',
      name: 'Emily Gardner',
      profileImage:
        'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      followers: 3400,
      isPremiumUser: true,
    },
    comments: [
      { _id: '64c8f0e8d5f4c31234abc890', content: 'Thanks for the tips!' },
      {
        _id: '64c8f1e7a1b2c789ab123456',
        content: 'What fertilizer do you recommend?',
      },
    ],
    createdAt: '2024-09-19T09:30:00.000Z',
    imageUrl:
      'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: postData.title,
          text: postData.content,
          url: window.location.href,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Share API is not supported in your browser.');
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <li className="group relative mx-auto mb-6 max-w-4xl rounded-lg border bg-white p-6 shadow-md">
      {/* Post Image with Hover Overlay */}
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={postData.imageUrl}
          alt={postData.title}
          width={800}
          height={400}
          layout="responsive"
          objectFit="cover"
          className="rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay with Details Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link
            href={`/post-list/123`}
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
            postData.isPremium
              ? 'bg-yellow-300 text-yellow-900'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {postData.category}
        </span>
        {postData.isPremium && (
          <span className="text-xs font-bold uppercase text-yellow-500">
            Premium
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="mt-3 text-2xl font-semibold text-gray-900">
        {postData.title}
      </h2>

      {/* Author Information */}
      <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <div className="relative mr-3 h-10 w-10 rounded-full object-cover">
            <Image
              fill
              src={postData.author.profileImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={postData.author.name}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center">
              <span>by {postData.author.name}</span>
              <span className="mx-2">•</span>
              <span>
                {new Date(postData.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="text-xs text-gray-400">
              {postData.author.followers} Followers
              {postData.author.isPremiumUser && (
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
        {postData.content}
      </p>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-green-500">
            <FaThumbsUp />
            <span>{postData.upvotes}</span>
          </button>
          <button className="flex items-center space-x-1 text-red-500">
            <FaThumbsDown />
            <span>{postData.downvotes}</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <FaCommentAlt className="text-gray-400" />
          <span className="text-gray-500">
            {postData.comments.length} Comments
          </span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center space-x-1 text-green-500 hover:text-green-600"
        >
          <FaShareAlt />
          <span>Share</span>
        </button>
      </div>
    </li>
  );
};

export default Post;
