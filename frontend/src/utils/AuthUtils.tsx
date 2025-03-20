import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { User } from '../interfaces/User'; // Import the User interface

export const logout = async (setUser: (user: User | null) => void, navigate: NavigateFunction): Promise<void> => {
  try {
    await axios.post('/logout', {}, { withCredentials: true }); // Ensure withCredentials is set if cookies are used
    setUser(null); // Clear the user state
    navigate('/'); // Redirect to the home page
  } catch (error) {
    console.error('Logout error:', error);
  }
};
