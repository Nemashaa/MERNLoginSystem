/*import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

// Request Interceptor (Attach Access Token)
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Handle Expired Token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 403) {
      try {
        const refreshResponse = await axios.post('http://localhost:8000/refresh-token', {}, { withCredentials: true });
        const newAccessToken = refreshResponse.data.accessToken;

        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(error.config); // Retry the failed request
        }
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // Redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default api;
*/