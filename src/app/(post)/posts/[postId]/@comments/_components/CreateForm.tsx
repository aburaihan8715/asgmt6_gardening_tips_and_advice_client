'use client';
import { useCreateComment } from '@/hooks/comment.hooks';
import { CommentSchemas } from '@/schemas/comment.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

interface IFormValues {
  commentText: string;
}

const CreateForm = ({ postId }: { postId: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: zodResolver(CommentSchemas.createCommentSchema),
    defaultValues: {
      commentText: '',
    },
  });

  const {
    mutate: createCommentMutate,
    isPending: isCreateCommentPending,
  } = useCreateComment(postId);

  // Handle comment submit
  const handleCommentSubmit = async (data: IFormValues) => {
    const commentData = {
      postId,
      comment: data?.commentText,
    };
    createCommentMutate(commentData);
    reset();
  };

  return (
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
        <p className="mt-1 text-red-500">{errors.commentText.message}</p>
      )}
      <button
        type="submit"
        className="mt-3 rounded-lg bg-blue-500 px-4 py-2 capitalize text-white hover:bg-blue-600"
      >
        {isCreateCommentPending ? 'Creating...' : 'create'}
      </button>
    </form>
  );
};

export default CreateForm;
