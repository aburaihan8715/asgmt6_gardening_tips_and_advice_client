'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useMemo } from 'react';
import { PostSchemas } from '@/schemas/post.schema';

import LoadingWithOverlay from '@/components/common/LoadingWithOverlay';
import { useSearchParams } from 'next/navigation';
import {
  useGetComment,
  useUpdateCommentMutation,
} from '@/hooks/comment.hooks';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface IFormValues {
  commentText: string;
}

const EditComment: React.FC = () => {
  const searchParams = useSearchParams();
  const commentId = searchParams.get('commentId') as string;
  const postId = searchParams.get('postId') as string;
  const { data: commentData, isLoading: isCommentLoading } =
    useGetComment(commentId);
  const comment = useMemo(() => commentData?.data || {}, [commentData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormValues>({
    resolver: zodResolver(PostSchemas.createCommentValidationSchema),
  });

  useEffect(() => {
    if (comment?.content) {
      reset({ commentText: comment.content });
    }
  }, [comment, reset]);

  const {
    mutate: updateCommentMutate,
    isPending: isCommentUpdatePending,
  } = useUpdateCommentMutation({ postId });

  // Handle comment submit
  const handleCommentSubmit = (data: IFormValues) => {
    const updatedComment = {
      commentId,
      content: data.commentText,
    };

    updateCommentMutate(updatedComment, {
      onSuccess: () => {},
      onError: () => {},
    });
  };

  if (isCommentLoading || !comment) {
    return (
      <div className="mt-[90px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {isCommentUpdatePending && <LoadingWithOverlay />}
      <div className="mx-auto mt-[80px] max-w-2xl p-4 md:mt-[10px]">
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
              className="mt-3 rounded-lg bg-blue-500 px-4 py-2 capitalize text-white hover:bg-blue-600"
            >
              Edit comment
            </button>
          </form>
        </div>

        {/* Comment list */}
      </div>
    </>
  );
};

export default EditComment;
