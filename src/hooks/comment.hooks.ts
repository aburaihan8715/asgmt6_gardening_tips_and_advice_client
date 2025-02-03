import {
  createComment,
  deleteComment,
  getAllCommentsOnPost,
  getSingleComment,
  updateComment,
} from '@/actions/comment.action';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';

import { toast } from 'sonner';

interface ICreateCommentArgs {
  postId: string;
  comment: string;
}

export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, ICreateCommentArgs>({
    mutationFn: async ({ postId, comment }) => {
      return createComment(postId, comment);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_ALL_COMMENTS_ON_POST', postId],
      });
      toast.success('Comment created successfully.');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllCommentsOnPost = (postId: string) => {
  return useQuery({
    queryKey: ['GET_ALL_COMMENTS_ON_POST', postId],
    queryFn: async () => getAllCommentsOnPost(postId),
  });
};

export const useGetSingleComment = (commentId: string) => {
  return useQuery({
    queryKey: ['GET_SINGLE_COMMENT', commentId],
    queryFn: async () => await getSingleComment(commentId),
  });
};

export const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, string>({
    mutationFn: async (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_ALL_COMMENTS_ON_POST', postId],
      });
      toast.success('Comment deleted successfully.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to delete the comment: ' + error.message);
    },
  });
};

export const useUpdateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, FieldValues>({
    mutationFn: async ({ commentId, payload }) => {
      return updateComment(commentId, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_ALL_COMMENTS_ON_POST', postId],
      });

      toast.success('Comment updated successfully.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update the post: ' + error.message);
    },
  });
};
