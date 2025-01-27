'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  FaCommentAlt,
  FaShareAlt,
  FaHeart,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';
import {
  useDownvotePostMutation,
  useGetPost,
  useUpvotePostMutation,
} from '@/hooks/post.hook';
import QuillContent from '@/components/common/QuillContent';
import {
  useAddFavoritePostMutation,
  useFollowUserMutation,
  useGetMe,
  useRemoveFavoritePostMutation,
  useUnfollowUserMutation,
} from '@/hooks/user.hook';
import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useAuth } from '@/context/user.provider';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

const PostDetails = () => {
  const params = useParams();
  const postId = params?.postId as string;
  const { user } = useAuth();
  const role = user?.role;

  const {
    data: currentUserData,
    refetch,
    isLoading: isCurrentUserLoading,
  } = useGetMe();

  const router = useRouter();

  const { data: postDetailsData, isLoading: isPostLoading } =
    useGetPost(postId);
  const post = postDetailsData?.data;

  const postUserId = post?.user?._id as string;
  const currentUser = currentUserData?.data;
  const currentUserId = currentUser?._id;
  const followings = currentUser?.followings || [];
  const isFollowing = followings?.includes(postUserId);
  const favourites = currentUser?.favourites || [];
  const isFavourite = favourites.includes(post?._id);
  const isOwnPost = user?._id === post?.user?._id;
  const isVerified = currentUser?.isVerified;
  const isPremium = post?.isPremium;

  const { mutate: followMutate, isPending: followPending } =
    useFollowUserMutation();

  const { mutate: unFollowMutate, isPending: unfollowPending } =
    useUnfollowUserMutation();

  const {
    mutate: addFavouritePostMutate,
    isPending: addFavouritePostPending,
  } = useAddFavoritePostMutation();

  const {
    mutate: removeFavouritePostMutate,
    isPending: removeFavouritePostPending,
  } = useRemoveFavoritePostMutation();

  const { mutate: upvoteMutate, isPending: isUpvotePending } =
    useUpvotePostMutation();

  const { mutate: downvoteMutate, isPending: isDownvotePending } =
    useDownvotePostMutation();

  // HANDLE SHARE
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

  // HANDLE ADD FAVOURITE
  const handleAddFavourite = (postId: string) => {
    const mutateData = { postId };
    if (isPremium) {
      if (!isVerified) {
        return toast.warning('You need to be verified first!!');
      }
      addFavouritePostMutate(mutateData, {
        onSuccess: () => {
          refetch();
        },
        onError: () => {},
      });
    } else {
      addFavouritePostMutate(mutateData, {
        onSuccess: () => {
          refetch();
        },
        onError: () => {},
      });
    }
  };

  // HANDLE REMOVE FAVOURITE
  const handleRemoveFavourite = (postId: string) => {
    const mutateData = { postId };
    if (isPremium) {
      if (!isVerified) {
        return toast.warning('You need to be verified first!!');
      }
      removeFavouritePostMutate(mutateData, {
        onSuccess: () => {
          refetch();
        },
        onError: () => {},
      });
    } else {
      removeFavouritePostMutate(mutateData, {
        onSuccess: () => {
          refetch();
        },
        onError: () => {},
      });
    }
  };

  // HANDLE FOLLOW
  const handleFollow = (postUserId: string) => {
    const mutateData = { postUserId };
    followMutate(mutateData, {
      onSuccess: () => {
        refetch();
      },
      onError: () => {},
    });
  };

  // HANDLE UNFOLLOW
  const handleUnfollow = (postUserId: string) => {
    const mutateData = { postUserId };
    unFollowMutate(mutateData, {
      onSuccess: () => {
        refetch();
      },
      onError: () => {},
    });
  };

  // HANDLE UPVOTE
  const handleUpvote = (postId: string) => {
    if (!user) {
      return toast.error('You need to login first!');
    }

    const upvotes = post?.upvotes || [];
    const hasUpvotes = upvotes?.includes(currentUserId);

    if (isPremium && !isVerified && role !== 'admin') {
      return toast.warning('You need to be verified first!!');
    }

    const mutateData = { postId };
    if (!hasUpvotes) {
      upvoteMutate(mutateData, {});
    } else {
      toast.error('You already upvoted!');
    }
  };

  // HANDLE DOWNVOTE
  const handleDownvote = (postId: string) => {
    if (!user) {
      return toast.success('You need to login first!!');
    }

    const downvotes = post?.downvotes || [];
    const hasDownvotes = downvotes.includes(currentUserId);

    if (isPremium && !isVerified && role !== 'admin') {
      return toast.warning('You need to be verified first!!');
    }

    const mutateData = { postId };
    if (!hasDownvotes) {
      downvoteMutate(mutateData, {});
    } else {
      toast.error('You already downvoted!');
    }
  };

  // HANDLE COMMENT
  const handleComment = () => {
    const postId = post?._id;
    if (!postId) return;

    const pathForCreate = `/create-comment?postId=${postId}`;
    const pathForCommentList = `/comments?postId=${postId}`;
    const path =
      post?.numberOfComments > 0 ? pathForCommentList : pathForCreate;

    if (isPremium && !isVerified) {
      if (role !== 'admin') {
        return toast.warning('You need to be verified first!!');
      }
    }

    router.push(path);
  };

  // HANDLE USE EFFECT
  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  // LOADING SPINNER
  if (isPostLoading || isCurrentUserLoading) {
    return (
      <div className="mt-[90px]">
        <LoadingSpinner />
      </div>
    );
  }

  // MAIN CONTENT
  return (
    <>
      {(followPending ||
        unfollowPending ||
        addFavouritePostPending ||
        removeFavouritePostPending ||
        isUpvotePending ||
        isDownvotePending) && <LoadingWithOverlay />}
      <section className="mt-[80px]">
        <div className="mx-auto max-w-5xl p-6">
          {/* Header */}
          <div className="relative mb-6 aspect-[16/9] rounded-lg">
            <Image
              src={
                post?.image
                  ? post?.image
                  : 'https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_1280.png'
              }
              alt={`banner image`}
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Title */}
            <h1 className="mt-4 text-4xl font-bold text-gray-900">
              {post?.title}
            </h1>
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
                  {post?.user?.followersCount || 0}
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
            {user && !isOwnPost && (
              <div>
                {isFollowing && (
                  <button
                    onClick={() => handleUnfollow(post?.user?._id)}
                    className={`rounded-full bg-gray-300 px-4 py-1 text-xs font-semibold text-gray-800`}
                  >
                    following
                  </button>
                )}

                {!isFollowing && (
                  <button
                    onClick={() => handleFollow(post?.user?._id)}
                    className={`rounded-full bg-green-500 px-4 py-1 text-xs font-semibold text-white hover:bg-green-600`}
                  >
                    follow
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Main Content */}
          <QuillContent content={post?.content} />

          {/* Actions */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Upvote Button */}
              <button
                onClick={() => handleUpvote(post?._id)}
                className="flex items-center space-x-1 text-green-500"
              >
                <FaArrowUp />
                <span>{post.upvotesCount || 0}</span>
              </button>

              {/* Downvote Button */}
              <button
                onClick={() => handleDownvote(post?._id)}
                className="flex items-center space-x-1 text-red-500"
              >
                <FaArrowDown />
                <span>{post.downvotesCount || 0}</span>
              </button>
            </div>

            {user && (
              <div>
                <button
                  onClick={handleComment}
                  className="flex items-center space-x-2"
                >
                  <FaCommentAlt className="text-gray-400" />
                  <span className="text-gray-500">
                    {post?.numberOfComments || 0} {''} Comments
                  </span>
                </button>
              </div>
            )}

            <div className="flex items-center space-x-2">
              {/* Favourite Button Icon */}
              {user && (
                <div className="flex items-center">
                  {!isFavourite && (
                    <button
                      onClick={() => handleAddFavourite(post?._id)}
                      className={`text-lg text-gray-500`}
                    >
                      <FaHeart />
                    </button>
                  )}

                  {isFavourite && (
                    <button
                      onClick={() => handleRemoveFavourite(post?._id)}
                      className={`text-lg text-red-500`}
                    >
                      <FaHeart />
                    </button>
                  )}
                </div>
              )}

              {/* Share Button Icon */}
              <div className="">
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-1 text-green-500 hover:text-green-600"
                >
                  <FaShareAlt />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostDetails;
