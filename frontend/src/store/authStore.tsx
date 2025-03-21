import { create } from "zustand";
import axios from 'axios';
import { User } from '../interfaces/User'; // Fix import

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  checkAuth: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  accessToken: null,

  setUser: (user) => set({ user, isLoggedIn: !!user }),
  setAccessToken: (token) => set({ accessToken: token }),

  checkAuth: async () => {
    try {
      const { data } = await axios.get<User>('/profile', { withCredentials: true });
      set({ user: data, isLoggedIn: true });
    } catch {
      set({ user: null, isLoggedIn: false });
    }
  },

  refreshAccessToken: async () => {
    try {
      const { data: responseData } = await axios.post<{ accessToken: string; user: User }>('/refresh-token', {}, { withCredentials: true });
      if (responseData.accessToken) {
        set({ accessToken: responseData.accessToken });
        set({ user: { ...(responseData.user || {}), accessToken: responseData.accessToken }, isLoggedIn: true });
      }
    } catch {
      set({ user: null, isLoggedIn: false, accessToken: null });
    }
  },

  logout: async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
      set({ user: null, isLoggedIn: false, accessToken: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
}));

export default useAuthStore;
