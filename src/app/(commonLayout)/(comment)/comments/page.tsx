'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { PostSchemas } from '@/schemas/post.schema';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {
  useCreateCommentOnPost,
  useGetCommentsOfPost,
} from '@/hooks/post.hook';
import { IComment } from '@/types/comment.type';
import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';
import { useDeleteCommentMutation } from '@/hooks/comment.hooks';
import CommentItem from '../_components/CommentItem';

interface IFormValues {
  commentText: string;
}

const CommentList: React.FC = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId') as string;

  const {
    data: commentsData,
    isLoading: isCommentLoading,
    refetch: refetchComments,
  } = useGetCommentsOfPost({ postId });

  const [localCommentsData, setLocalCommentsData] = React.useState(() =>
    commentsData ? commentsData : null,
  );

  React.useEffect(() => {
    if (commentsData) {
      setLocalCommentsData(commentsData);
    }
  }, [commentsData]);

  const comments: IComment[] = localCommentsData?.data?.result || [];
  const hasComment = comments.length > 0;

  const {
    mutate: deleteCommentMutate,
    isPending: isDeleteCommentPending,
    error: commentDeleteError,
  } = useDeleteCommentMutation({ postId });

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

  // Handle comment submit
  const handleCommentSubmit = (data: IFormValues) => {
    const commentData = {
      postId,
      content: data?.commentText,
    };
    createCommentMutate(commentData, {
      onSuccess: () => {
        reset();
        refetchComments();
      },
      onError: () => {},
    });
  };

  const handleDelete = (commentId: string) => {
    deleteCommentMutate(commentId, {
      onSuccess: () => {
        const updatedComments = comments.filter(
          (comment) => comment._id !== commentId,
        );
        setLocalCommentsData((prev: any) => ({
          ...prev,
          data: {
            ...prev?.data,
            result: updatedComments,
          },
        }));
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
      <div className="mx-auto mt-[10px] max-w-2xl p-4">
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
              create comment
            </button>
          </form>
        </div>

        {/* Comment list */}

        {hasComment && (
          <CommentItem
            comments={comments}
            postId={postId}
            handleDelete={handleDelete}
            isDeleteCommentPending={isDeleteCommentPending}
            commentDeleteError={commentDeleteError}
          />
        )}

        {!hasComment && (
          <div className="space-y-4">
            <div className="flex justify-center rounded-lg border border-gray-200 p-4">
              <p>No comment added yet!!</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentList;
