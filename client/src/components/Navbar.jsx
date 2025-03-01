// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  const { isLoggedIn, checkAuth, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(); // Check authentication on mount
  }, []);

  const handleLogout = async () => {
    await logout();
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