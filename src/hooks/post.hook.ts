import { createPost, getAllPosts } from '@/services/post.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

export const useCreatePostMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['POSTS'],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success('Post created successfully.');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ['POSTS'],
    queryFn: async () => await getAllPosts(),
  });
};
