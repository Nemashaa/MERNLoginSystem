import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserPosts, addPost, updatePost, deletePost } from '../apis/postApis';
import { Post } from "../interfaces/postsInterfaces";
import { toast } from 'react-hot-toast';

export const useUserPosts = () => {
  return useQuery<Post[]>({
    queryKey: ['userPosts'],
    queryFn: fetchUserPosts,
  });
};

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, unknown, { title: string; description: string }>({
    mutationFn: addPost,
    onSuccess: (_, variables) => { // Removed unused `data` parameter
      toast.success(`Post "${variables.title}" added successfully!`);
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
    onError: () => {
      toast.error('Failed to add post.');
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, unknown, { postID: number; updatedData: { title: string; description: string } }>({
    mutationFn: ({ postID, updatedData }) => updatePost(postID, updatedData),
    onSuccess: (_, variables) => { // Removed unused `data` parameter
      toast.success(`Post "${variables.updatedData.title}" updated successfully!`);
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
    onError: () => {
      toast.error('Failed to update post.');
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, unknown, number>({
    mutationFn: deletePost,
    onSuccess: (_, variables) => { // Removed unused `data` parameter
      toast.success(`Post with ID ${variables} deleted successfully!`);
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
    onError: () => {
      toast.error('Failed to delete post.');
    },
  });
};
