import create from 'zustand';

import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,

  setUser: (userData) => set({ user: userData, isLoggedIn: !!userData }), // Add this line

  checkAuth: async () => {
    try {
      const { data } = await axios.get('/profile');
      set({ user: data, isLoggedIn: true });
    } catch (error) {
      set({ user: null, isLoggedIn: false });
    }
  },

  logout: async () => {
    await axios.post('/logout');
    set({ user: null, isLoggedIn: false });
  },
}));

export default useAuthStore;