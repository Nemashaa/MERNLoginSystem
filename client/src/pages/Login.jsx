import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { setUser } = useAuthStore();

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    try {
      const { data: responseData } = await axios.post('/login', { email, password });

      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        console.log('Login Response:', responseData);
        setUser(responseData.user);
        setLoginData({ email: '', password: '' });
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    try {
      const { data: responseData } = await axios.post('/refresh-token', {}, { withCredentials: true });
      if (responseData.accessToken) {
        setUser((prev) => ({ ...prev, accessToken: responseData.accessToken }));
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
    }
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type='email'
          placeholder='Enter email...'
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type='password'
          placeholder='Enter password...'
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
