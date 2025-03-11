import {
  addFavoritePost,
  checkHasUpvoteForPost,
  deleteUser,
  followUser,
  getAllUsers,
  getFavouritePosts,
  getMe,
  getRevenue,
  getSingleUser,
  getUserStats,
  removeFavoritePost,
  unfollowUser,
  updateMe,
} from '@/actions/user.action';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

export const useGetSingleUser = (userId: string) => {
  return useQuery({
    queryKey: ['SINGLE_USER', userId],
    queryFn: async () => await getSingleUser(userId),
    enabled: userId ? true : false,
  });
};

export const useGetMe = (userId: string) => {
  return useQuery({
    queryKey: ['ME', userId],
    queryFn: async () => await getMe(),
    enabled: userId ? true : false,
  });
};

export const useUpdateMe = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationFn: async (profileData) => await updateMe(profileData),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['ME', userId],
      });

      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
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
    queryKey: ['USERS', { page, limit }],
    queryFn: async () => await getAllUsers({ page, limit }),
    // gcTime: 0,
  });
};

export const useCheckHasUpvoteForPost = () => {
  return useQuery({
    queryKey: ['HAS_UPVOTE_FOR_POST'],
    queryFn: async () => await checkHasUpvoteForPost(),
  });
};

export const useGetFavouritePosts = () => {
  return useQuery({
    queryKey: ['FAVOURITE_POSTS'],
    queryFn: async () => await getFavouritePosts(),
  });
};

export const useGetUserStats = () => {
  return useQuery({
    queryKey: ['USER_STATS'],
    queryFn: async () => await getUserStats(),
  });
};

export const useGetRevenue = () => {
  return useQuery({
    queryKey: ['REVENUE'],
    queryFn: async () => await getRevenue(),
  });
};

export const useFollow = (userId: string) => {
  const queryClient = useQueryClient();
  // Follow mutation
  const followMutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['SINGLE_USER', userId],
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
        queryKey: ['SINGLE_USER', userId],
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

interface IUseFavouriteProps {
  isPremium: boolean;
  isVerified: boolean | undefined;
  userId: string;
}
export const useFavourite = ({
  isPremium,
  isVerified,
  userId,
}: IUseFavouriteProps) => {
  const queryClient = useQueryClient();

  const addFavouriteMutation = useMutation({
    mutationFn: addFavoritePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['SINGLE_USER', userId],
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
        queryKey: ['SINGLE_USER', userId],
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

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationFn: async (id) => await deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['USERS'],
      });
      toast.success('User deleted successfully.');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to delete the user: ' + error.message);
    },
  });
};
