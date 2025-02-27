import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = registerData;

    try {
      const { data: responseData } = await axios.post('/register', {
        name,
        email,
        password,
      });

      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setRegisterData({
          name: '',
          email: '',
          password: '',
        });

        toast.success('Registration successful! Welcome!');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input
          type='text'
          placeholder='Enter name...'
          value={registerData.name}
          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
        />
        <label>Email</label>
        <input
          type='email'
          placeholder='Enter email...'
          value={registerData.email}
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type='password'
          placeholder='Enter password...'
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
