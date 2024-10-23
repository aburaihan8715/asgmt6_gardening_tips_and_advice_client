// import { UserServices } from '@/services/user.service';
import {
  addFavoritePost,
  checkPremiumStatus,
  followUser,
  getFavouritePosts,
  getMe,
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

//=========== INFO: Query===========
export const useGetMe = () => {
  return useQuery({
    queryKey: ['GET_ME'],
    queryFn: async () => await getMe(),
    enabled: false,
  });
};

export const useGetTopFiveUsers = () => {
  return useQuery({
    queryKey: ['GET_TOP_USERS'],
    queryFn: async () => await getTopFiveUsers(),
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
