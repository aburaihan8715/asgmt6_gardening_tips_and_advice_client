'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { PostSchemas } from '@/schemas/post.schema';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CommentItem from '../_components/CommentItem';
import {
  useCreateCommentOnPost,
  useGetCommentsOfPost,
  useGetNewFivePosts,
} from '@/hooks/post.hook';
import { IComment } from '@/types/comment.type';
import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';

interface IFormValues {
  commentText: string;
}

const CommentList: React.FC = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId') as string;
  const { data: commentsData, isLoading: isCommentLoading } =
    useGetCommentsOfPost({ postId });
  const comments: IComment[] = commentsData?.data?.result || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: zodResolver(PostSchemas.createCommentValidationSchema),
  });

  const {
    mutate: createCommentMutate,
    isPending: isCreateCommentPending,
  } = useCreateCommentOnPost({ postId });

  const { refetch } = useGetNewFivePosts();
  // Handle comment submit
  const handleCommentSubmit = (data: IFormValues) => {
    const commentData = {
      postId,
      content: data?.commentText,
    };
    createCommentMutate(commentData, {
      onSuccess: () => {
        reset();
        refetch();
      },
      onError: () => {},
    });
  };

  if (isCommentLoading) {
    return (
      <div className="mt-[90px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {isCreateCommentPending && <LoadingWithOverlay />}
      <div className="mx-auto mt-[80px] max-w-2xl p-4">
        {/* Comment input field with form */}
        <div className="mb-6">
          <form onSubmit={handleSubmit(handleCommentSubmit)}>
            <textarea
              {...register('commentText')}
              className={`w-full rounded-lg border p-3 focus:outline-none ${
                errors.commentText ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={3}
              placeholder="Write a comment..."
            />
            {errors.commentText && (
              <p className="mt-1 text-red-500">
                {errors.commentText.message}
              </p>
            )}
            <button
              type="submit"
              className="mt-3 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Submit Comment
            </button>
          </form>
        </div>

        {/* Comment list */}
        <CommentItem comments={comments} />
      </div>
    </>
  );
};

export default CommentList;
