import create from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,

  setUser: (userData) => set({ user: userData, isLoggedIn: !!userData }),

  checkAuth: async () => {
    try {
      const { data } = await axios.get('/profile', { withCredentials: true });
      set({ user: data, isLoggedIn: true });
    } catch (error) {
      set({ user: null, isLoggedIn: false });
    }
  },

  refreshAccessToken: async () => {
    try {
      const { data: responseData } = await axios.post('/refresh-token', {}, { withCredentials: true });
      if (responseData.accessToken) {
        set({ user: { ...responseData.user, accessToken: responseData.accessToken }, isLoggedIn: true });
      }
    } catch (error) {
      set({ user: null, isLoggedIn: false });
    }
  },

  logout: async () => {
    await axios.post('/logout', {}, { withCredentials: true });
    set({ user: null, isLoggedIn: false });
  },
}));

export default useAuthStore;