// import { UserServices } from '@/services/user.service';
import {
  addFavoritePost,
  checkPremiumStatus,
  deleteUser,
  followUser,
  getAllUsers,
  getFavouritePosts,
  getMe,
  getRevenue,
  getTopFiveUsers,
  getUser,
  getUserStats,
  removeFavoritePost,
  unfollowUser,
} from '@/actions/user.action';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

//=========== INFO: Query===========
export const useGetMe = () => {
  return useQuery({
    queryKey: ['GET_ME'],
    queryFn: async () => await getMe(),
    enabled: false,
  });
};

export const useGetUser = (userId: string) => {
  return useQuery({
    queryKey: ['GET_USER'],
    queryFn: async () => await getUser(userId),
    enabled: false,
  });
};

export const useGetTopFiveUsers = () => {
  return useQuery({
    queryKey: ['GET_TOP_USERS'],
    queryFn: async () => await getTopFiveUsers(),
  });
};

export const useGetAllUsers = ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['GET_USERS', { page, limit }],
    queryFn: async () => await getAllUsers({ page, limit }),
    // gcTime: 0,
  });
};

// Check premium status
export const useCheckPremiumStatus = () => {
  return useQuery({
    queryKey: ['GET_PREMIUM_STATUS'],
    queryFn: async () => await checkPremiumStatus(),
  });
};

export const useGetFavouritePosts = () => {
  return useQuery({
    queryKey: ['GET_FAVOURITE_POSTS'],
    queryFn: async () => await getFavouritePosts(),
  });
};

export const useGetUserStats = () => {
  return useQuery({
    queryKey: ['GET_USER_STATS'],
    queryFn: async () => await getUserStats(),
  });
};

export const useGetRevenue = () => {
  return useQuery({
    queryKey: ['GET_REVENUE'],
    queryFn: async () => await getRevenue(),
  });
};

//=========== INFO: Mutation===========
// Follow hook
interface IFollowArgs {
  postUserId: string;
}
export const useFollowUserMutation = (postId?: string) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, IFollowArgs>({
    mutationFn: async (options) => {
      return await followUser(options.postUserId);
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
      queryClient.invalidateQueries({
        queryKey: ['GET_ME'],
      });
      toast.success('User followed successfully.');
      // router.refresh();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

// Unfollow hook
interface IUnfollowArgs {
  postUserId: string;
}
export const useUnfollowUserMutation = (postId?: string) => {
  // const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, IUnfollowArgs>({
    mutationFn: async (options) => {
      return await unfollowUser(options.postUserId);
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
      queryClient.invalidateQueries({
        queryKey: ['GET_ME'],
      });
      toast.success('User unfollowed successfully.');
      // router.refresh();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

// Add Favorite hook
interface IAddFavouritePostArgs {
  postId: string;
}
export const useAddFavoritePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, IAddFavouritePostArgs>({
    mutationFn: async (options) => {
      return await addFavoritePost(options.postId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_TOP_5_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_ME'],
      });
      toast.success('Added to favourite successfully!.');
    },

    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

// Remove Favourite hook
interface IRemoveFavouritePostArgs {
  postId: string;
}
export const useRemoveFavoritePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, IRemoveFavouritePostArgs>({
    mutationFn: async (options) => {
      return await removeFavoritePost(options.postId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_TOP_5_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_ME'],
      });
      toast.success('Remove from favourite successfully!');
    },

    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

// DELETE USER
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationFn: async (id) => await deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_USERS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_TOP_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_ME'],
      });
      toast.success('User deleted successfully.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to delete the user: ' + error.message);
    },
  });
};
