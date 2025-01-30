'use client';

import Image from 'next/image';
import {
  FaCommentAlt,
  FaShareAlt,
  FaHeart,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';
import { IPost } from '@/types/postData.type';
import { useAuth } from '@/context/user.provider';
import { useFavourite, useFollow, useGetUser } from '@/hooks/user.hook';
import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/common/LoadingSpinner';

import { useRouter } from 'next/navigation';
import {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import { useVote } from '@/hooks/post.hook';

interface IProps {
  post: IPost;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<any, Error>>;
}

const Post = ({ post, refetch }: IProps) => {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useAuth();

  const { data: updatedUserInfo } = useGetUser(user?._id as string);
  const currentUser = updatedUserInfo?.data;

  const postUserId = post?.user?._id as string;
  const postId = post?._id as string;
  const userId = currentUser?._id as string;
  const followings = currentUser?.followings || [];
  const isFollowing = followings?.includes(postUserId);
  const favourites = currentUser?.favourites || [];
  const isFavourite = favourites.includes(post?._id);
  const isOwnPost = currentUser?._id === post?.user?._id;
  const isVerified = currentUser?.isVerified;
  const isPremium = post?.isPremium;
  const role = currentUser?.role;

  const {
    handleUpvote,
    handleDownvote,
    isUpvotePending,
    isDownvotePending,
  } = useVote({
    user,
    userId,
    postId,
    post,
    isPremium,
    isVerified,
    role,
    refetch,
  });

  const {
    handleAddToFavourite,
    handleRemoveFromFavourite,
    isAddFavouritePending,
    isRemoveFavouritePending,
  } = useFavourite();

  const {
    handleFollow,
    handleUnfollow,
    isFollowingPending,
    isUnfollowPending,
  } = useFollow();

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

  // HANDLE VIEW DETAILS / PREMIUM CONTENT
  const handleViewDetail = () => {
    const postId = post?._id;
    if (!postId) return;
    const path = `/posts/${postId}`;
    if (isPremium && !isVerified) {
      if (role !== 'admin') {
        return toast.warning('You need to be verified first!!');
      }
      return router.push(path);
    }
    router.push(path);
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

  if (isUserLoading) {
    return (
      <div className="mt-[90px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {(isFollowingPending ||
        isUnfollowPending ||
        isAddFavouritePending ||
        isRemoveFavouritePending ||
        isUpvotePending ||
        isDownvotePending) && <LoadingWithOverlay />}
      <li className="group relative mb-6 flex gap-10 rounded-lg bg-white p-1">
        {/* Post Image with Hover Overlay */}
        <div className="group relative aspect-[16/9] w-full flex-1 overflow-hidden rounded-lg">
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
        </div>

        <div className="flex-[3]">
          {/* Category and Premium Badge */}
          <div className="mt-4 flex items-center gap-5">
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

          {/* Title */}
          <h2 className="mt-3 font-semibold text-gray-900 md:text-2xl">
            {post?.title}
          </h2>

          {/* Author Information */}
          <div className="mt-2 flex items-center gap-5 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="relative mr-3 h-5 w-5 rounded-full object-cover md:h-10 md:w-10">
                <Image
                  fill
                  src={
                    post?.user?.profilePicture
                      ? post?.user?.profilePicture
                      : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                  }
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={post?.user?.username || 'User profile'}
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <span>by {post?.user?.username}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {new Date(post?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  {post?.user?.followersCount || 0}
                  Followers
                  {post.user.isVerified && (
                    <span className="ml-2 rounded-full bg-yellow-400 px-2 py-1 text-xs font-semibold text-yellow-900">
                      <span className="hidden md:inline-block">
                        Premium User
                      </span>
                      <span>💎</span>
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

          {/* Content Preview */}
          <p className="mt-4 text-sm text-gray-700">
            {post?.description.slice(0, 150)}... {''}
            <button
              onClick={handleViewDetail}
              className="text-blue-900 underline"
            >
              Read more
            </button>
          </p>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-5">
            {/* upvote ann downvote */}
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

            {/* comments */}
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
                      onClick={() => {
                        if (isPremium) {
                          if (!isVerified) {
                            return toast.warning(
                              'You need to be verified first!!',
                            );
                          }
                        }
                        handleAddToFavourite(post?._id);
                      }}
                      className={`text-lg text-gray-500`}
                    >
                      <FaHeart />
                    </button>
                  )}

                  {isFavourite && (
                    <button
                      onClick={() => handleRemoveFromFavourite(post?._id)}
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
      </li>
    </>
  );
};

export default Post;
