// hooks/useAuth.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import useAuthStore from '../store/authStore';

// Define types for user data
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  user?: User;
  error?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const useCheckAuth = () => {
  const { setUser } = useAuthStore();

  return useQuery<User | null>({
    queryKey: ['profile'],
    queryFn: async (): Promise<User> => {
      const res: AxiosResponse<User> = await axios.get('/profile');
      return res.data;
    },
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

  return useMutation<AuthResponse, Error, LoginData>({
    mutationFn: async (loginData: LoginData): Promise<AuthResponse> => {
      const res: AxiosResponse<AuthResponse> = await axios.post('/login', loginData);
      return res.data;
    },
    onSuccess: (responseData) => {
      if (responseData.error) {
        throw new Error(responseData.error);
      } else if (responseData.user) {
        setUser(responseData.user);
      }
    },
  });
};

export const useRegister = () => {
  return useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: async (registerData: RegisterData): Promise<AuthResponse> => {
      const res: AxiosResponse<AuthResponse> = await axios.post('/register', registerData);
      return res.data;
    },
    onSuccess: (responseData) => {
      if (responseData.error) {
        throw new Error(responseData.error);
      }
    },
  });
};

export const useLogout = () => {
  const { setUser } = useAuthStore();

  return useMutation<void, Error>({
    mutationFn: async (): Promise<void> => {
      await axios.post('/logout');
    },
    onSuccess: () => {
      setUser(null);
    },
  });
};
