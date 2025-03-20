// hooks/useFetchData.ts
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

// Define Post type
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchData = async (): Promise<Post[]> => {
  const { data }: AxiosResponse<Post[]> = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

export const useFetchData = () => {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchData,
  });
};
