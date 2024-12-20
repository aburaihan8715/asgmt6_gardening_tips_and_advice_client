import {
  createCommentOnPost,
  createPost,
  deletePost,
  downvotePost,
  getAllPosts,
  getCommentsOfPost,
  getInfinitePosts,
  getMyPosts,
  getPost,
  getPostStats,
  getTopFivePosts,
  makePostPremium,
  updatePost,
  upvotePost,
} from '@/actions/post.action';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

//=========== INFO: Query===========
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
    // gcTime: 0,
  });
};

// GET INFINITE POSTS
export const useGetInfinitePosts = ({
  searchTerm,
  category,
  voteFilter,
  limit = 5,
}: {
  searchTerm?: string;
  category?: string;
  voteFilter?: string;
  limit?: number;
}) => {
  return useInfiniteQuery({
    queryKey: ['posts', { searchTerm, category, voteFilter, limit }],
    queryFn: async ({ pageParam = 1 }) => {
      const { data, meta } = await getInfinitePosts({
        pageParam,
        searchTerm,
        category,
        voteFilter,
        limit,
      });
      return { data, meta };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const hasNextPage = lastPage?.meta?.hasNextPage;
      return hasNextPage ? lastPage?.meta?.page + 1 : undefined;
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

// GET TOP 5
export const useGetTopFivePosts = () => {
  return useQuery({
    queryKey: ['GET_TOP_5_POSTS'],
    queryFn: async () => await getTopFivePosts(),
  });
};

// GET ONE
export const useGetPost = (postId: string) => {
  return useQuery({
    queryKey: ['GET_POST', postId],
    queryFn: async () => await getPost(postId),
  });
};

// GET POST STATS
export const useGetPostStats = () => {
  return useQuery({
    queryKey: ['GET_POST-STATS'],
    queryFn: async () => await getPostStats(),
  });
};

//=========== INFO: Mutation===========
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
        queryKey: ['GET_TOP_5_POSTS'],
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
        queryKey: ['GET_TOP_5_POSTS'],
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
        queryKey: ['GET_TOP_5_POSTS'],
      });
      toast.success('Post has been premium successfully.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to make premium post: ' + error.message);
    },
  });
};

// UPVOTE
interface IUpvoteArgs {
  postId: string;
}
export const useUpvotePostMutation = (postId?: string) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, IUpvoteArgs>({
    mutationFn: async (options) => {
      return await upvotePost(options.postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_POST', postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_TOP_5_POSTS'],
      });
      toast.success('Post upvoted successfully.');
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

// DOWNVOTE
interface IDownvoteArgs {
  postId: string;
}
export const useDownvotePostMutation = (postId?: string) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, IDownvoteArgs>({
    mutationFn: async (options) => {
      return await downvotePost(options.postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_POST', postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_TOP_5_POSTS'],
      });
      toast.success('Post downvoted successfully.');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

// CREATE COMMENT OF A POST
interface ICreateCommentArgs {
  postId: string;
  content: string;
}
export const useCreateCommentOnPost = ({
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

  return useMutation<unknown, Error, ICreateCommentArgs>({
    mutationFn: async (options) => {
      return await createCommentOnPost(options.postId, options.content);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_MY_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_TOP_5_POSTS'],
      });

      queryClient.invalidateQueries({
        queryKey: [
          'GET_COMMENTS_OF_POST',
          { page, limit, searchTerm, postId },
        ],
      });
      toast.success('Comment posted successfully.');
      router.push(`/comments?postId=${postId}`);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

// GET COMMENTS OF POST
export const useGetCommentsOfPost = ({
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
  return useQuery({
    queryKey: [
      'GET_COMMENTS_OF_POST',
      { page, limit, searchTerm, postId },
    ],
    queryFn: async () =>
      await getCommentsOfPost({ page, limit, searchTerm, postId }),
  });
};

// CREATE POST
export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['CREATE_POST'],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_TOP_5_POSTS'],
      });
      toast.success('Post created successfully.');
      router.push('/user-dashboard/my-posts');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
