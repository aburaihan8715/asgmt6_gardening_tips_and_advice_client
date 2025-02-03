import {
  addFavoritePost,
  checkPremiumStatus,
  deleteUser,
  followUser,
  getAllUsers,
  getFavouritePosts,
  getMe,
  getRevenue,
  getSingleUser,
  getTopFiveUsers,
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

export const useGetMe = () => {
  return useQuery({
    queryKey: ['GET_ME'],
    queryFn: async () => await getMe(),
    enabled: false,
  });
};

export const useGetSingleUser = (userId: string) => {
  return useQuery({
    queryKey: ['GET_SINGLE_USER', userId],
    queryFn: async () => await getSingleUser(userId),
    enabled: userId ? true : false,
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

export const useFollow = () => {
  const queryClient = useQueryClient();
  // Follow mutation
  const followMutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_USER'],
      });
      toast.success('Followed successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Unfollow mutation
  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_USER'],
      });
      toast.success('Unfollow successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    handleFollow: followMutation.mutate,
    handleUnfollow: unfollowMutation.mutate,
    isFollowingPending: followMutation.isPending,
    isUnfollowPending: unfollowMutation.isPending,
  };
};

// NOTE: It is also need to be updated

interface IUseFavouriteProps {
  isPremium: boolean;
  isFavourite: boolean;
  isVerified: boolean | undefined;
}
export const useFavourite = ({
  isPremium,
  isVerified,
}: IUseFavouriteProps) => {
  const queryClient = useQueryClient();

  const addFavouriteMutation = useMutation({
    mutationFn: addFavoritePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_USER'],
      });
      toast.success('Add to favourite successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const removeFavouriteMutation = useMutation({
    mutationFn: removeFavoritePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['GET_USER'],
      });
      toast.success('Remove from favourite successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleAddToFavourite = (postId: string) => {
    if (isPremium) {
      if (!isVerified) {
        return toast.warning('You need to be verified first!!');
      }
    }
    addFavouriteMutation.mutate(postId);
  };
  const handleRemoveFromFavourite = (postId: string) => {
    removeFavouriteMutation.mutate(postId);
  };

  return {
    handleAddToFavourite,
    handleRemoveFromFavourite,
    isAddFavouritePending: addFavouriteMutation.isPending,
    isRemoveFavouritePending: removeFavouriteMutation.isPending,
  };
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
        queryKey: ['GET_POSTS'],
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
