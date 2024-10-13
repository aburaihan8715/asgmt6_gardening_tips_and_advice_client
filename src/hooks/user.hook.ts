// import { UserServices } from '@/services/user.service';
import {
  favoritePost,
  followUser,
  unfollowUser,
} from '@/services/user.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Follow hook
interface IFollowArgs {
  currentUserId: string;
  postUserId: string;
}
export const useFollowUserMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, IFollowArgs>({
    mutationFn: async (options) => {
      return await followUser(options.currentUserId, options.postUserId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      toast.success('User followed successfully.');
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

// Unfollow hook
interface IUnfollowArgs {
  currentUserId: string;
  postUserId: string;
}
export const useUnfollowUserMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, IUnfollowArgs>({
    mutationFn: async (options) => {
      return await unfollowUser(options.currentUserId, options.postUserId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      toast.success('User unfollowed successfully.');
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

// Favorite hook
export const useFavoritePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    mutationFn: async (id) => await favoritePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GET_POSTS'],
      });
      toast.success('Post added to favorites.');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

// export const UserHooks = {
//   useFollowUserMutation,
//   useUnfollowUserMutation,
//   useFavoritePostMutation,
// };
