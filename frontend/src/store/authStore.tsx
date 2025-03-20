import { create } from "zustand";
import axios from 'axios';
import { User } from "../interfaces/User";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string | null; // Added accessToken property
  setUser: (userData: User | null) => void;
  setAccessToken: (token: string | null) => void; // Added setter for accessToken
  checkAuth: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  accessToken: null, // Initialize accessToken as null

  setUser: (userData) => set({ user: userData, isLoggedIn: !!userData }),
  setAccessToken: (token) => set({ accessToken: token }), // Setter for accessToken

  checkAuth: async () => {
    try {
      const { data } = await axios.get('/profile', { withCredentials: true });
      set({ user: data, isLoggedIn: true });
    } catch {
      set({ user: null, isLoggedIn: false });
    }
  },

  refreshAccessToken: async () => {
    try {
      const { data: responseData } = await axios.post('/refresh-token', {}, { withCredentials: true });
      if (responseData.accessToken) {
        set({ accessToken: responseData.accessToken }); // Update accessToken
        set({ user: { ...responseData.user, accessToken: responseData.accessToken }, isLoggedIn: true });
      }
    } catch {
      set({ user: null, isLoggedIn: false, accessToken: null }); // Clear accessToken on failure
    }
  },

  logout: async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
      set({ user: null, isLoggedIn: false, accessToken: null }); // Clear accessToken on logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
}));

export default useAuthStore;
