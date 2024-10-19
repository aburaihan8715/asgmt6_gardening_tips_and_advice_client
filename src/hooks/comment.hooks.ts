import {
  deleteComment,
  getComment,
  updateComment,
} from '@/actions/comment.action';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

// UPDATE
interface updateCommentArgs {
  commentId: string;
  content: string;
}
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
  const router = useRouter();

  return useMutation<unknown, Error, updateCommentArgs>({
    mutationKey: ['UPDATE_COMMENT'],
    mutationFn: async (options) =>
      await updateComment(options.commentId, { content: options.content }),
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
      router.back();
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

// GET ONE
export const useGetComment = (commentId: string) => {
  return useQuery({
    queryKey: ['GET_COMMENT', commentId],
    queryFn: async () => await getComment(commentId),
  });
};
