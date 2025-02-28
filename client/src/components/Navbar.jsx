import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();  // Hook to navigate to different routes

  useEffect(() => {
    // Check if the user is logged in by checking tokens
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);  // If there's an access token, user is logged in
  }, []);

  const handleLogout = () => {
    // Remove tokens and log out
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    navigate('/');  // Navigate to the home page after logout
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      {
        isLoggedIn ? 
        <span onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</span> : 
        <Link to="/login">Login</Link>
      }
    </div>
  );
}
