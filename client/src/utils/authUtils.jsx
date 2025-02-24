import axios from 'axios';

export const logout = async (setUser, navigate) => {
  try {
    await axios.post('/logout');
    setUser(null);
    navigate('/');
  } catch (error) {
    console.error('Logout error:', error);
  }
};