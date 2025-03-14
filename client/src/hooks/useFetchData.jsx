import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

export const useFetchData = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchData,
  });
};
