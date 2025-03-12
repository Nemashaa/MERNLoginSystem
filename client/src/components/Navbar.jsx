// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { useLogout } from '../hooks/useAuth';

export default function Navbar() {
  const { isLoggedIn, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  const logoutMutation = useLogout();

  useEffect(() => {
    checkAuth(); // Check authentication on mount
  }, [checkAuth]);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    navigate("/");
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      {isLoggedIn ? (
        <span onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</span>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
