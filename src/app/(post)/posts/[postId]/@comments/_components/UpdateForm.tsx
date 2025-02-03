'use client';

import {
  useGetSingleComment,
  useUpdateComment,
} from '@/hooks/comment.hooks';
import { CommentSchemas } from '@/schemas/comment.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

interface IFormValues {
  commentText: string;
}
interface IUpdateFormProps {
  postId: string;
  commentId: string;
  setIsUpdateFrom: Dispatch<SetStateAction<boolean>>;
}

const UpdateForm = ({
  postId,
  commentId,
  setIsUpdateFrom,
}: IUpdateFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: zodResolver(CommentSchemas.updateCommentSchema),
    defaultValues: {
      commentText: '',
    },
  });

  const { data: commentData, isLoading: isCommentLoading } =
    useGetSingleComment(commentId);
  const singleComment = useMemo(
    () => commentData?.data || {},
    [commentData],
  );

  const {
    mutate: updateCommentMutate,
    isPending: isCommentUpdatePending,
  } = useUpdateComment(postId);

  // Handle comment submit
  const handleCommentSubmit = (data: IFormValues) => {
    const updatedCommentData = {
      postId,
      commentId,
      payload: { comment: data.commentText },
    };
    updateCommentMutate(updatedCommentData);
    setIsUpdateFrom(false);
  };

  useEffect(() => {
    if (singleComment) {
      const { comment } = singleComment;
      setValue('commentText', comment);
    }
  }, [setValue, singleComment]);

  if (isCommentLoading) {
    return <p>loading...</p>;
  }
  return (
    <form onSubmit={handleSubmit(handleCommentSubmit)}>
      <textarea
        {...register('commentText')}
        className={`w-full rounded-lg border p-3 focus:outline-none ${
          errors.commentText ? 'border-red-500' : 'border-gray-300'
        }`}
        rows={3}
        placeholder="Update comment..."
      />
      {errors.commentText && (
        <p className="mt-1 text-red-500">{errors.commentText.message}</p>
      )}
      <button
        type="submit"
        className="mt-3 rounded-lg bg-blue-500 px-4 py-2 capitalize text-white hover:bg-blue-600"
      >
        {isCommentUpdatePending ? 'updating...' : 'update'}
      </button>
    </form>
  );
};

export default UpdateForm;
