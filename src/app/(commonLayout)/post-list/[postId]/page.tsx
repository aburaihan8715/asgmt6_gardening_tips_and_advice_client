'use client';
import React from 'react';
import Image from 'next/image';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentAlt,
  FaShareAlt,
} from 'react-icons/fa';

const PostDetails = () => {
  const postData = {
    title: 'Top 10 Tips for Growing Tomatoes',
    content:
      'Tomatoes are one of the most popular vegetables in home gardens. They are relatively easy to grow and provide a bountiful harvest. Below are our top 10 tips to help you grow better tomatoes.',
    category: 'Vegetable Gardening',
    isPremium: true,
    upvotes: 150,
    downvotes: 15,
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
    gardeningTips: [
      '1. Choose the right tomato variety for your region.',
      '2. Plant tomatoes in a location with full sun.',
      '3. Water consistently, keeping the soil evenly moist.',
      '4. Fertilize with a balanced fertilizer, rich in phosphorus.',
      '5. Use mulch to retain moisture and prevent weeds.',
      '6. Prune tomato plants to promote air circulation.',
      '7. Support plants with cages or stakes to keep them off the ground.',
      '8. Monitor for pests and diseases, treating early if necessary.',
      '9. Harvest tomatoes when they are fully ripe for the best flavor.',
      '10. Rotate crops each year to prevent soil depletion.',
    ],
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

  return (
    <section className="mt-[80px]">
      <div className="mx-auto max-w-5xl p-6">
        {/* Header */}
        <div className="relative mb-6 rounded-lg">
          <Image
            src={postData.imageUrl}
            alt={postData.title}
            width={800}
            height={400}
            layout="responsive"
            objectFit="cover"
            className="rounded-lg"
          />
          {/* Title */}
          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            {postData.title}
          </h1>
          {/* Category and Premium Badge */}
          <div className="mt-2 flex items-center justify-between">
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
        </div>

        {/* Author Information */}
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <div>
            <div className="relative mr-3 h-12 w-12 rounded-full object-cover">
              <Image
                fill
                src={postData.author.profileImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={postData.author.name}
                className="rounded-full object-cover"
              />
            </div>
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

        {/* Main Content */}
        <div className="mt-6 space-y-4 text-gray-700">
          <p>{postData.content}</p>

          {/* Gardening Tips */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Gardening Tips
            </h2>
            <ul className="mt-4 list-inside list-disc">
              {postData.gardeningTips.map((tip, index) => (
                <li key={index} className="mb-2">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-between">
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
            className="flex items-center space-x-1 text-blue-500 hover:text-blue-600"
          >
            <FaShareAlt />
            <span>Share</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900">Comments</h3>
          <ul className="mt-4 space-y-4">
            {postData.comments.map((comment) => (
              <li key={comment._id} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    {comment.content}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PostDetails;
