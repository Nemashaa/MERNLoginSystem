/*import axios from 'axios';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';

export const handleLogout = async () => {
  const logout = useAuthStore.getState().logout;
  
  try {
    // Call the backend to clear cookies
    await axios.post('/logout');
    
    // Clear store state
    logout();
    
    toast.success('Logged out successfully');
  } catch (error) {
    console.error('Logout error:', error);
    toast.error('Logout failed');
    
    // Still clear local state even if server request fails
    logout();
  }
};*/