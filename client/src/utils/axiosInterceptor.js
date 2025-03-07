import axios from 'axios';
import useAuthStore from '../store/authStore';

const { setUser } = useAuthStore.getState();

// Set the base URL and withCredentials for Axios
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    // Add authorization token to headers if available
    const user = useAuthStore.getState().user;
    if (user && user.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data: responseData } = await axios.post('/refresh-token', {}, { withCredentials: true });
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
