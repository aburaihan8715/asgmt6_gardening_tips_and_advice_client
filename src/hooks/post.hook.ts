import {
  createPost,
  deletePost,
  downvotePost,
  getAllPosts,
  getInfinitePosts,
  getMyPosts,
  getPostStats,
  getSinglePost,
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

import { IUser } from '@/types';

// =======================
// Query
// ========================
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
    queryKey: ['POSTS', { page, limit, searchTerm, category, voteFilter }],
    queryFn: async () =>
      await getAllPosts({ page, limit, searchTerm, category, voteFilter }),
    // gcTime: 0,
  });
};

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
    queryKey: [
      'INFINITE_POSTS',
      { searchTerm, category, voteFilter, limit },
    ],
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
    queryKey: ['MY_POSTS', { page, limit, searchTerm }],
    queryFn: async () => await getMyPosts({ page, limit, searchTerm }),
  });
};

export const useGetSinglePost = (postId: string) => {
  return useQuery({
    queryKey: ['SINGLE_POST', postId],
    queryFn: async () => await getSinglePost(postId),
  });
};

export const useGetPostStats = () => {
  return useQuery({
    queryKey: ['POST-STATS'],
    queryFn: async () => await getPostStats(),
  });
};

// =======================
// Mutations
// ========================
export const useUpdatePostMutation = () => {
  const router = useRouter();
  return useMutation<unknown, Error, FieldValues>({
    mutationFn: async (options) =>
      await updatePost(options.postId, options.formData),
    onSuccess: () => {
      toast.success('Post updated successfully.');
      router.push('/user/my-posts');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update the post: ' + error.message);
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationFn: async (id) => await deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['MY_POSTS'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['POSTS'],
        exact: false,
      });

      toast.success('Post deleted successfully.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to delete the post: ' + error.message);
    },
  });
};

export const useMakePostPremiumMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationFn: async (id) => await makePostPremium(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['MY_POSTS'],
        exact: false,
      });
      toast.success('Post has been premium successfully.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to make premium post: ' + error.message);
    },
  });
};

interface UseVoteProps {
  currentUser: IUser | null;
  userId: string;
  postId: string;
  post?: { upvotes?: string[]; downvotes?: string[] };
  isPremium: boolean;
  isVerified: boolean | undefined;
  role: string;
}

export const useVote = ({
  currentUser,
  userId,
  postId,
  post,
  isPremium,
  isVerified,
  role,
}: UseVoteProps) => {
  const queryClient = useQueryClient();
  const upvoteMutation = useMutation({
    mutationFn: upvotePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['SINGLE_POST', postId],
      });
      toast.success('Upvote successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Downvote mutation
  const downvoteMutation = useMutation({
    mutationFn: downvotePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['SINGLE_POST', postId],
      });
      toast.success('Downvote successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleUpvote = (postId: string) => {
    if (!currentUser) {
      return toast.error('You need to login first!');
    }

    const upvotes = post?.upvotes || [];
    const hasUpvote = upvotes.includes(userId);

    if (isPremium && !isVerified && role !== 'admin') {
      return toast.warning('You need to be verified first!!');
    }

    if (!hasUpvote) {
      upvoteMutation.mutate(postId);
    } else {
      toast.error('You already upvote!');
    }
  };

  const handleDownvote = (postId: string) => {
    if (!currentUser) {
      return toast.error('You need to login first!');
    }

    const downvotes = post?.downvotes || [];
    const hasDownvote = downvotes.includes(userId);

    if (isPremium && !isVerified && role !== 'admin') {
      return toast.warning('You need to be verified first!!');
    }

    if (!hasDownvote) {
      downvoteMutation.mutate(postId);
    } else {
      toast.error('You already downvote!');
    }
  };

  return {
    handleUpvote,
    handleDownvote,
    isUpvotePending: upvoteMutation.isPending,
    isDownvotePending: downvoteMutation.isPending,
  };
};

export const useCreatePostMutation = () => {
  const router = useRouter();
  return useMutation<any, Error, FieldValues>({
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success('Post created successfully.');
      router.push('/user/my-posts');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
