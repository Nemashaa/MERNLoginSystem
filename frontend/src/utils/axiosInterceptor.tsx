// utils/axiosSetup.ts
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import useAuthStore from '../store/authStore';

const { setUser } = useAuthStore.getState();

// Set the base URL and withCredentials for Axios
axios.defaults.baseURL = 'http://localhost:8001';
axios.defaults.withCredentials = true;

// Request interceptor
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const user = useAuthStore.getState().user;
    if (user && user.accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${user.accessToken}`,
      };
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data: responseData } = await axios.post<{ accessToken: string }>('/refresh-token', {}, { withCredentials: true });
        if (responseData.accessToken) {
          setUser((prev) => ({ ...prev, accessToken: responseData.accessToken }));
          axios.defaults.headers.common['Authorization'] = `Bearer ${responseData.accessToken}`;
          return axios(originalRequest);
        }
      } catch (err) {
        console.error('Failed to refresh token:', err);
        setUser(null);
      }
    }
    return Promise.reject(error);
  }
);
