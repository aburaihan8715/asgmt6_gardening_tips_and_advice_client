import {
  commentOnPost,
  createPost,
  deletePost,
  downvotePost,
  getAllPosts,
  getInfinitePosts,
  getMyPosts,
  getNewFivePosts,
  getPost,
  makePostPremium,
  updatePost,
  upvotePost,
} from '@/services/post.service';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

// CREATE
export const useCreatePostMutation = () => {
  const router = useRouter();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['CREATE_POST'],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success('Post created successfully.');
      router.push('/user-dashboard/my-posts');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

// GET ALL
export const useGetAllPosts = ({
  page,
  limit,
  searchTerm,
  category,
  voteFilter,
}: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  category?: string;
  voteFilter?: string;
}) => {
  return useQuery({
    queryKey: [
      'GET_POSTS',
      { page, limit, searchTerm, category, voteFilter },
    ],
    queryFn: async () =>
      await getAllPosts({ page, limit, searchTerm, category, voteFilter }),
  });
};

// GET INFINITE POSTS
// NOTE: It doesn't work
export const useGetInfinitePosts = ({
  searchTerm,
  limit,
}: {
  searchTerm?: string;
  limit?: number;
}) => {
  return useInfiniteQuery({
    queryKey: ['GET_INFINITE_POSTS', { searchTerm, limit }],
    queryFn: async ({ pageParam = 3 }) => {
      return await getInfinitePosts({
        page: pageParam,
        searchTerm,
        limit,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
};

// GET MY POSTS
export const useGetMyPosts = ({
  page,
  limit,
  searchTerm,
}: {
  page?: number;
  limit?: number;
  searchTerm?: string;
}) => {
  return useQuery({
    queryKey: ['GET_MY_POSTS', { page, limit, searchTerm }],
    queryFn: async () => await getMyPosts({ page, limit, searchTerm }),
  });
};

// GET NEW 5
export const useGetNewFivePosts = () => {
  return useQuery({
    queryKey: ['GET_NEW_5_POSTS'],
    queryFn: async () => await getNewFivePosts(),
  });
};

// GET ONE
export const useGetPost = (postId: string) => {
  return useQuery({
    queryKey: ['GET_POST'],
    queryFn: async () => await getPost(postId),
  });
};

// UPDATE
export const useUpdatePostMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, FieldValues>({
    mutationKey: ['UPDATE_POST'],
    mutationFn: async (options) =>
      await updatePost(options.postId, options.formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_MY_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_NEW_5_POSTS'],
      });
      toast.success('Post updated successfully.');
      router.push('/user-dashboard/my-posts');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update the post: ' + error.message);
    },
  });
};

// DELETE
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationKey: ['DELETE_POST'],
    mutationFn: async (id) => await deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_MY_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_NEW_5_POSTS'],
      });
      toast.success('Post deleted successfully.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to delete the post: ' + error.message);
    },
  });
};

// MAKE PREMIUM
export const useMakePostPremiumMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationKey: ['MAKE_POST_PREMIUM'],
    mutationFn: async (id) => await makePostPremium(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_MY_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_NEW_5_POSTS'],
      });
      toast.success('Post has been premium successfully.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to make premium post: ' + error.message);
    },
  });
};

// Upvote hook
export const useUpvotePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationFn: async (id) => await upvotePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_MY_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_NEW_5_POSTS'],
      });
      toast.success('Post upvoted successfully.');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

// Downvote hook
export const useDownvotePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationFn: async (id) => await downvotePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_MY_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_NEW_5_POSTS'],
      });
      toast.success('Post downvoted successfully.');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

// Comment hook
export const useCommentOnPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, FieldValues>({
    mutationFn: async (options) => {
      return await commentOnPost(options.id, options.comment);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_MY_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_NEW_5_POSTS'],
      });
      toast.success('Comment posted successfully.');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
