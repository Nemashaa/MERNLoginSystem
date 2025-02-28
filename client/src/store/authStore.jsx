import create from 'zustand';
import axios from 'axios';

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    try {
      const { data } = await axios.get('/profile');
      set({ user: data });
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  }
}));
