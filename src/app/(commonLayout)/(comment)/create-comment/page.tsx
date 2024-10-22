'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { PostSchemas } from '@/schemas/post.schema';

import { useCreateCommentOnPost } from '@/hooks/post.hook';

import LoadingWithOverlay from '@/components/ui/LoadingWithOverlay';
import { useSearchParams } from 'next/navigation';

interface IFormValues {
  commentText: string;
}

const CreateComment: React.FC = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId') as string;

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
      },
      onError: () => {},
    });
  };

  // if (isCommentLoading) {
  //   return (
  //     <div className="mt-[90px]">
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

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
      </div>
    </>
  );
};

export default CreateComment;
