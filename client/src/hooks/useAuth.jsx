import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useAuthStore from '../store/authStore';

export const useCheckAuth = () => {
  const { setUser } = useAuthStore();

  return useQuery({
    queryKey: ['profile'], // Use an array for the queryKey
    queryFn: () => axios.get('/profile').then((res) => res.data),
    enabled: false,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: () => {
      setUser(null);
    },
  });
};

export const useLogin = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (loginData) => axios.post('/login', loginData),
    onSuccess: (responseData) => {
      if (responseData.data.error) {
        throw new Error(responseData.data.error);
      } else {
        setUser(responseData.data.user);
      }
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (registerData) => axios.post('/register', registerData),
    onSuccess: (responseData) => {
      if (responseData.data.error) {
        throw new Error(responseData.data.error);
      }
    },
  });
};

export const useLogout = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: () => axios.post('/logout'),
    onSuccess: () => {
      setUser(null);
    },
  });
};
