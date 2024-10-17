import React, { createContext, useContext } from 'react';
import {
  useAddFavoritePostMutation,
  useFollowUserMutation,
  useRemoveFavoritePostMutation,
  useUnfollowUserMutation,
} from '@/hooks/user.hook';
import { toast } from 'sonner';

interface IPostContext {
  handleAddFavourite: (postId: string) => void;
  handleRemoveFavourite: (postId: string) => void;
  handleFollow: (postUserId: string) => void;
  handleUnfollow: (postUserId: string) => void;
}

const PostActionsContext = createContext<IPostContext | undefined>(
  undefined,
);

export const PostActionsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { mutate: addFavoritePost } = useAddFavoritePostMutation(); // Updated
  const { mutate: removeFavoritePost } = useRemoveFavoritePostMutation(); // Updated
  const { mutate: followUser } = useFollowUserMutation(); // Updated
  const { mutate: unfollowUser } = useUnfollowUserMutation(); // Updated

  const handleAddFavourite = (postId: string) => {
    addFavoritePost(
      { postId },
      {
        onSuccess: () => {
          toast.success('Post added to favorites.');
        },
        onError: () => {
          toast.error('Error adding post to favorites.');
        },
      },
    );
  };

  const handleRemoveFavourite = (postId: string) => {
    removeFavoritePost(
      { postId },
      {
        onSuccess: () => {
          toast.success('Post removed from favorites.');
        },
        onError: () => {
          toast.error('Error removing post from favorites.');
        },
      },
    );
  };

  const handleFollow = (postUserId: string) => {
    followUser(
      { postUserId },
      {
        onSuccess: () => {
          toast.success('User followed successfully.');
        },
        onError: () => {
          toast.error('Error following user.');
        },
      },
    );
  };

  const handleUnfollow = (postUserId: string) => {
    unfollowUser(
      { postUserId },
      {
        onSuccess: () => {
          toast.success('User unfollowed successfully.');
        },
        onError: () => {
          toast.error('Error unfollowing user.');
        },
      },
    );
  };

  return (
    <PostActionsContext.Provider
      value={{
        handleAddFavourite,
        handleRemoveFavourite,
        handleFollow,
        handleUnfollow,
      }}
    >
      {children}
    </PostActionsContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostActionsContext);
  if (!context) {
    throw new Error(
      'usePostContext must be used within a PostActionsProvider',
    );
  }
  return context;
};
