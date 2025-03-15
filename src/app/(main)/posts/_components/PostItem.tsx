'use client';

import Image from 'next/image';
import { FaCommentAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { IPost } from '@/types/post.type';
import { useAuth } from '@/context/user.provider';
import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useRouter } from 'next/navigation';

const PostItem = ({ post }: { post: IPost }) => {
  const router = useRouter();
  const { currentUser, isCurrentUserLoading } = useAuth();

  const isVerified = currentUser?.isVerified;
  const isPremium = post?.isPremium;
  const role = currentUser?.role;

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

  if (isCurrentUserLoading) {
    return (
      <div className="mt-[90px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {isCurrentUserLoading && <LoadingWithOverlay />}
      <li className="group relative mb-6 flex flex-col gap-10 rounded-lg bg-white p-1 md:flex-row">
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
          </div>

          {/* Content Preview */}
          <p className="mt-4 text-sm text-gray-700">
            {post?.description.slice(0, 150)}... {''}
            <button
              onClick={handleViewDetail}
              className="text-base font-medium text-green-600 underline"
            >
              Read more
            </button>
          </p>

          <div className="mt-6 flex items-center gap-5">
            {/* upvote ann downvote */}
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1 text-green-500">
                <FaArrowUp />
                <span>{post.upvotesCount || 0}</span>
              </span>
              <span className="flex items-center space-x-1 text-red-500">
                <FaArrowDown />
                <span>{post.downvotesCount || 0}</span>
              </span>
            </div>

            {/* comments */}
            <div className="flex items-center space-x-2">
              <FaCommentAlt className="text-gray-400" />
              <span className="text-gray-500">
                {post?.numberOfComments || 0} {''} Comments
              </span>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default PostItem;
