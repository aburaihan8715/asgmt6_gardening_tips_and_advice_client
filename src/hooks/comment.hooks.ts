import { deleteComment, updateComment } from '@/services/comment.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

// UPDATE
export const useUpdateCommentMutation = ({
  page,
  limit,
  searchTerm,
  postId,
}: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  postId?: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, FieldValues>({
    mutationKey: ['UPDATE_COMMENT'],
    mutationFn: async (options) =>
      await updateComment(options.commentId, options.formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_NEW_5_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: [
          'GET_COMMENTS_OF_POST',
          { page, limit, searchTerm, postId },
        ],
      });
      toast.success('Comment updated successfully.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update the Comment: ' + error.message);
    },
  });
};

// DELETE
export const useDeleteCommentMutation = ({
  page,
  limit,
  searchTerm,
  postId,
}: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  postId?: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, string>({
    mutationKey: ['DELETE_COMMENT'],
    mutationFn: async (commentId) => await deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: [
          'GET_COMMENTS_OF_POST',
          { page, limit, searchTerm, postId },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_NEW_5_POSTS'],
      });
      toast.success('Comment deleted successfully.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to delete the Comment: ' + error.message);
    },
  });
};
